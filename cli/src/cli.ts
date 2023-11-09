#!/usr/bin/env node

import fs from 'fs/promises'
import {Command} from 'commander'
import {Project} from 'roleout-lib/build/project'
import {SQLBackend} from 'roleout-lib/build/backends/sqlBackend'
import {TerraformBackend} from 'roleout-lib/build/backends/terraformBackend'
import path from 'path'
import {TerraformResource} from 'roleout-lib/build/backends/terraform/terraformResource'
import util from 'util'
import {NamingConvention} from 'roleout-lib/build/namingConvention'
import chalk from 'chalk'
import {Role} from 'roleout-lib/build/roles/role'
import {SchemaObjectGrant} from 'roleout-lib/build/grants/schemaObjectGrant'
import {round} from 'lodash'
import {VERSION} from 'roleout-lib/build/version'
import YAML from 'yaml'
import {
  createSnowflakeConnection,
  getConnectionOptionsFromEnv,
  SnowflakeConnector
} from 'roleout-lib/build/snowflakeConnector'
import {isSchemaObjectGrant} from 'roleout-lib/build/grants/grant'
import {Privilege} from 'roleout-lib/build/privilege'
import {AccessRole} from 'roleout-lib/build/roles/accessRole'
import {isTerraformPrivilegesGrant} from 'roleout-lib/build/backends/terraform/terraformPrivilegesGrant'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const exec = util.promisify(require('child_process').exec)

// Suppress annoying AWS SDK message from output
// https://github.com/aws/aws-sdk-js/issues/4354
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('aws-sdk/lib/maintenance_mode_message').suppress = true

type DeployOpts = { config: string, output: string }
type ImportOpts = { config: string, output: string, grants: boolean, verbose: boolean }
type RevokeFutureGrantsOpts = { config: string, output: string, ownershipOnly: boolean }
type SnowflakeOpts = { config: string, output: string }

async function deploySQL(program: Command, opts: DeployOpts) {
  const contents = await fs.readFile(opts.config)
  const project = await Project.fromYAML(contents.toString('utf8'))
  const backend = new SQLBackend()
  const fileMap: Map<string, string> = backend.deploy(project)
  const directory = opts.output || './'
  await fs.mkdir(path.join(directory, 'teardown'), {recursive: true})
  for (const [filename, contents] of fileMap) {
    await fs.writeFile(path.join(directory, filename), contents)
  }
}

async function deployTerraform(program: Command, opts: DeployOpts) {
  const contents = await fs.readFile(opts.config)
  const project = await Project.fromYAML(contents.toString('utf8'))
  const backend = new TerraformBackend()
  const fileMap: Map<string, string> = backend.deploy(project)
  const directory = opts.output || './'
  for (const [filename, contents] of fileMap) {
    await fs.mkdir(path.join(directory, path.dirname(filename)), {recursive: true})
    await fs.writeFile(path.join(directory, filename), contents)
  }
}

async function importTerraform(program: Command, opts: ImportOpts) {
  function importCommand(resource: TerraformResource, namingConvention: NamingConvention): string {
    return `terraform import ${resource.resourceType}."${resource.resourceName(namingConvention)}" "${resource.resourceID()}"`
  }

  const contents = await fs.readFile(opts.config)
  const project = await Project.fromYAML(contents.toString('utf8'))
  const backend = new TerraformBackend()

  let resources: TerraformResource[] = []

  if (project.environments.length > 0) {
    for (const {environment, options} of backend.environmentOptions(project)) {
      resources = resources.concat([
        backend.databaseResources(environment) as TerraformResource[],
        backend.virtualWarehouseResources(environment) as TerraformResource[],
        backend.functionalRoleResources(environment, new Role(options.environmentManagerRole || 'SYSADMIN')) as TerraformResource[],
        backend.rbacResources(environment, new Role(options.environmentManagerRole || 'SYSADMIN')) as TerraformResource[]
      ].flat())
    }
  } else {
    resources = [
      backend.databaseResources(project) as TerraformResource[],
      backend.virtualWarehouseResources(project) as TerraformResource[],
      backend.functionalRoleResources(project, new Role('SYSADMIN')) as TerraformResource[],
      backend.rbacResources(project, new Role('SYSADMIN')) as TerraformResource[]
    ].flat()
  }

  if(!opts.grants) resources = resources.filter(r => !isTerraformPrivilegesGrant(r))

  console.log(`${resources.length} resources`)

  const commands = resources.map(r => importCommand(r, project.namingConvention))

  if (opts.output) {
    // write commands to file
    await fs.writeFile(opts.output, commands.join('\n'))
  } else {
    // run commands
    const results = {
      successes: [] as string[],
      alreadyManaged: [] as string[],
      nonExistent: [] as string[],
      invalidId: [] as string[],
      errors: [] as string[]
    }
    for (const [i, cmd] of commands.entries()) {
      try {
        const {stdout} = await exec(cmd)

        if (opts.verbose) console.log(stdout)

        if (stdout.includes('Import successful')) {
          results.successes.push(cmd)
        }
      } catch (e: any) {
        const errorString = e.toString()
        console.error(errorString)

        if (errorString.includes('Cannot import non-existent remote object') || errorString.includes('does not exist')) {
          results.nonExistent.push(cmd)
        } else if (errorString.includes('Resource already managed by Terraform')) {
          results.alreadyManaged.push(cmd)
        } else if (errorString.includes('unexpected format of ID')) {
          results.invalidId.push(cmd)
        } else (
          results.errors.push(cmd)
        )
      }

      const pct_complete = round((i + 1) / commands.length * 100)
      console.log(`${i + 1}/${commands.length} = ${pct_complete}% complete`)
    }

    console.log('\nResults:\n-------------------')
    console.log(`${chalk.green(results.successes.length + ' imports succeeded')}`)
    console.log(`${results.alreadyManaged.length} imports were unnecessary because the resource was already managed by Terraform`)
    console.log(`${chalk.red(results.nonExistent.length + ' imports failed due to non-existent objects')}`)
    console.log(`${chalk.red(results.invalidId.length + ' imports failed due to invalid resource IDs')}`)
    console.log(`${chalk.red(results.errors.length + ' imports failed due to other errors')}`)
    console.log('-------------------')

    if (opts.verbose) {
      console.log(chalk.red('Non-existent object:'))
      for (const cmd of results.nonExistent) {
        console.log(cmd)
      }

      console.log(chalk.red('Invalid IDs:'))
      for (const cmd of results.invalidId) {
        console.log(cmd)
      }

      console.log(chalk.red('Other errors:'))
      for (const cmd of results.errors) {
        console.log(cmd)
      }
    }
  }
}

async function revokeFutureGrants(program: Command, opts: RevokeFutureGrantsOpts) {
  try {
    const contents = await fs.readFile(opts.config)
    const project = await Project.fromYAML(contents.toString('utf8'))

    let accessRoles: AccessRole[] = []
    if(project.environments.length > 0) {
      for(const env of project.environments) {
        accessRoles = accessRoles.concat(env.accessRoles())
      }
    } else {
      accessRoles = project.accessRoles()
    }

    // gather future grants
    let grants: SchemaObjectGrant[] = accessRoles.flatMap(ar => ar.grants).filter(g => isSchemaObjectGrant(g) && g.future) as SchemaObjectGrant[]

    // optionally filter to only ownership grants
    if(opts.ownershipOnly) grants = grants.filter(g => g.privileges.includes(Privilege.OWNERSHIP))

    const statements = grants.map(grant => {
      const keyword = grant.objectType.replace('_', ' ').toUpperCase() + 'S'
      return `REVOKE ${grant.privileges} ON FUTURE ${keyword} IN SCHEMA "${grant.schema.database.name}"."${grant.schema.name}" FROM ROLE "${grant.role.name}";`
    })
    statements.unshift('USE ROLE SECURITYADMIN;')

    if (opts.output) {
      // write statements to file
      await fs.writeFile(opts.output, statements.join('\n'))
    } else {
      for (const statement of statements) {
        console.log(statement)
      }
    }
  } catch (e: any) {
    const errorString = e.toString()
    console.error(errorString)
  }
}

async function populateFromSnowflakeAccount(program: Command, opts: SnowflakeOpts) {
  let project = new Project('Project from Snowflake Account')
  if (opts.config) {
    const contents = await fs.readFile(opts.config)
    project = await Project.fromYAML(contents.toString('utf8'))
  }

  try {
    const connectionOptions = getConnectionOptionsFromEnv()
    console.log(`Connecting to Snowflake account ${connectionOptions.account} as user ${connectionOptions.username}...`)
    const connection = await createSnowflakeConnection(connectionOptions)
    const connector = new SnowflakeConnector(connection)
    console.log(chalk.green('Successfully connected to Snowflake'))

    console.log('Listing Virtual Warehouses...')
    const virtualWarehouses = await connector.getVirtualWarehouses()
    console.log(chalk.green(`Imported ${virtualWarehouses.length} Virtual Warehouses`))

    console.log('Listing Databases...')
    const databases = await connector.getDatabases()
    console.log(chalk.green(`Imported ${databases.length} Databases`))

    console.log('Listing Roles...')
    const roles = await connector.getRoles()
    console.log(chalk.green(`Imported ${roles.length} Roles`))

    const filename = opts.output
    console.log(`Writing project file to ${filename}`)
    project.mergeVirtualWarehouses(virtualWarehouses).mergeRoles(roles).mergeDatabases(databases)

    const yaml = YAML.stringify(project.toRecord())

    await fs.mkdir(path.dirname(filename), {recursive: true})
    await fs.writeFile(filename, yaml)
    console.log(chalk.green('Finished!'))
  } catch (e: any) {
    console.error(chalk.red(e.toString()))
    console.error(chalk.red(e.stack))
  }
}

async function main() {
  const program = new Command()

  program
    .name('roleout')
    .description('Snowflake Database Modeller')
    .version(VERSION)

  const terraformCmd = program.command('terraform')
  const sqlCmd = program.command('sql')
  const snowflakeCmd = program.command('snowflake')

  sqlCmd.command('deploy')
    .description('Create a plain SQL script')
    .option('-o, --output <directory>')
    .action(opts => deploySQL(program, opts))
    .requiredOption('-c, --config <file>')

  terraformCmd.command('deploy')
    .description('Create Terraform resources')
    .option('-o, --output <directory>')
    .action(opts => deployTerraform(program, opts))
    .requiredOption('-c, --config <file>')

  terraformCmd.command('import')
    .description('Import Terraform resources. Must be run in your Terraform directory.')
    .option('-o, --output <files>', 'Write import commands to a file instead of running them')
    .option('-v, --verbose', 'Verbose output')
    .option('--grants', 'Attempt to import grants', false)
    .action(opts => importTerraform(program, opts))
    .requiredOption('-c, --config <file>')

  program.command('revokeFutureGrants')
    .description('Generates SQL commands to revoke all future grants in schemas in your Roleout project')
    .option('-o, --output <file>', 'Write SQL statements to a file instead of printing them')
    .option('--ownershipOnly', 'Only revoke future OWNERSHIP grants in the schemas in your Roleout project')
    .requiredOption('-c, --config <file>')
    .action(opts => revokeFutureGrants(program, opts))

  snowflakeCmd.command('populateProject')
    .description('Read a Snowflake account and populate a project with the databases, schemas, virtual warehouses, and roles from that account')
    .option('-c, --config <file>')
    .requiredOption('-o, --output <file>')
    .action(opts => populateFromSnowflakeAccount(program, opts))

  await program.parseAsync(process.argv)
}

main()
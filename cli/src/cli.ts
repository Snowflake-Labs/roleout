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
import {SchemaObjectGrantKinds} from 'roleout-lib/build/grants/schemaObjectGrant'
import {some} from 'lodash'
import {VERSION} from 'roleout-lib/build/version'
import YAML from 'yaml'
import {
  createSnowflakeConnection,
  getConnectionOptionsFromEnv,
  SnowflakeConnector
} from 'roleout-lib/build/snowflakeConnector'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const exec = util.promisify(require('child_process').exec)

type DeployOpts = { config: string, output: string }
type RemoveLegacyCurrentGrantsStateOpts = { output: string }
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

async function importTerraform(program: Command, opts: DeployOpts) {
  function importCommand(resource: TerraformResource, namingConvention: NamingConvention): string {
    return `terraform import ${resource.resourceType()}."${resource.resourceName(namingConvention)}" "${resource.resourceID()}"`
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

  const commands = resources.map(r => importCommand(r, project.namingConvention))

  if (opts.output) {
    // write commands to file
    await fs.writeFile(opts.output, commands.join('\n'))
  } else {
    // run commands
    const results = {successes: 0, alreadyManaged: 0, nonExistent: 0, errors: 0}
    for (const cmd of commands) {
      try {
        const {stdout} = await exec(cmd)

        if (stdout.includes('Import successful')) {
          results.successes += 1
        }
      } catch (e: any) {
        const errorString = e.toString()
        console.error(errorString)

        if (errorString.includes('Cannot import non-existent remote object') || errorString.includes('does not exist')) {
          results.nonExistent += 1
        } else if (errorString.includes('Resource already managed by Terraform')) {
          results.alreadyManaged += 1
        } else (
          results.errors += 1
        )
      }
    }

    console.log('\nResults:\n-------------------')
    console.log(`${chalk.green(results.successes + ' imports succeeded')}`)
    console.log(`${results.alreadyManaged} imports were unnecessary because the resource was already managed by Terraform`)
    console.log(`${chalk.red(results.nonExistent + ' imports failed due to non-existent remote object')}`)
    console.log(`${chalk.red(results.errors + ' imports failed due to other errors')}`)
    console.log('-------------------')
  }
}

async function removeLegacyCurrentGrantsState(program: Command, opts: RemoveLegacyCurrentGrantsStateOpts) {
  try {
    const {stdout} = await exec('terraform state list')
    const stateLines: string[] = stdout.split('\n')

    const commands = stateLines.filter(line => {
      return line.startsWith('module.') &&
        some(SchemaObjectGrantKinds, kind => {
          // we should remove lines where the data object kind does not match the current grant kind
          return line.includes(`on_current_${kind}s`) && !line.includes(`snowflake_${kind}`)
        })
    }).map(line => `terraform state rm ${line}`)

    if (opts.output) {
      // write commands to file
      await fs.writeFile(opts.output, commands.join('\n'))
    } else {
      for (const cmd of commands) {
        try {
          // run state rm command
          const {stdout} = await exec(cmd)
          console.log(stdout)
        } catch (e: any) {
          const errorString = e.toString()
          console.error(errorString)
        }
      }
    }
  } catch (e: any) {
    const errorString = e.toString()
    console.error(errorString)
  }
}

async function populateFromSnowflakeAccount(program: Command, opts: SnowflakeOpts) {
  const contents = await fs.readFile(opts.config)
  const project = await Project.fromYAML(contents.toString('utf8'))

  const connectionOptions = getConnectionOptionsFromEnv()
  const connection = await createSnowflakeConnection(connectionOptions)
  const connector = new SnowflakeConnector(connection)

  const virtualWarehouses = await connector.getVirtualWarehouses()
  const roles = await connector.getRoles()
  const databases = await connector.getDatabases()

  project.mergeVirtualWarehouses(virtualWarehouses).mergeRoles(roles).mergeDatabases(databases)

  for(const sog of project.schemaObjectGroups) {
    console.log(YAML.stringify(sog.toRecord()))
  }
  //const yaml = project.toYAML()
  // TODO write yaml
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
    .action(opts => importTerraform(program, opts))
    .requiredOption('-c, --config <file>')

  terraformCmd.command('removeLegacyCurrentGrantsState')
    .description('Removes legacy Terraform state for current grants when upgrading from version 1.5.0 or earlier. Must be run in your Terraform directory.')
    .option('-o, --output <files>', 'Write state rm commands to a file instead of running them')
    .action(opts => removeLegacyCurrentGrantsState(program, opts))

  snowflakeCmd.command('populateProject')
    .description('Read a Snowflake account and populate a project with the databases, schemas, virtual warehouses, and roles from that account')
    .requiredOption('-c, --config <file>')
    .action(opts => populateFromSnowflakeAccount(program, opts))

  await program.parseAsync(process.argv)
}

main()
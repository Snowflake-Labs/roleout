import {Backend} from './backend'
import {SchemaGrant} from '../grants/schemaGrant'
import {
  Grant,
  isDatabaseGrant,
  isSchemaGrant,
  isSchemaObjectGrant,
  isVirtualWarehouseGrant
} from '../grants/grant'
import {SchemaObjectGrant} from '../grants/schemaObjectGrant'
import {VirtualWarehouseGrant} from '../grants/virtualWarehouseGrant'
import {Privilege} from '../privilege'
import compact from 'lodash/compact'
import {Deployable} from '../deployable'
import {DeploymentOptions} from './deploymentOptions'
import {AccessRole} from '../roles/accessRole'
import {every} from 'lodash'
import {virtualWarehouseSizeSQLIdentifier} from '../objects/virtualWarehouse'

export class SQLBackend extends Backend {
  private static generateGrantSQL(grant: Grant, accessRoleName: string): string {
    function schemaObjectGrantSQL(grant: SchemaObjectGrant): string {
      const keyword = grant.objectType.replace('_', ' ').toUpperCase() + 'S'
      const copyCurrentGrants = grant.privileges.includes(Privilege.OWNERSHIP) && !grant.future ? ' COPY CURRENT GRANTS' : ''
      if (grant.objectName()) return `GRANT ${grant.privileges} ON ${grant.objectType.toUpperCase()} "${grant.schema.database.name}"."${grant.schema.name}"."${grant.objectName()}" TO ROLE "${accessRoleName}";`
      return `GRANT ${grant.privileges.join(', ')} ON ${grant.future ? 'FUTURE' : 'ALL'} ${keyword} IN SCHEMA "${grant.schema.database.name}"."${grant.schema.name}" TO ROLE "${accessRoleName}"${copyCurrentGrants};`
    }

    if (isSchemaObjectGrant(grant)) {
      return schemaObjectGrantSQL(grant as SchemaObjectGrant)
    }

    if (isSchemaGrant(grant)) {
      const sql = `GRANT ${grant.privileges} ON SCHEMA "${grant.schema.database.name}"."${grant.schema.name}" TO ROLE "${accessRoleName}"`
      if (grant.privileges.includes(Privilege.OWNERSHIP)) return sql + ' REVOKE CURRENT GRANTS;'
      return sql + ';'
    }

    if (isDatabaseGrant(grant)) {
      return `GRANT ${grant.privileges} ON DATABASE "${grant.database.name}" TO ROLE "${accessRoleName}";`
    }

    if (isVirtualWarehouseGrant(grant)) {
      return `GRANT ${grant.privileges} ON WAREHOUSE "${grant.virtualWarehouse.name}" TO ROLE "${accessRoleName}";`
    }

    throw new Error(`Unhandled grant type ${grant.constructor}`)
  }

  /*
   * Create shell scripts for deployment and teardown
   */
  staticFiles(): Map<string, string> {
    const [deploySh, teardownSh] = ['deploy', 'teardown'].map(verb => {
      return `#!/bin/bash

set -e

if ! command -v snowsql &> /dev/null
then
    echo "It looks like SnowSQL is not installed. Please download and install SnowSQL, then re-run this command."
    echo "https://docs.snowflake.com/en/user-guide/snowsql.html"
    exit
fi

read -r -p "Are you sure you want to ${verb} your Snowflake account? [y/N] " response
case "$response" in
    [yY][eE][sS]|[yY])
        for FILE in $(dirname -- $0)/*.sql
        do
            CMD="snowsql -o exit_on_error=True -f '$FILE' "$@""
            echo $CMD
            /bin/bash -c "$CMD"
        done
        ;;
    *)
        exit
        ;;
esac
 `
    })

    const [deployPS, teardownPS] = ['deploy', 'teardown'].map(verb => {
      return `$passArguments = $args
 
$oldPreference = $ErrorActionPreference
$ErrorActionPreference = 'Stop'
Try { Get-Command snowsql | out-null }
Catch
{
    Write-Host "It looks like SnowSQL is not installed. Please download and install SnowSQL, then re-run this command." -ForegroundColor Yellow
    Write-Host "https://docs.snowflake.com/en/user-guide/snowsql.html" -ForegroundColor Yellow
    Exit
}
Finally {$ErrorActionPreference = $oldPreference}
 
$title = '${verb.toUpperCase()}?'
$prompt = 'Are you sure you want to ${verb} your Snowflake account?'
$abort = New-Object System.Management.Automation.Host.ChoiceDescription '&No','Aborts the operation'
$continue = New-Object System.Management.Automation.Host.ChoiceDescription '&Yes','Continues with the operation'
$options = [System.Management.Automation.Host.ChoiceDescription[]] ($abort,$continue)
 
$choice = $host.ui.PromptForChoice($title,$prompt,$options,0)
 
if ( $choice -eq 0  ) { Exit }
 
Get-ChildItem -Path $PSScriptRoot -Filter *.sql |
 
Foreach-Object {
    $file = $_.FullName
    $cmd = "snowsql -o exit_on_error=True -f '$file' $passArguments"
    Write-Host $cmd
    Invoke-Expression $cmd
}
 `
    })

    return new Map<string, string>([
      ['deploy.sh', deploySh],
      ['teardown/teardown.sh', teardownSh],
      ['deploy.ps1', deployPS],
      ['teardown/teardown.ps1', teardownPS],
    ])
  }

  protected _deploy(deployable: Deployable, options?: DeploymentOptions): Map<string, string> {
    const managerRole = options?.environmentManagerRole || 'SYSADMIN'

    function deploySetup(): string {
      const blocks: string[] = []
      blocks.push(`--\n-- ${options?.environmentName} Environment\n--\n`)

      blocks.push([
        'USE ROLE USERADMIN;',
        `CREATE ROLE IF NOT EXISTS "${options?.environmentManagerRole}";`, // create environment manager role
        `GRANT ROLE "${options?.environmentManagerRole}" TO ROLE SYSADMIN;`, // all roles should roll up to SYSADMIN
        'USE ROLE SYSADMIN;',
        `GRANT CREATE DATABASE ON ACCOUNT TO ROLE "${options?.environmentManagerRole}";`,
        `GRANT CREATE WAREHOUSE ON ACCOUNT TO ROLE "${options?.environmentManagerRole}";`,
      ].join('\n'))

      return blocks.join('\n')
    }

    function deployDatabases(): string {
      const statements: string[] = []

      if (options?.environmentName) statements.push(`--\n-- ${options?.environmentName} Environment\n--\n`)

      statements.push(`USE ROLE "${managerRole}";`)

      for (const database of deployable.databases) {
        statements.push(`CREATE ${database.transient ? 'TRANSIENT ' : ''}DATABASE IF NOT EXISTS "${database.name}";`)
        if (database.dataRetentionTimeInDays !== undefined) statements.push(`ALTER DATABASE "${database.name}" SET DATA_RETENTION_TIME_IN_DAYS = ${database.dataRetentionTimeInDays};`)

        for (const schema of database.schemata) {
          const qualifiedSchema = `"${database.name}"."${schema.name}"`
          statements.push(`CREATE ${schema.transient ? 'TRANSIENT ' : ''}SCHEMA IF NOT EXISTS ${qualifiedSchema}${schema.managedAccess ? ' WITH MANAGED ACCESS' : ''};`)
          if (schema.dataRetentionTimeInDays !== undefined) statements.push(`ALTER SCHEMA ${qualifiedSchema} SET DATA_RETENTION_TIME_IN_DAYS = ${schema.dataRetentionTimeInDays};`)
        }
      }

      return statements.join('\n')
    }

    function deployVirtualWarehouses(): string {
      return (compact([
        options?.environmentName ? `--\n-- ${options?.environmentName} Environment\n--\n` : null,
        `USE ROLE "${managerRole}";\n`
      ]) as string[]).concat(
        deployable.virtualWarehouses.map(vwh =>
          [
            `CREATE WAREHOUSE IF NOT EXISTS "${vwh.name}" WITH INITIALLY_SUSPENDED = ${vwh.initiallySuspended ? 'TRUE' : 'FALSE'} WAREHOUSE_SIZE = ${virtualWarehouseSizeSQLIdentifier(vwh.size)};`
          ].concat(
            compact([
              `ALTER WAREHOUSE "${vwh.name}" SET`,
              'WAIT_FOR_COMPLETION = TRUE',
              `WAREHOUSE_SIZE = ${virtualWarehouseSizeSQLIdentifier(vwh.size)}`,
              `MIN_CLUSTER_COUNT = ${vwh.minClusterCount}`,
              `MAX_CLUSTER_COUNT = ${vwh.maxClusterCount}`,
              vwh.maxClusterCount > vwh.minClusterCount ? `SCALING_POLICY = ${vwh.scalingPolicy}` : null,
              `AUTO_SUSPEND = ${vwh.autoSuspend * 60}`,
              `AUTO_RESUME = ${vwh.autoResume ? 'TRUE' : 'FALSE'}`,
              `ENABLE_QUERY_ACCELERATION = ${vwh.enableQueryAcceleration ? 'TRUE' : 'FALSE'}`,
              vwh.queryAccelerationMaxScaleFactor ? `QUERY_ACCELERATION_MAX_SCALE_FACTOR = ${vwh.queryAccelerationMaxScaleFactor}` : null,
              vwh.statementTimeoutInSeconds ? `STATEMENT_TIMEOUT_IN_SECONDS = ${vwh.statementTimeoutInSeconds}` : null,
              vwh.resourceMonitor ? `RESOURCE_MONITOR = ${vwh.resourceMonitor}` : null,
              `WAREHOUSE_TYPE = "${vwh.type}";\n`
            ])).join('\n')
        )
      ).join('\n')
    }

    function deployFunctionalRoles(): string {
      return compact([
        options?.environmentName ? `--\n-- ${options?.environmentName} Environment\n--\n` : null,
        'USE ROLE USERADMIN;'
      ].concat(
        deployable.functionalRoles.map(fr =>
          [
            `CREATE ROLE IF NOT EXISTS "${fr.name}";`,
            `GRANT ROLE "${fr.name}" TO ROLE "${managerRole}";`
          ].join('\n'))
      )).join('\n')
    }

    function deployRBAC(): string {
      const statements: string[] = []

      if (options?.environmentName) statements.push(`--\n-- ${options?.environmentName} Environment\n--\n`)

      // The access role that owns the schema needs to be created and granted ownership before all other access roles
      const isSchemaOwnerGrant = (grant: Grant): boolean => grant instanceof SchemaGrant && grant.privileges.includes(Privilege.OWNERSHIP)
      const isVirtualWarehouseOwnerGrant = (grant: Grant): boolean => grant instanceof VirtualWarehouseGrant && grant.privileges.includes(Privilege.OWNERSHIP)
      const ownerRoles: AccessRole[] = []
      for (const role of deployable.accessRoles()) {
        const ownerGrant: SchemaGrant | VirtualWarehouseGrant | undefined = (role.grants.find(isSchemaOwnerGrant) as SchemaGrant) || (role.grants.find(isVirtualWarehouseOwnerGrant) as VirtualWarehouseGrant) || undefined
        if (ownerGrant) {
          let ownedObjectName = ''
          if (isSchemaGrant(ownerGrant) && ownerGrant.schema) ownedObjectName = ownerGrant.schema.name
          if (isVirtualWarehouseGrant(ownerGrant)) ownedObjectName = ownerGrant.virtualWarehouse.name
          ownerRoles.push(role)
          statements.push(`-- Create ${ownedObjectName} owner access role`)
          statements.push('USE ROLE USERADMIN;')
          statements.push(`CREATE ROLE IF NOT EXISTS "${role.name}";`)
          statements.push('USE ROLE SECURITYADMIN;')
          statements.push(SQLBackend.generateGrantSQL(ownerGrant, role.name))
          statements.push(`GRANT ROLE "${role.name}" TO ROLE "${managerRole}";`)
          statements.push('')
        }
      }

      // create all the access roles with their respective grants
      // but don't repeat the virtual warehouse owner roles already created above
      for (const accessRole of deployable.accessRoles().filter(ar => !every(ar.grants, isVirtualWarehouseOwnerGrant))) {
        statements.push(`-- Create and Grant Privileges to Access Role ${accessRole.name}`)

        // switch to role_admin role
        statements.push('USE ROLE USERADMIN;')
        // create access role
        if (!ownerRoles.includes(accessRole)) statements.push(`CREATE ROLE IF NOT EXISTS "${accessRole.name}";`)
        // access roles should roll up to the environment manager role
        statements.push(`GRANT ROLE "${accessRole.name}" TO ROLE "${managerRole}";`)
        statements.push('USE ROLE SECURITYADMIN;')
        // grant privileges to access role
        for (const grant of accessRole.grants.filter(g => !isSchemaOwnerGrant(g) && !isVirtualWarehouseOwnerGrant(g))) { // don't repeat the schema ownership grant
          statements.push(SQLBackend.generateGrantSQL(grant, accessRole.name))
        }

        statements.push('')
      }

      // grant access roles to functional roles
      const functionalToAccessRoleMap = deployable.functionalToAccessRoleMap()
      if (functionalToAccessRoleMap.size > 0) {
        statements.push('-- Grant Access Roles to Functional Roles')
        statements.push('USE ROLE SECURITYADMIN;')
      }
      for (const [functionalRoleName, accessRoles] of functionalToAccessRoleMap) {
        for (const accessRole of accessRoles) {
          statements.push(`GRANT ROLE "${accessRole.name}" TO ROLE "${functionalRoleName}";`)
        }
      }

      statements.push('\n')

      // grant access roles to other access roles
      const accessRoleToAccessRoleMap = deployable.accessRoleToAccessRoleMap()
      if (accessRoleToAccessRoleMap.size > 0) {
        statements.push('-- Grant Access Roles to Other Access Roles')
        statements.push('USE ROLE SECURITYADMIN;')
      }
      for (const [toAccessRole, accessRoles] of accessRoleToAccessRoleMap) {
        for (const accessRole of accessRoles) {
          statements.push(`GRANT ROLE "${accessRole.name}" TO ROLE "${toAccessRole.name}";`)
        }
      }
      
      return statements.join('\n')
    }

    function teardownDatabases(): string {
      const statements: string[] = []

      if (options?.environmentName) statements.push(`--\n-- ${options?.environmentName} Environment\n--\n`)

      statements.push('USE ROLE SYSADMIN;')

      for (const database of deployable.databases) {
        statements.push(`DROP DATABASE "${database.name}";`)
      }

      return statements.join('\n')
    }

    function teardownVirtualWarehouses(): string {
      const statements: string[] = []

      if (options?.environmentName) statements.push(`--\n-- ${options?.environmentName} Environment\n--\n`)

      statements.push('USE ROLE SYSADMIN;')

      for (const virtualWarehouse of deployable.virtualWarehouses) {
        statements.push(`DROP WAREHOUSE "${virtualWarehouse.name}";`)
      }

      return statements.join('\n')
    }

    function teardownFunctionalRoles(): string {
      const statements: string[] = []

      if (options?.environmentName) statements.push(`--\n-- ${options?.environmentName} Environment\n--\n`)

      statements.push('USE ROLE USERADMIN;')

      for (const role of deployable.functionalRoles) {
        statements.push(`DROP ROLE IF EXISTS "${role.name}";`)
      }

      return statements.join('\n')
    }

    function teardownRBAC(): string {
      const statements: string[] = []

      if (options?.environmentName) statements.push(`--\n-- ${options?.environmentName} Environment\n--\n`)

      statements.push('USE ROLE SECURITYADMIN;')

      // drop all schema ARS
      for (const database of deployable.databases) {
        for (const accessRole of database.accessRoles(deployable.namingConvention)) {
          statements.push(`DROP ROLE IF EXISTS "${accessRole.name}";`)
        }

        for (const schema of database.schemata) {
          for (const accessRole of schema.accessRoles(deployable.namingConvention)) {
            statements.push(`DROP ROLE IF EXISTS "${accessRole.name}";`)
          }
          statements.push(`GRANT OWNERSHIP ON SCHEMA "${database.name}"."${schema.name}" TO ROLE SYSADMIN COPY CURRENT GRANTS;`)
        }
        statements.push(`GRANT OWNERSHIP ON DATABASE "${database.name}" TO ROLE SYSADMIN COPY CURRENT GRANTS;`)
      }

      // drop all vwh ARs
      for (const virtualWarehouse of deployable.virtualWarehouses) {
        for (const accessRole of virtualWarehouse.accessRoles(deployable.namingConvention)) {
          statements.push(`DROP ROLE "${accessRole.name}";`)
        }
        statements.push(`GRANT OWNERSHIP ON WAREHOUSE "${virtualWarehouse.name}" TO ROLE SYSADMIN COPY CURRENT GRANTS;`)
      }

      return statements.join('\n')
    }

    function teardownSetup(): string {
      const statements: string[] = []

      if (options?.environmentName) statements.push(`--\n-- ${options?.environmentName} Environment\n--\n`)

      // drop env sysadmin
      if (options?.environmentManagerRole) {
        statements.push(`DROP ROLE "${options.environmentManagerRole}";\n`)
      }

      return statements.join('\n')
    }


    return new Map(compact([
      options?.environmentName ? ['00 - Setup.sql', deploySetup()] : null,
      ['01 - Databases and Schemas.sql', deployDatabases()],
      ['02 - Virtual Warehouses.sql', deployVirtualWarehouses()],
      ['03 - Functional Roles.sql', deployFunctionalRoles()],
      ['04 - RBAC.sql', deployRBAC()],
      ['teardown/01 - Teardown RBAC.sql', teardownRBAC()],
      ['teardown/02 - Teardown Databases and Schemas.sql', teardownDatabases()],
      ['teardown/03 - Teardown Virtual Warehouses.sql', teardownVirtualWarehouses()],
      ['teardown/04 - Teardown Functional Roles.sql', teardownFunctionalRoles()],
      options?.environmentName ? ['teardown/05 - Teardown Setup.sql', teardownSetup()] : null,
    ]))
  }
}

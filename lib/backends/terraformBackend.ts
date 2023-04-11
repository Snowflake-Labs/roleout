import {Backend} from './backend'
import {SchemaGrant} from '../grants/schemaGrant'
import {DatabaseGrant} from '../grants/databaseGrant'
import {Grant, GrantKind} from '../grants/grant'
import {SchemaObjectGrant, SchemaObjectGrantKinds} from '../grants/schemaObjectGrant'
import {VirtualWarehouseGrant} from '../grants/virtualWarehouseGrant'
import {Deployable} from '../deployable'
import {DeploymentOptions} from './deploymentOptions'
import produce from 'immer'
import compact from 'lodash/compact'
import {Privilege} from '../privilege'
import mainFiles from './terraform/modules/grantAllCurrent/main'
import variablesContents from './terraform/modules/grantAllCurrent/variables'
import {TerraformResource} from './terraform/terraformResource'
import {TerraformDatabase} from './terraform/terraformDatabase'
import {TerraformSchema} from './terraform/terraformSchema'
import {TerraformVirtualWarehouse} from './terraform/terraformVirtualWarehouse'
import {TerraformRole} from './terraform/terraformRole'
import {TerraformRoleGrants} from './terraform/terraformRoleGrants'
import {TerraformGrant} from './terraform/terraformGrant'
import {TerraformSchemaObjectGrant} from './terraform/terraformSchemaObjectGrant'
import {TerraformSchemaGrant} from './terraform/terraformSchemaGrant'
import {TerraformVirtualWarehouseGrant} from './terraform/terraformVirtualWarehouseGrant'
import {TerraformDatabaseGrant} from './terraform/terraformDatabaseGrant'
import {Role} from '../roles/role'
import {TERRAFORM_VERSION} from './terraform/terraformVersion'


export class TerraformBackend extends Backend {
  static INDENT_SPACES = 2
  static SPACING = ' '.repeat(TerraformBackend.INDENT_SPACES)
  static SYSTEM_ROLES = ['ACCOUNTADMIN', 'SECURITYADMIN', 'SYSADMIN', 'USERADMIN', 'PUBLIC']
  static TERRAFORM_PROVIDER_FILE = `terraform {
  required_providers {
    snowflake = {
      source = "Snowflake-Labs/snowflake"
      version = "${TERRAFORM_VERSION}"
    }
  }
}

provider "snowflake" {
  role = "ACCOUNTADMIN"
}
`

  staticFiles(): Map<string, string> {
    const files = new Map<string, string>(
      [['snowflake.tf', TerraformBackend.TERRAFORM_PROVIDER_FILE]]
    )

    for (const [kind, contents] of mainFiles) {
      files.set(`modules/snowflake-grant-all-current-${kind}/main.tf`, contents)
      files.set(`modules/snowflake-grant-all-current-${kind}/variables.tf`, variablesContents)
    }

    return files
  }

  databaseResources(deployable: Deployable): (TerraformDatabase | TerraformSchema)[] {
    return deployable.databases.flatMap(db => {
      const terraformDatabase = TerraformDatabase.fromDatabase(db)
      return ([terraformDatabase] as (TerraformDatabase | TerraformSchema)[]).concat(db.schemata.map(s => TerraformSchema.fromSchema(s)))
    })
  }

  virtualWarehouseResources(deployable: Deployable): TerraformVirtualWarehouse[] {
    return deployable.virtualWarehouses.map(vwh => TerraformVirtualWarehouse.fromVirtualWarehouse(vwh))
  }

  functionalRoleResources(deployable: Deployable, managerRole: Role): (TerraformRole | TerraformRoleGrants)[] {
    return deployable.functionalRoles.flatMap(fr => {
      const terraformRole = new TerraformRole(fr.name)
      if (managerRole.name != 'SYSADMIN') {
        return [terraformRole, new TerraformRoleGrants(terraformRole, [], [TerraformRole.fromRole(managerRole)])]
      } else {
        return [terraformRole, new TerraformRoleGrants(terraformRole, [managerRole], [])]
      }
    })
  }

  rbacResources(deployable: Deployable, environmentManagerRole: Role): (TerraformRole | TerraformRoleGrants | TerraformGrant)[] {
    // Reduce multiple grants on the same object into 1 Terraform grant resource
    function reduceGrants(grantMap: Map<GrantKind, TerraformGrant[]>) {
      let reducedGrants: TerraformGrant[] = []
      for (const grants of grantMap.values()) {
        if (grants.length > 0) {
          // build a map of all the grants that differ only in their role
          const uniqueGrantMap: Map<string, TerraformGrant[]> = new Map()
          for (const grant of grants) {
            if (!uniqueGrantMap.has(grant.uniqueKey())) uniqueGrantMap.set(grant.uniqueKey(), [])
            uniqueGrantMap.get(grant.uniqueKey())?.push(grant)
          }
          for (const reduceableGrants of uniqueGrantMap.values()) {
            reducedGrants = reducedGrants.concat(
              reduceableGrants.reduce((prev, curr) => {
                return produce(prev, draft => {
                  draft.toRoles = draft.toRoles.concat(curr.toRoles)
                  draft.toTerraformRoles = draft.toTerraformRoles.concat(curr.toTerraformRoles)
                })
              }))
          }
        }
      }
      return reducedGrants
    }

    let resources: (TerraformRole | TerraformRoleGrants | TerraformGrant)[] = []
    const grantMap: Map<GrantKind, TerraformGrant[]> = new Map()

    for (const accessRole of deployable.accessRoles()) {
      // create access role
      resources.push(new TerraformRole(accessRole.name))

      // grant privileges to access role
      for (const grant of accessRole.grants) {
        const resource = TerraformBackend.generateGrantResource(grant)
        if (resource) {
          if (!grantMap.has(resource.kind)) grantMap.set(resource.kind, [])
          grantMap.get(resource.kind)?.push(resource)
        }
      }
    }
    resources = resources.concat(reduceGrants(grantMap))

    // grant access roles to functional roles and manager role
    const accessRoleMap = deployable.accessToFunctionalRoleMap()
    for (const accessRole of deployable.accessRoles()) {
      const grantRoles: Role[] = []
      const grantTerraformRoles = (accessRoleMap.get(accessRole.name) ?? [] as Role[]).map(r => TerraformRole.fromRole(r))

      if (environmentManagerRole.name != 'SYSADMIN') {
        grantTerraformRoles.push(TerraformRole.fromRole(environmentManagerRole))
      } else {
        grantRoles.push(environmentManagerRole)
      }
      resources.push(
        new TerraformRoleGrants(
          new TerraformRole(accessRole.name), grantRoles, grantTerraformRoles)
      )
    }

    if (environmentManagerRole.name != 'SYSADMIN') {
      const terraformEnvironmentManagerRole = TerraformRole.fromRole(environmentManagerRole)
      const grantEnvManagerToSysadmin = new TerraformRoleGrants(terraformEnvironmentManagerRole, [new Role('SYSADMIN')], [])
      resources = resources.concat([
        terraformEnvironmentManagerRole,
        grantEnvManagerToSysadmin
      ])

      // environment manager role owns databases
      // environment manager must be granted to sysadmin before taking ownership of the database, or else ACCOUNTADMIN
      // will not have indirect ownership of the database and will be unable to create schemas
      for (const database of deployable.databases) {
        resources.push(new TerraformDatabaseGrant(database, Privilege.OWNERSHIP, [], [terraformEnvironmentManagerRole], [grantEnvManagerToSysadmin]))
      }
    }

    return resources
  }

  protected _deploy(deployable: Deployable, options?: DeploymentOptions): Map<string, string> {
    const managerRole = new Role(options?.environmentManagerRole || 'SYSADMIN')

    const resourceFnToLines = (resourceFn: (deployable: Deployable, managerRole: Role) => TerraformResource[]) => {
      return resourceFn(deployable, managerRole).map(r => r.resourceBlock(deployable.namingConvention)).join('\n\n')
    }

    return new Map(compact([
      ['databases.tf', resourceFnToLines(this.databaseResources)],
      ['virtual_warehouses.tf', resourceFnToLines(this.virtualWarehouseResources)],
      ['functional_roles.tf', resourceFnToLines(this.functionalRoleResources)],
      ['rbac.tf', resourceFnToLines(this.rbacResources)]
    ]))
  }

  private static generateGrantResource(grant: Grant): TerraformGrant | null {
    if (SchemaObjectGrantKinds.includes(grant.kind))
      return TerraformSchemaObjectGrant.fromSchemaObjectGrant(grant as SchemaObjectGrant)

    switch (grant.kind) {
    case 'schema':
      return TerraformSchemaGrant.fromSchemaGrant(grant as SchemaGrant)
    case 'database':
      return TerraformDatabaseGrant.fromDatabaseGrant(grant as DatabaseGrant)
    case 'virtual_warehouse':
      return TerraformVirtualWarehouseGrant.fromVirtualWarehouseGrant(grant as VirtualWarehouseGrant)
    default:
      throw new Error(`Unhandled grant kind ${grant.kind}`)
    }
  }
}

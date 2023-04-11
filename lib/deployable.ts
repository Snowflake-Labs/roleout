import {Database} from './objects/database'
import {VirtualWarehouse} from './objects/virtualWarehouse'
import {FunctionalRole} from './roles/functionalRole'
import {AccessRole} from './roles/accessRole'
import {NamingConvention} from './namingConvention'
import {DeploymentOptions} from './backends/deploymentOptions'
import {SchemaObjectGroup} from './schemaObjectGroup'
import {find} from 'lodash'
import {ProjectFileError} from './project'
import {Schema} from './objects/schema'

abstract class DeployableError extends Error {}
export class UndefinedObjectError extends DeployableError {
  constructor(objectType: string, name: string) {
    super(`${objectType} '${name}' is not defined in this project`)
  }
}
export class UndefinedRoleError extends UndefinedObjectError {
  constructor(name: string) {
    super('Role', name)
  }
}
export class UndefinedDatabaseError extends UndefinedObjectError {
  constructor(name: string) {
    super('Database', name)
  }
}
export class UndefinedSchemaError extends UndefinedObjectError {
  constructor(name: string) {
    super('Schema', name)
  }
}

export abstract class Deployable {
  name: string
  databases: Database[]
  schemaObjectGroups: SchemaObjectGroup[]
  virtualWarehouses: VirtualWarehouse[]
  functionalRoles: FunctionalRole[]
  deploymentOptions?: DeploymentOptions
  namingConvention: NamingConvention

  constructor(name: string, namingConvention: NamingConvention) {
    this.name = name
    this.databases = []
    this.schemaObjectGroups = []
    this.virtualWarehouses = []
    this.functionalRoles = []
    this.namingConvention = namingConvention
  }

  public accessRoles(): AccessRole[] {
    let accessRoles: AccessRole[] = []

    for (const database of this.databases) {
      for (const schema of database.schemata) {
        accessRoles = accessRoles.concat(
          schema.accessRoles(this.namingConvention)
        )
      }
    }

    for(const schemaObjectGroup of this.schemaObjectGroups) {
      accessRoles = accessRoles.concat(schemaObjectGroup.accessRoles(this.namingConvention))
    }

    for (const virtualWarehouse of this.virtualWarehouses) {
      accessRoles = accessRoles.concat(virtualWarehouse.accessRoles(this.namingConvention))
    }

    return accessRoles
  }

  functionalToAccessRoleMap(): Map<string, AccessRole[]> {
    const roleMap: Map<string, AccessRole[]> = new Map<string, AccessRole[]>()

    for (const functionalRole of this.functionalRoles) {
      roleMap.set(functionalRole.name, [])
    }

    for (const database of this.databases) {
      for (const schema of database.schemata) {
        const schemaAccessRoles = schema.accessRoles(this.namingConvention)

        for (const [functionalRole, level] of schema.access) {
          const accessRole = schemaAccessRoles.find((sar) => sar.accessLevel === level)

          if (undefined === accessRole) {
            throw new Error(
              `Could not find access role on schema '${schema.name}' for functional role '${functionalRole.name}'`
            )
          }

          roleMap.get(functionalRole.name)?.push(accessRole)
        }
      }
    }

    for(const schemaObjectGroup of this.schemaObjectGroups) {
      const schemaObjectGroupAccessRoles = schemaObjectGroup.accessRoles(this.namingConvention)

      for(const [functionalRole, level] of schemaObjectGroup.access) {
        const accessRole = schemaObjectGroupAccessRoles.find(sogar => sogar.accessLevel === level)

        if (undefined === accessRole) {
          throw new Error(
            `Could not find access role on schema object group '${schemaObjectGroup.name}' for functional role '${functionalRole.name}'`
          )
        }

        roleMap.get(functionalRole.name)?.push(accessRole)
      }
    }

    for (const virtualWarehouse of this.virtualWarehouses) {
      const accessRoles = virtualWarehouse.accessRoles(this.namingConvention)
      for (const [functionalRole, level] of virtualWarehouse.access) {
        const accessRole = accessRoles.find((ar) => ar.accessLevel === level)

        if (undefined === accessRole) {
          throw new Error(
            `Could not find access role on warehouse '${virtualWarehouse.name}' for functional role '${functionalRole.name}'`
          )
        }

        roleMap.get(functionalRole.name)?.push(accessRole)
      }
    }

    return roleMap
  }

  accessToFunctionalRoleMap(): Map<string, FunctionalRole[]> {
    const functionalToAccessRoleMap = this.functionalToAccessRoleMap()
    const accessToFunctionalRoleMap = new Map<string, FunctionalRole[]>()

    for (const [functionalRoleName, accessRoles] of functionalToAccessRoleMap) {
      for (const accessRoleName of accessRoles.map((ar) => ar.name)) {
        if (accessToFunctionalRoleMap.has(accessRoleName)) {
          const functionalRole = this.findFunctionalRole(functionalRoleName)
          accessToFunctionalRoleMap.get(accessRoleName)?.push(functionalRole)
        } else {
          accessToFunctionalRoleMap.set(accessRoleName, [
            this.findFunctionalRole(functionalRoleName),
          ])
        }
      }
    }

    return accessToFunctionalRoleMap
  }

  findFunctionalRole(name: string): FunctionalRole {
    const result = this.functionalRoles.find((fr) => fr.name === name)
    if (undefined === result) {
      throw new UndefinedRoleError(name)
    } else {
      return result
    }
  }

  findSchema(databaseName: string, schemaName: string): Schema {
    const database = find(this.databases, db => db.name === databaseName)
    if(!database) throw new UndefinedDatabaseError(databaseName)
    const schema = find(database.schemata, s => s.name === schemaName)
    if(!schema) throw new UndefinedSchemaError(schemaName)
    return schema
  }
}
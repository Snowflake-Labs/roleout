import {RootState} from '../../app/store'
import produce from 'immer'
import YAML from 'yaml'
import {DataAccessLevel} from 'roleout-lib/access/dataAccessLevel'
import {VirtualWarehouseAccessLevel} from 'roleout-lib/access/virtualWarehouseAccessLevel'
import {defaultNamingConvention, NamingConvention} from 'roleout-lib/namingConvention'
import {defaultVirtualWarehouseOptions} from 'roleout-lib/build/objects/virtualWarehouse'
import {defaultDatabaseOptions} from 'roleout-lib/build/objects/database'
import {defaultSchemaOptions} from 'roleout-lib/build/objects/schema'
import {defaultProjectOptions} from 'roleout-lib/build/project'
import {SchemaObjectGroupAccessLevel} from 'roleout-lib/build/access/schemaObjectGroupAccessLevel'

export const stateToRoleoutYAML = (state: RootState) => {
  const environmentsEnabled = state.project.environmentsEnabled

  const doc: { project: { [k: string]: unknown } } = {project: {}}

  doc.project.name = state.project.name

  // Options
  if (state.project.enforceUnquotedIdentifiers != defaultProjectOptions.enforceUnquotedIdentifiers) {
    doc.project.options = {
      enforceUnquotedIdentifiers: state.project.enforceUnquotedIdentifiers
    }
  }
  if (state.project.schemaObjectGroupsEnabled != defaultProjectOptions.schemaObjectGroupsEnabled) {
    doc.project.options = {
      schemaObjectGroupsEnabled: state.project.schemaObjectGroupsEnabled
    }
  }

  // Environments
  if (environmentsEnabled && state.environments.length > 0) doc.project.environments = state.environments

  // Functional Roles
  doc.project.functionalRoles = state.functionalRoles

  // Databases
  doc.project.databases = produce(state.databases, draft => {
    const newDatabases: any = []
    for (const draftDatabase of draft) {
      const newDatabase = {
        name: draftDatabase.name,
        access: [] as any[],
        schemata: [] as any[],
        options: undefined as any
      }

      // Options
      if (environmentsEnabled) {
        newDatabase.options = []
        if (!draftDatabase.environmentOptions) throw new Error('Missing database environment options')
        for (const environment of Object.keys(draftDatabase.environmentOptions)) {
          newDatabase.options.push({env: environment, ...draftDatabase.environmentOptions[environment]})
        }
      } else if (JSON.stringify(draftDatabase.options) !== JSON.stringify(defaultDatabaseOptions)) {
        newDatabase.options = draftDatabase.options
      }

      // Database Access
      for (const [role, access] of Object.entries(draftDatabase.access)) {
        for (const a of access) {
          if ((environmentsEnabled && a.environment) || !a.environment) newDatabase.access.push({
            role: role,
            level: DataAccessLevel[a.level],
            env: a.environment
          })
        }
      }

      // Schemata
      for (const draftSchema of draftDatabase.schemata) {
        const newSchema: any = {
          name: draftSchema.name,
          access: [],
          options: undefined as any
        }

        // Options
        if (environmentsEnabled) {
          newSchema.options = []
          if (!draftSchema.environmentOptions) throw new Error('Missing schema environment options')
          for (const environment of Object.keys(draftSchema.environmentOptions)) {
            newSchema.options.push({env: environment, ...draftSchema.environmentOptions[environment]})
          }
        } else if (JSON.stringify(draftSchema.options) !== JSON.stringify(defaultSchemaOptions)) {
          newSchema.options = draftSchema.options
        }

        // Access
        for (const [role, access] of Object.entries(draftSchema.access)) {
          for (const a of access) {
            if ((environmentsEnabled && a.environment) || !a.environment) newSchema.access.push({
              role: role,
              level: DataAccessLevel[a.level],
              env: a.environment
            })
          }
        }
        newDatabase.schemata.push(newSchema)
      }
      newDatabases.push(newDatabase)
    }

    return newDatabases
  })

  // Schema Object Groups
  if(state.project.schemaObjectGroupsEnabled && state.schemaObjectGroups.length > 0) {
    doc.project.schemaObjectGroups = produce(state.schemaObjectGroups, draft => {
      const newSchemaObjectGroups: any = []

      for (const draftSchemaObjectGroup of draft) {
        const tables: { database: string, schema: string, name: string }[] = []
        const views: { database: string, schema: string, name: string }[] = []
        for (const database of Object.keys(draftSchemaObjectGroup.objects)) {
          for (const schema of Object.keys(draftSchemaObjectGroup.objects[database])) {
            for (const name of draftSchemaObjectGroup.objects[database][schema].tables) {
              tables.push({database, schema, name})
            }
            for (const name of draftSchemaObjectGroup.objects[database][schema].views) {
              views.push({database, schema, name})
            }
          }
        }

        // Access
        const newAccess: { role: string, level: string, env?: string }[] = []
        for (const [role, access] of Object.entries(draftSchemaObjectGroup.access)) {
          for (const a of access) {
            if ((environmentsEnabled && a.environment) || !a.environment) newAccess.push({
              role: role,
              level: SchemaObjectGroupAccessLevel[a.level],
              env: a.environment
            })
          }
        }
        const newSchemaObjectGroup = {
          name: draftSchemaObjectGroup.name,
          tables,
          views,
          access: newAccess
        }
        newSchemaObjectGroups.push(newSchemaObjectGroup)
      }

      return newSchemaObjectGroups
    })
  }

  // Virtual Warehouses
  doc.project.virtualWarehouses = produce(state.virtualWarehouses, draft => {
    const newVirtualWarehouses: any = []
    for (const draftVirtualWarehouse of draft) {
      const newVirtualWarehouse = {name: draftVirtualWarehouse.name, options: undefined as any, access: [] as any[]}

      // Options
      if (environmentsEnabled) {
        newVirtualWarehouse.options = []
        if (!draftVirtualWarehouse.environmentOptions) throw new Error('Missing virtual warehouse environment options')
        for (const environment of Object.keys(draftVirtualWarehouse.environmentOptions)) {
          newVirtualWarehouse.options.push({env: environment, ...draftVirtualWarehouse.environmentOptions[environment]})
        }
      } else if (JSON.stringify(draftVirtualWarehouse.options) !== JSON.stringify(defaultVirtualWarehouseOptions)) {
        newVirtualWarehouse.options = draftVirtualWarehouse.options
      }

      // Access
      for (const [role, access] of Object.entries(draftVirtualWarehouse.access)) {
        for (const a of access) {
          if ((environmentsEnabled && a.environment) || !a.environment) newVirtualWarehouse.access.push({
            role: role,
            level: VirtualWarehouseAccessLevel[a.level],
            env: a.environment
          })
        }
      }
      newVirtualWarehouses.push(newVirtualWarehouse)
    }

    return newVirtualWarehouses
  })

  // Naming Convention
  const namingConvention = Object.fromEntries(
    Object.entries(state.namingConvention)
      .filter(([key, value]) => defaultNamingConvention[key as keyof NamingConvention] !== value)
  )
  if (Object.entries(namingConvention).length > 0) {
    doc.project.namingConvention = namingConvention
  }

  return YAML.stringify(doc)
}
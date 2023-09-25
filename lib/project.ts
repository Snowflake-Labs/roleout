import YAML, {isMap, isSeq, YAMLMap, YAMLSeq} from 'yaml'
import {Database, DatabaseOptions, defaultDatabaseOptions} from './objects/database'
import {defaultSchemaOptions, Schema, SchemaOptions} from './objects/schema'
import {
  defaultVirtualWarehouseOptions,
  parseVirtualWarehouseSize,
  VirtualWarehouse,
  VirtualWarehouseOptions,
  VirtualWarehouseType
} from './objects/virtualWarehouse'
import {FunctionalRole} from './roles/functionalRole'
import {DataAccessLevel, parseDataAccessLevel} from './access/dataAccessLevel'
import {parseVirtualWarehouseAccessLevel, VirtualWarehouseAccessLevel} from './access/virtualWarehouseAccessLevel'
import {defaultNamingConvention, NamingConvention, renderName} from './namingConvention'
import {Environment} from './environment'
import {Deployable} from './deployable'
import {parseSchemaObjectGroupAccessLevel, SchemaObjectGroupAccessLevel} from './access/schemaObjectGroupAccessLevel'
import {Table} from './objects/table'
import {find} from 'lodash'
import {SchemaObjectGroup} from './schemaObjectGroup'
import {View} from './objects/view'

export class ProjectFileError extends Error {
  constructor(s: string) {
    super(s)
  }
}

export interface ProjectOptions {
  enforceUnquotedIdentifiers: boolean
  schemaObjectGroupsEnabled: boolean
}

export const defaultProjectOptions: ProjectOptions = {
  enforceUnquotedIdentifiers: true,
  schemaObjectGroupsEnabled: false
}

export class Project extends Deployable {
  options: ProjectOptions
  environments: Environment[]

  constructor(name: string) {
    super(name, {...defaultNamingConvention})
    this.options = defaultProjectOptions
    this.environments = []
  }

  toRecord() {
    return {
      project: {
        name: this.name,
        options: this.options,
        namingConvention: this.namingConvention,
        databases: this.databases.map(db => db.toRecord()),
        schemaObjectGroups: this.schemaObjectGroups.map(sog => sog.toRecord()),
        virtualWarehouses: this.virtualWarehouses.map(vwh => vwh.toRecord()),
        functionalRoles: this.functionalRoles.map(fr => fr.toRecord())
      }
    }
  }

  mergeVirtualWarehouses(virtualWarehouses: VirtualWarehouse[]): Project {
    for (const newVirtualWarehouse of virtualWarehouses) {
      const existingVirtualWarehouse = find(this.virtualWarehouses, vwh => vwh.name === newVirtualWarehouse.name)
      if (!existingVirtualWarehouse) {
        this.virtualWarehouses.push(newVirtualWarehouse)
        continue
      }

      const existingAccess = existingVirtualWarehouse.access
      this.virtualWarehouses = this.virtualWarehouses.filter(vwh => vwh.name !== newVirtualWarehouse.name)
      newVirtualWarehouse.access = existingAccess
      this.virtualWarehouses.push(newVirtualWarehouse)
    }
    return this
  }

  mergeRoles(roles: FunctionalRole[]): Project {
    for (const newRole of roles) {
      if (!this.functionalRoles.includes(newRole)) this.functionalRoles.push(newRole)
    }
    return this
  }

  mergeDatabases(databases: Database[]): Project {
    const mergeSchemata = (existingSchemata: Schema[], newSchemata: Schema[]): Schema[] => {
      for (const newSchema of newSchemata) {
        const existingSchema = find(existingSchemata, s => s.name === newSchema.name)
        if (!existingSchema) {
          existingSchemata.push(newSchema)
          continue
        }
        existingSchema.managedAccess = newSchema.managedAccess
        existingSchema.transient = newSchema.transient
        existingSchema.dataRetentionTimeInDays = newSchema.dataRetentionTimeInDays
      }

      return existingSchemata
    }

    for (const newDatabase of databases) {
      const existingDatabase = find(this.databases, db => db.name === newDatabase.name)
      if (!existingDatabase) {
        this.databases.push(newDatabase)
        continue
      }

      existingDatabase.schemata = mergeSchemata(existingDatabase.schemata, newDatabase.schemata)
      existingDatabase.transient = newDatabase.transient
      existingDatabase.dataRetentionTimeInDays = newDatabase.dataRetentionTimeInDays
    }
    return this
  }

  static fromYAML(contents: string): Project {
    const doc = YAML.parseDocument(contents)
    const projectMap = doc.get('project') as YAMLMap
    const project = new Project(projectMap.get('name') as string)

    // Options
    if (projectMap.has('options')) {
      const optionsMap = projectMap.get('options') as YAMLMap
      const enforceUnquotedIdentifiersKey = 'enforceUnquotedIdentifiers'
      const schemaObjectGroupsEnabledKey = 'schemaObjectGroupsEnabled'
      if (optionsMap.has(enforceUnquotedIdentifiersKey)) project.options[enforceUnquotedIdentifiersKey] = optionsMap.get(enforceUnquotedIdentifiersKey) as boolean
      if (optionsMap.has(schemaObjectGroupsEnabledKey)) project.options[schemaObjectGroupsEnabledKey] = optionsMap.get(schemaObjectGroupsEnabledKey) as boolean
    }

    // Naming Convention
    if (projectMap.has('namingConvention')) {
      const namingConventionMap = projectMap.get('namingConvention') as YAMLMap
      for (const k of Object.keys(defaultNamingConvention) as (keyof NamingConvention)[]) {
        if (namingConventionMap.has(k)) project.namingConvention[k] = namingConventionMap.get(k) as string
      }
    }

    // Environments
    if (projectMap.has('environments')) {
      for (const environmentMap of (projectMap.get('environments') as YAMLSeq<YAMLMap>).items) {
        project.environments.push(new Environment(environmentMap.get('name') as string, project.namingConvention))
      }
    }

    // Functional Roles
    if (projectMap.has('functionalRoles')) {
      for (const functionalRoleMap of (projectMap.get('functionalRoles') as YAMLSeq<YAMLMap>).items) {
        project.functionalRoles.push(new FunctionalRole(functionalRoleMap.get('name') as string))
      }
    }

    // Databases
    const databaseAccesses: {
      databaseName: string,
      functionalRoleName: string,
      environmentName: string | undefined,
      level: DataAccessLevel
    }[] = []
    const schemaAccesses: {
      databaseName: string,
      schemaName: string,
      functionalRoleName: string,
      environmentName: string | undefined,
      level: DataAccessLevel
    }[] = []
    const databaseOptions: { databaseName: string, options: DatabaseOptions, environmentName: string }[] = []
    const schemaOptions: {
      databaseName: string,
      schemaName: string,
      options: SchemaOptions,
      environmentName: string
    }[] = []
    if (projectMap.has('databases')) {
      for (const databaseMap of (projectMap.get('databases') as YAMLSeq<YAMLMap>).items) {
        const databaseName = databaseMap.get('name') as string

        // Options
        const optionsCollection = databaseMap.get('options')
        let newDatabaseOptions = defaultDatabaseOptions
        if (project.environments.length > 0) {
          if (isSeq(optionsCollection)) {
            // a sequence means 1 set of options per environment
            for (const optionsMap of (optionsCollection as YAMLSeq<YAMLMap>).items) {
              databaseOptions.push({
                databaseName,
                environmentName: optionsMap.get('env') as string,
                options: Project.getDatabaseOptionsFromYAML(optionsMap)
              })
            }
          } else if (isMap(optionsCollection)) {
            // a map of options should apply to all environments
            for (const environment of project.environments) {
              databaseOptions.push({
                databaseName,
                environmentName: environment.name,
                options: Project.getDatabaseOptionsFromYAML(optionsCollection as YAMLMap)
              })
            }
          }
        } else if (optionsCollection) {
          newDatabaseOptions = Project.getDatabaseOptionsFromYAML(optionsCollection as YAMLMap)
        }
        const newDatabase = new Database(databaseName, newDatabaseOptions)

        // Schemata
        if (!databaseMap.has('schemata')) {
          project.databases.push(newDatabase)
          continue
        }
        for (const schemaMap of (databaseMap.get('schemata') as YAMLSeq<YAMLMap>).items) {
          const schemaName = schemaMap.get('name') as string

          // Options
          const optionsCollection = schemaMap.get('options')
          let newSchemaOptions = defaultSchemaOptions
          if (project.environments.length > 0) {
            if (isSeq(optionsCollection)) {
              // a sequence means 1 set of options per environment
              for (const optionsMap of (optionsCollection as YAMLSeq<YAMLMap>).items) {
                schemaOptions.push({
                  databaseName,
                  schemaName,
                  environmentName: optionsMap.get('env') as string,
                  options: Project.getSchemaOptionsFromYAML(optionsMap)
                })
              }
            } else if (isMap(optionsCollection)) {
              // a map of options should apply to all environments
              for (const environment of project.environments) {
                schemaOptions.push({
                  databaseName,
                  schemaName,
                  environmentName: environment.name,
                  options: Project.getSchemaOptionsFromYAML(optionsCollection as YAMLMap)
                })
              }
            }
          } else if (optionsCollection) {
            newSchemaOptions = Project.getSchemaOptionsFromYAML(optionsCollection as YAMLMap)
          }
          const newSchema = new Schema(schemaName, newDatabase, newSchemaOptions)

          // Database Access
          if (databaseMap.get('access')) {
            for (const accessMap of (databaseMap.get('access') as YAMLSeq<YAMLMap>).items) {
              const functionalRoleName = accessMap.get('role') as string
              const functionalRole = project.findFunctionalRole(functionalRoleName) // throws error if non-existent functional role
              const levelStr = accessMap.get('level') as string
              const level = parseDataAccessLevel(levelStr)

              if (project.environments.length > 0) {
                const environmentName = accessMap.has('env') ? accessMap.get('env') as string : undefined
                if (!environmentName) {
                  // apply to all envs
                  for (const environment of project.environments) {
                    const envFunctionalRoleName = renderName('functionalRole', project.namingConvention, {
                      env: environment.name,
                      name: functionalRoleName
                    })
                    const envDatabaseName = renderName('database', project.namingConvention, {
                      env: environment.name,
                      name: databaseName
                    })
                    databaseAccesses.push({
                      databaseName: envDatabaseName,
                      functionalRoleName: envFunctionalRoleName,
                      environmentName: environment.name,
                      level
                    })
                  }
                } else {
                  const envFunctionalRoleName = renderName('functionalRole', project.namingConvention, {
                    env: environmentName,
                    name: functionalRoleName
                  })
                  const envDatabaseName = renderName('database', project.namingConvention, {
                    env: environmentName,
                    name: databaseName
                  })
                  databaseAccesses.push({
                    databaseName: envDatabaseName,
                    functionalRoleName: envFunctionalRoleName,
                    environmentName,
                    level
                  })
                }
              } else {
                newDatabase.access.set(functionalRole, level)
              }
            }

          }

          // Schema Access
          if (schemaMap.get('access')) {
            for (const accessMap of (schemaMap.get('access') as YAMLSeq<YAMLMap>).items) {
              const functionalRoleName = accessMap.get('role') as string
              const functionalRole = project.findFunctionalRole(functionalRoleName) // throws error if non-existent functional role
              const levelStr = accessMap.get('level') as string
              const level = parseDataAccessLevel(levelStr)

              if (project.environments.length > 0) {
                const environmentName = accessMap.has('env') ? accessMap.get('env') as string : undefined
                if (!environmentName) {
                  // apply to all envs
                  for (const environment of project.environments) {
                    const envFunctionalRoleName = renderName('functionalRole', project.namingConvention, {
                      env: environment.name,
                      name: functionalRoleName
                    })
                    const envDatabaseName = renderName('database', project.namingConvention, {
                      env: environment.name,
                      name: databaseName
                    })
                    const envSchemaName = renderName('schema', project.namingConvention, {
                      database: databaseName,
                      env: environment.name,
                      name: schemaName
                    })
                    schemaAccesses.push({
                      databaseName: envDatabaseName,
                      schemaName: envSchemaName,
                      functionalRoleName: envFunctionalRoleName,
                      environmentName: environment.name,
                      level
                    })
                  }
                } else {
                  const envFunctionalRoleName = renderName('functionalRole', project.namingConvention, {
                    env: environmentName,
                    name: functionalRoleName
                  })
                  const envDatabaseName = renderName('database', project.namingConvention, {
                    env: environmentName,
                    name: databaseName
                  })
                  const envSchemaName = renderName('schema', project.namingConvention, {
                    database: databaseName,
                    env: environmentName,
                    name: schemaName
                  })
                  schemaAccesses.push({
                    databaseName: envDatabaseName,
                    schemaName: envSchemaName,
                    functionalRoleName: envFunctionalRoleName,
                    environmentName,
                    level
                  })
                }
              } else {
                newSchema.access.set(functionalRole, level)
              }
            }
          }

          newDatabase.schemata.push(newSchema)
        }
        project.databases.push(newDatabase)
      }
    }

    // Schema Object Groups
    const schemaObjectGroupAccesses: {
      schemaObjectGroupName: string,
      functionalRoleName: string,
      environmentName: string | undefined,
      level: SchemaObjectGroupAccessLevel
    }[] = []
    if (projectMap.has('schemaObjectGroups')) {
      for (const schemaObjectGroupMap of (projectMap.get('schemaObjectGroups') as YAMLSeq<YAMLMap>).items) {
        const schemaObjectGroupName = schemaObjectGroupMap.get('name') as string

        const tables = []
        for (const tableMap of (schemaObjectGroupMap.get('tables') as YAMLSeq<YAMLMap>).items) {
          tables.push(new Table(tableMap.get('name') as string, project.findSchema(tableMap.get('database') as string, tableMap.get('schema') as string)))
        }

        const views = []
        for (const viewMap of (schemaObjectGroupMap.get('views') as YAMLSeq<YAMLMap>).items) {
          views.push(new Table(viewMap.get('name') as string, project.findSchema(viewMap.get('database') as string, viewMap.get('schema') as string)))
        }

        const newSchemaObjectGroup = new SchemaObjectGroup(schemaObjectGroupName, `SOG_${SchemaObjectGroup.identifierSafeName(schemaObjectGroupName)}`, tables, views)

        // Access
        if (schemaObjectGroupMap.get('access')) {
          for (const accessMap of (schemaObjectGroupMap.get('access') as YAMLSeq<YAMLMap>).items) {
            const functionalRoleName = accessMap.get('role') as string
            const functionalRole = project.findFunctionalRole(functionalRoleName)
            const levelStr = accessMap.get('level') as string
            const level = parseSchemaObjectGroupAccessLevel(levelStr)

            if (project.environments.length > 0) {
              const environmentName = accessMap.has('env') ? accessMap.get('env') as string : undefined
              if (!environmentName) {
                // apply to all envs
                for (const environment of project.environments) {
                  const envFunctionalRoleName = renderName('functionalRole', project.namingConvention, {
                    env: environment.name,
                    name: functionalRoleName
                  })
                  schemaObjectGroupAccesses.push({
                    schemaObjectGroupName,
                    functionalRoleName: envFunctionalRoleName,
                    environmentName: environment.name,
                    level
                  })
                }
              } else {
                const envFunctionalRoleName = renderName('functionalRole', project.namingConvention, {
                  env: environmentName,
                  name: functionalRoleName
                })
                schemaObjectGroupAccesses.push({
                  schemaObjectGroupName,
                  functionalRoleName: envFunctionalRoleName,
                  environmentName,
                  level
                })
              }
            } else {
              // no environments
              newSchemaObjectGroup.access.set(functionalRole, level)
            }
          }
        }
        project.schemaObjectGroups.push(newSchemaObjectGroup)
      }
    }

    // Virtual Warehouses
    const virtualWarehouseAccesses: {
      virtualWarehouseName: string,
      functionalRoleName: string,
      environmentName: string | undefined,
      level: VirtualWarehouseAccessLevel
    }[] = []
    const virtualWarehouseOptions: {
      virtualWarehouseName: string,
      options: VirtualWarehouseOptions,
      environmentName: string
    }[] = []
    if (projectMap.has('virtualWarehouses')) {
      for (const virtualWarehouseMap of (projectMap.get('virtualWarehouses') as YAMLSeq<YAMLMap>).items) {
        const virtualWarehouseName = virtualWarehouseMap.get('name') as string

        const optionsCollection = virtualWarehouseMap.get('options')
        let newVirtualWarehouseOptions = defaultVirtualWarehouseOptions
        if (project.environments.length > 0) {
          if (isSeq(optionsCollection)) {
            // a sequence means 1 set of options per environment
            for (const optionsMap of (optionsCollection as YAMLSeq<YAMLMap>).items) {
              virtualWarehouseOptions.push({
                virtualWarehouseName,
                environmentName: optionsMap.get('env') as string,
                options: Project.getVirtualWarehouseOptionsFromYAML(optionsMap)
              })
            }
          } else if (isMap(optionsCollection)) {
            // a map of options should apply to all environments
            for (const environment of project.environments) {
              virtualWarehouseOptions.push({
                virtualWarehouseName,
                environmentName: environment.name,
                options: Project.getVirtualWarehouseOptionsFromYAML(optionsCollection as YAMLMap)
              })
            }
          }
        } else if (optionsCollection) {
          newVirtualWarehouseOptions = Project.getVirtualWarehouseOptionsFromYAML(optionsCollection as YAMLMap)
        }

        const newVirtualWarehouse = new VirtualWarehouse(virtualWarehouseName, newVirtualWarehouseOptions)

        // Access
        if (virtualWarehouseMap.get('access')) {
          for (const accessMap of (virtualWarehouseMap.get('access') as YAMLSeq<YAMLMap>).items) {
            const functionalRoleName = accessMap.get('role') as string
            const functionalRole = project.findFunctionalRole(functionalRoleName)
            const levelStr = accessMap.get('level') as string
            const level = parseVirtualWarehouseAccessLevel(levelStr)

            if (project.environments.length > 0) {
              const environmentName = accessMap.has('env') ? accessMap.get('env') as string : undefined
              if (!environmentName) {
                // apply to all envs
                for (const environment of project.environments) {
                  const envFunctionalRoleName = renderName('functionalRole', project.namingConvention, {
                    env: environment.name,
                    name: functionalRoleName
                  })
                  const envVirtualWarehouseName = renderName('virtualWarehouse', project.namingConvention, {
                    env: environment.name,
                    name: virtualWarehouseName
                  })
                  virtualWarehouseAccesses.push({
                    virtualWarehouseName: envVirtualWarehouseName,
                    functionalRoleName: envFunctionalRoleName,
                    environmentName: environment.name,
                    level
                  })
                }
              } else {
                const envFunctionalRoleName = renderName('functionalRole', project.namingConvention, {
                  env: environmentName,
                  name: functionalRoleName
                })
                const envVirtualWarehouseName = renderName('virtualWarehouse', project.namingConvention, {
                  env: environmentName,
                  name: virtualWarehouseName
                })
                virtualWarehouseAccesses.push({
                  virtualWarehouseName: envVirtualWarehouseName,
                  functionalRoleName: envFunctionalRoleName,
                  environmentName,
                  level
                })
              }
            } else {
              newVirtualWarehouse.access.set(functionalRole, level)
            }
          }
        }
        project.virtualWarehouses.push(newVirtualWarehouse)
      }
    }

    for (const environment of project.environments) {
      // copy databases, virtual warehouses, and functional roles to each environment with their names rendered
      // according to the naming convention, e.g. db 'MAIN' might become 'PROD_MAIN_DB'
      // and options set for each environment as appropriate
      for (const database of project.databases) {
        const envDatabaseOptions = databaseOptions.find(o => o.databaseName === database.name && o.environmentName === environment.name)?.options
        const envDatabase = new Database(
          renderName('database', project.namingConvention, {
            env: environment.name,
            name: database.name
          }),
          envDatabaseOptions)
        for (const schema of database.schemata) {
          const envSchemaOptions = schemaOptions.find(o => o.databaseName === database.name && o.schemaName === schema.name && o.environmentName === environment.name)?.options
          const envSchemaName = renderName('schema', project.namingConvention, {
            database: database.name,
            env: environment.name,
            name: schema.name
          })
          const envSchema = new Schema(envSchemaName, envDatabase, envSchemaOptions)
          envDatabase.schemata.push(envSchema)
        }
        environment.databases.push(envDatabase)
      }

      const updatedSchemaObjectsForEnv = (objs: (Table | View)[]) => {
        return objs.map(obj => {
          const envDatabaseName = renderName('database', project.namingConvention, {
            env: environment.name,
            name: obj.schema.database.name
          })
          const envDatabase = find(environment.databases, db => db.name === envDatabaseName)
          if (!envDatabase) throw new ProjectFileError(`Could not find schema object group database ${envDatabaseName}`)
          const envSchemaName = renderName('schema', project.namingConvention, {
            database: envDatabase.name,
            env: environment.name,
            name: obj.schema.name
          })
          const envSchema = find(envDatabase.schemata, s => s.name === envSchemaName)
          if (!envSchema) throw new ProjectFileError(`Could not find schema object group schema ${envSchemaName}`)
          return new Table(obj.name, envSchema)
        })
      }

      environment.schemaObjectGroups = project.schemaObjectGroups.map((sog) => {
        const envTables = updatedSchemaObjectsForEnv(sog.tables)
        const envViews = updatedSchemaObjectsForEnv(sog.views)
        return new SchemaObjectGroup(sog.name, `${environment.name}_SOG_${SchemaObjectGroup.identifierSafeName(sog.name)}`, envTables, envViews)
      })

      environment.virtualWarehouses = project.virtualWarehouses.map(vwh => {
        const options = virtualWarehouseOptions.find(o => o.virtualWarehouseName === vwh.name && o.environmentName === environment.name)?.options
        return new VirtualWarehouse(renderName('virtualWarehouse', project.namingConvention, {
          env: environment.name,
          name: vwh.name,
        }), options)
      })

      environment.functionalRoles = project.functionalRoles.map(fr =>
        new FunctionalRole(renderName('functionalRole', project.namingConvention, {
          env: environment.name,
          name: fr.name
        })))

      // Database Access
      for (const access of databaseAccesses.filter(a => a.environmentName === environment.name)) {
        const database = environment.databases.find(db => db.name === access.databaseName)
        if (!database) throw new ProjectFileError(`Unexpected database name '${access.databaseName}'`)
        const functionalRole = environment.functionalRoles.find(fr => fr.name === access.functionalRoleName)
        if (!functionalRole) throw new ProjectFileError(`Unexpected functional role name '${access.functionalRoleName}'`)
        database.access.set(functionalRole, access.level)
      }

      // Schema Access
      for (const access of schemaAccesses.filter(a => a.environmentName === environment.name)) {
        const database = environment.databases.find(db => db.name === access.databaseName)
        if (!database) throw new ProjectFileError(`Unexpected database name '${access.databaseName}'`)
        const schema = database.schemata.find(s => s.name === access.schemaName)
        if (!schema) throw new ProjectFileError(`Unexpected schema name '${access.schemaName}'`)
        const functionalRole = environment.functionalRoles.find(fr => fr.name === access.functionalRoleName)
        if (!functionalRole) throw new ProjectFileError(`Unexpected functional role name '${access.functionalRoleName}'`)
        schema.access.set(functionalRole, access.level)
      }

      for (const access of schemaObjectGroupAccesses.filter(a => a.environmentName === environment.name || a.environmentName === undefined)) {
        const schemaObjectGroup = environment.schemaObjectGroups.find(sog => sog.name === access.schemaObjectGroupName)
        if (!schemaObjectGroup) throw new ProjectFileError(`Unexpected schema object group '${access.schemaObjectGroupName}'`)
        const functionalRole = environment.functionalRoles.find(fr => fr.name === access.functionalRoleName)
        if (!functionalRole) throw new ProjectFileError(`Unexpected functional role name '${access.functionalRoleName}'`)
        schemaObjectGroup.access.set(functionalRole, access.level)
      }

      for (const access of virtualWarehouseAccesses.filter(a => a.environmentName === environment.name || a.environmentName === undefined)) {
        const virtualWarehouse = environment.virtualWarehouses.find(vwh => vwh.name === access.virtualWarehouseName)
        if (!virtualWarehouse) throw new ProjectFileError(`Unexpected virtual warehouse name '${access.virtualWarehouseName}'`)
        const functionalRole = environment.functionalRoles.find(fr => fr.name === access.functionalRoleName)
        if (!functionalRole) throw new ProjectFileError(`Unexpected functional role name '${access.functionalRoleName}'`)
        virtualWarehouse.access.set(functionalRole, access.level)
      }
    }

    return project
  }

  static getVirtualWarehouseOptionsFromYAML(optionsMap: YAMLMap): VirtualWarehouseOptions {
    const size = optionsMap.get('size') ? parseVirtualWarehouseSize(optionsMap.get('size') as string) : defaultVirtualWarehouseOptions.size
    return {
      size: size,
      maxClusterCount: optionsMap.get('maxClusterCount') as number | undefined ?? defaultVirtualWarehouseOptions.maxClusterCount,
      minClusterCount: optionsMap.get('minClusterCount') as number | undefined ?? defaultVirtualWarehouseOptions.minClusterCount,
      scalingPolicy: optionsMap.get('scalingPolicy') as 'STANDARD' | 'ECONOMY' | undefined ?? defaultVirtualWarehouseOptions.scalingPolicy,
      autoSuspend: optionsMap.get('autoSuspend') as number | undefined ?? defaultVirtualWarehouseOptions.autoSuspend,
      autoResume: optionsMap.get('autoResume') as boolean | undefined ?? defaultVirtualWarehouseOptions.autoResume,
      enableQueryAcceleration: optionsMap.get('enableQueryAcceleration') as boolean | undefined ?? defaultVirtualWarehouseOptions.enableQueryAcceleration,
      queryAccelerationMaxScaleFactor: optionsMap.get('queryAccelerationMaxScaleFactor') as number | undefined ?? defaultVirtualWarehouseOptions.queryAccelerationMaxScaleFactor,
      type: optionsMap.get('type') as VirtualWarehouseType | undefined ?? defaultVirtualWarehouseOptions.type,
      statementTimeoutInSeconds: optionsMap.get('statementTimeoutInSeconds') as number | undefined ?? defaultVirtualWarehouseOptions.statementTimeoutInSeconds,
      resourceMonitor: optionsMap.get('resourceMonitor') as string | undefined ?? defaultVirtualWarehouseOptions.resourceMonitor,
      initiallySuspended: optionsMap.get('initiallySuspended') as boolean | undefined ?? defaultVirtualWarehouseOptions.initiallySuspended
    }
  }

  static getDatabaseOptionsFromYAML(optionsMap: YAMLMap):
    DatabaseOptions {
    return {
      transient: optionsMap.get('transient') as boolean | undefined ?? defaultDatabaseOptions.transient,
      dataRetentionTimeInDays: optionsMap.get('dataRetentionTimeInDays') as number | undefined ?? defaultDatabaseOptions.dataRetentionTimeInDays
    }
  }

  static getSchemaOptionsFromYAML(optionsMap: YAMLMap):
    SchemaOptions {
    return {
      managedAccess: optionsMap.get('managedAccess') as boolean | undefined ?? defaultSchemaOptions.managedAccess,
      transient: optionsMap.get('transient') as boolean | undefined ?? defaultSchemaOptions.transient,
      dataRetentionTimeInDays: optionsMap.get('dataRetentionTimeInDays') as number | undefined ?? defaultSchemaOptions.dataRetentionTimeInDays
    }
  }
}
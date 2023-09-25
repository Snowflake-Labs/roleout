import YAML, {isMap, isSeq, YAMLMap, YAMLSeq} from 'yaml'
import {combineReducers, configureStore, PreloadedState} from '@reduxjs/toolkit'
import optionsReducer from '../features/options/optionsSlice'
import projectReducer, {
  setEnforceUnquotedIdentifiers,
  setEnvironmentsEnabled,
  setName, setSchemaObjectGroupsEnabled
} from '../features/project/projectSlice'
import databasesReducer, {
  addDatabase,
  addSchema,
  setDatabaseAccess,
  setSchemaAccess
} from '../features/databases/databasesSlice'
import schemaObjectGroupsReducer, {
  addSchemaObjectGroup, addTableToSchemaObjectGroup, addViewToSchemaObjectGroup,
  setSchemaObjectGroupAccess
} from '../features/schemaObjectGroups/schemaObjectGroupsSlice'
import virtualWarehousesReducer, {
  addVirtualWarehouse,
  setVirtualWarehouseAccess
} from '../features/virtualWarehouses/virtualWarehousesSlice'
import functionalRolesReducer, {addFunctionalRole} from '../features/functionalRoles/functionalRolesSlice'
import environmentReducer, {addEnvironment} from '../features/environments/environmentsSlice'
import namingConventionReducer, {setTemplate} from '../features/namingConvention/namingConventionSlice'
import {parseDataAccessLevel} from 'roleout-lib/access/dataAccessLevel'
import {parseVirtualWarehouseAccessLevel} from 'roleout-lib/access/virtualWarehouseAccessLevel'
import {Environment} from '../features/environments/environment'
import {defaultNamingConvention, NamingConvention} from 'roleout-lib/namingConvention'
import {Project} from 'roleout-lib/build/project'
import {defaultVirtualWarehouseOptions} from 'roleout-lib/build/objects/virtualWarehouse'
import {reduce} from 'lodash'
import {defaultDatabaseOptions} from 'roleout-lib/build/objects/database'
import {defaultSchemaOptions} from 'roleout-lib/build/objects/schema'
import {parseSchemaObjectGroupAccessLevel} from 'roleout-lib/build/access/schemaObjectGroupAccessLevel'

export class StoreError extends Error {
  constructor(s: string) {
    super(s)
  }
}

export class MissingFieldError extends StoreError {
  constructor(block: string, field: string) {
    super(`${block} YAML resource is missing the ${field} field`)
  }
}

const rootReducer = combineReducers({
  options: optionsReducer,
  project: projectReducer,
  environments: environmentReducer,
  databases: databasesReducer,
  schemaObjectGroups: schemaObjectGroupsReducer,
  virtualWarehouses: virtualWarehousesReducer,
  functionalRoles: functionalRolesReducer,
  namingConvention: namingConventionReducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export const store = setupStore()

export const loadRoleoutYAML = (contents: string, dispatch: AppDispatch) => {
  const doc = YAML.parseDocument(contents)
  const projectMap = doc.get('project') as YAMLMap

  const environments: Environment[] = []

  dispatch(setName(projectMap.get('name') as string))

  // Options
  if (projectMap.has('options')) {
    const optionsMap = projectMap.get('options') as YAMLMap
    const enforceUnquotedIdentifiersKey = 'enforceUnquotedIdentifiers'
    const schemaObjectGroupsEnabledKey = 'schemaObjectGroupsEnabled'
    if (optionsMap.has(enforceUnquotedIdentifiersKey)) dispatch(setEnforceUnquotedIdentifiers(optionsMap.get(enforceUnquotedIdentifiersKey) as boolean))
    if (optionsMap.has(schemaObjectGroupsEnabledKey)) dispatch(setSchemaObjectGroupsEnabled(optionsMap.get(schemaObjectGroupsEnabledKey) as boolean))
  }

  // Naming Convention
  if (projectMap.has('namingConvention')) {
    const namingConventionMap = projectMap.get('namingConvention') as YAMLMap
    for (const k of Object.keys(defaultNamingConvention) as (keyof NamingConvention)[]) {
      if (namingConventionMap.has(k)) dispatch(setTemplate({template: k, value: namingConventionMap.get(k) as string}))
    }
  }

  // Environments
  if (projectMap.has('environments')) {
    for (const environmentMap of (projectMap.get('environments') as YAMLSeq<YAMLMap>).items) {
      environments.push({name: environmentMap.get('name') as string})
      dispatch(addEnvironment({name: environmentMap.get('name') as string, environments: []}))
    }
  }
  dispatch(setEnvironmentsEnabled(environments.length > 0))

  // Databases
  if (projectMap.has('databases')) {
    for (const databaseMap of (projectMap.get('databases') as YAMLSeq<YAMLMap>).items) {
      const databaseName = databaseMap.get('name') as string
      dispatch(addDatabase({
        name: databaseName,
        environments, ...objectOptions(databaseMap, environments, Project.getDatabaseOptionsFromYAML, defaultDatabaseOptions)
      }))

      // Database access
      if (databaseMap.get('access')) {
        for (const accessMap of (databaseMap.get('access') as YAMLSeq<YAMLMap>).items) {
          const functionalRoleName = accessMap.get('role') as string
          const levelStr = accessMap.get('level') as string
          const level = parseDataAccessLevel(levelStr)
          const environmentName = accessMap.has('env') ? accessMap.get('env') as string : undefined

          // undefined environment name in YAML means apply to all environments
          if (!environmentName && environments.length > 0) {
            for (const environment of environments) {
              dispatch(setDatabaseAccess({
                database: databaseName,
                role: functionalRoleName,
                environment: environment.name,
                level
              }))
            }
          } else {
            dispatch(setDatabaseAccess({
              database: databaseName,
              role: functionalRoleName,
              environment: environmentName,
              level
            }))
          }
        }
      }

      // Schemata
      for (const schemaMap of (databaseMap.get('schemata') as YAMLSeq<YAMLMap>).items) {
        const schemaName = schemaMap.get('name') as string
        dispatch(addSchema({
          database: databaseName,
          schema: schemaName,
          environments, ...objectOptions(schemaMap, environments, Project.getSchemaOptionsFromYAML, defaultSchemaOptions)
        }))

        // Access
        if (schemaMap.get('access')) {
          for (const accessMap of (schemaMap.get('access') as YAMLSeq<YAMLMap>).items) {
            const functionalRoleName = accessMap.get('role') as string
            const levelStr = accessMap.get('level') as string
            const level = parseDataAccessLevel(levelStr)
            const environmentName = accessMap.has('env') ? accessMap.get('env') as string : undefined

            // undefined environment name in YAML means apply to all environments
            if (!environmentName && environments.length > 0) {
              for (const environment of environments) {
                dispatch(setSchemaAccess({
                  database: databaseName,
                  schema: schemaName,
                  role: functionalRoleName,
                  environment: environment.name,
                  level
                }))
              }
            } else {
              dispatch(setSchemaAccess({
                database: databaseName,
                schema: schemaName,
                role: functionalRoleName,
                environment: environmentName,
                level
              }))
            }
          }
        }
      }
    }
  }

  // Schema Object Groups
  if (projectMap.has('schemaObjectGroups')) {
    const schemaObjectGroupMaps = (projectMap.get('schemaObjectGroups') as YAMLSeq<YAMLMap>).items

    for (const schemaObjectGroupMap of schemaObjectGroupMaps) {
      const schemaObjectGroupName = schemaObjectGroupMap.get('name') as string
      dispatch(addSchemaObjectGroup({name: schemaObjectGroupName, environments}))

      if (schemaObjectGroupMap.has('tables')) {
        for (const table of (schemaObjectGroupMap.get('tables') as YAMLSeq<YAMLMap>).items) {
          ['database', 'schema', 'name'].forEach(key => {
            if (!table.has(key)) throw new MissingFieldError('table', key)
          })
          const databaseName = table.get('database') as string
          const schemaName = table.get('schema') as string
          const name = table.get('name') as string
          dispatch(addTableToSchemaObjectGroup({schemaObjectGroupName, databaseName, schemaName, name}))
        }
      }

      if (schemaObjectGroupMap.has('views')) {
        for (const table of (schemaObjectGroupMap.get('views') as YAMLSeq<YAMLMap>).items) {
          ['database', 'schema', 'name'].forEach(key => {
            if (!table.has(key)) throw new MissingFieldError('view', key)
          })
          const databaseName = table.get('database') as string
          const schemaName = table.get('schema') as string
          const name = table.get('name') as string
          dispatch(addViewToSchemaObjectGroup({schemaObjectGroupName, databaseName, schemaName, name}))
        }
      }

      // Access
      if (schemaObjectGroupMap.get('access')) {
        for (const accessMap of (schemaObjectGroupMap.get('access') as YAMLSeq<YAMLMap>).items) {
          const functionalRoleName = accessMap.get('role') as string
          const levelStr = accessMap.get('level') as string
          const level = parseSchemaObjectGroupAccessLevel(levelStr)
          const environmentName = accessMap.has('env') ? accessMap.get('env') as string : undefined

          dispatch(setSchemaObjectGroupAccess({
            name: schemaObjectGroupName,
            role: functionalRoleName,
            environment: environmentName,
            level
          }))
        }
      }
    }
  }

  // Virtual Warehouses
  if (projectMap.has('virtualWarehouses')) {
    const virtualWarehouseMaps = (projectMap.get('virtualWarehouses') as YAMLSeq<YAMLMap>).items

    for (const virtualWarehouseMap of virtualWarehouseMaps) {
      const virtualWarehouseName = virtualWarehouseMap.get('name') as string
      const opts = objectOptions(virtualWarehouseMap, environments, Project.getVirtualWarehouseOptionsFromYAML, defaultVirtualWarehouseOptions)
      dispatch(addVirtualWarehouse({name: virtualWarehouseName, environments, ...opts}))

      // Access
      if (virtualWarehouseMap.get('access')) {
        for (const accessMap of (virtualWarehouseMap.get('access') as YAMLSeq<YAMLMap>).items) {
          const functionalRoleName = accessMap.get('role') as string
          const levelStr = accessMap.get('level') as string
          const level = parseVirtualWarehouseAccessLevel(levelStr)
          const environmentName = accessMap.has('env') ? accessMap.get('env') as string : undefined

          dispatch(setVirtualWarehouseAccess({
            name: virtualWarehouseName,
            role: functionalRoleName,
            environment: environmentName,
            level
          }))
        }
      }
    }
  }

  // Functional Roles
  if (projectMap.has('functionalRoles')) {
    for (const functionalRoleMap of (projectMap.get('functionalRoles') as YAMLSeq<YAMLMap>).items) {
      dispatch(addFunctionalRole({name: functionalRoleMap.get('name') as string, environments}))
    }
  }
}

const objectOptions = <Opts>(objMap: YAMLMap, environments: Environment[], optionsFromYAMLFn: (yaml: YAMLMap) => Opts, defaults: Opts) => {
  if (environments.length > 0) {
    if (isSeq(objMap.get('options'))) {
      const environmentOptions = reduce((objMap.get('options') as YAMLSeq<YAMLMap>).items, (prev, curr) => {
        prev[curr.get('env') as string] = optionsFromYAMLFn(curr)
        return prev
      }, {} as { [env: string]: Opts })
      return {
        optionsSet: {options: defaults, environmentOptions},
        environments
      }
    } else if (isMap(objMap.get('options'))) {
      const environmentOptions = reduce(environments, (prev, curr) => {
        prev[curr.name] = optionsFromYAMLFn(objMap.get('options') as YAMLMap)
        return prev
      }, {} as { [env: string]: Opts })
      return {
        optionsSet: {options: defaults, environmentOptions},
        environments
      }
    } else {
      // no options specified so set the default for all environments
      const environmentOptions = reduce(environments, (prev, curr) => {
        prev[curr.name] = defaults
        return prev
      }, {} as { [env: string]: Opts })
      return {
        optionsSet: {options: defaults, environmentOptions},
        environments
      }
    }
  } else {
    const optionsSet = objMap.has('options') ?
      {
        options: optionsFromYAMLFn(objMap.get('options') as YAMLMap)
      } :
      {
        options: defaults
      }
    return {optionsSet: {...optionsSet, environmentOptions: {}}}
  }
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
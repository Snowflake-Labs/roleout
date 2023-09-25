import type {Draft, PayloadAction} from '@reduxjs/toolkit'
import {createSelector, createSlice} from '@reduxjs/toolkit'
import {Database} from './database'
import {DataAccessLevel} from 'roleout-lib/access/dataAccessLevel'
import {find, remove, some} from 'lodash'
import {insertSortedBy} from '../../util'
import {addEnvironment, removeEnvironment, updateEnvironment} from '../environments/environmentsSlice'
import {removeFunctionalRole, updateFunctionalRole} from '../functionalRoles/functionalRolesSlice'
import {DatabaseOptions, defaultDatabaseOptions} from 'roleout-lib/build/objects/database'
import {defaultSchemaOptions, SchemaOptions} from 'roleout-lib/build/objects/schema'
import {defaultEnvironmentsOptions, EnvironmentOptions, OptionsSet} from '../options/options'
import {Environment} from '../environments/environment'
import {crudAdd, crudRemove, crudRename, crudSetEnvironmentOptions, crudSetOptions} from '../../app/slices'
import {Schema} from '../schema/schema'
import {castDraft} from 'immer'
import {RootState} from '../../app/store'

export class DatabaseSliceError extends Error {
  constructor(s: string) {
    super(s)
  }
}

export class NoSuchDatabaseError extends DatabaseSliceError {
  constructor(name: string) {
    super(`No such database '${name}'`)
  }
}

export class NoSuchSchemaError extends DatabaseSliceError {
  constructor(name: string) {
    super(`No such schema '${name}'`)
  }
}

export type DatabaseState = Database[]

const initialState: DatabaseState = []

type AddSchemaAction = PayloadAction<{ database: string, schema: string, environments: Environment[], optionsSet?: OptionsSet<SchemaOptions> }>
type RemoveSchemaAction = PayloadAction<{ database: string, schema: string }>
type RenameSchemaAction = PayloadAction<{ database: string, schema: string, newName: string }>
type DatabaseAccessAction = PayloadAction<{ database: string, role: string, level: DataAccessLevel | null, environment?: string }>
type SetSchemaOptionsAction = PayloadAction<{ database: string, schema: string, options: SchemaOptions }>
type SetSchemaEnvironmentOptionsAction = PayloadAction<{ database: string, schema: string, environmentOptions: EnvironmentOptions<SchemaOptions> }>
type SchemaAccessAction = PayloadAction<{ database: string, schema: string, role: string, level: DataAccessLevel | null, environment?: string }>

export const databaseFactory = (name: string, _state: Draft<DatabaseState>, environments: Environment[], optionsSet?: OptionsSet<DatabaseOptions>): Draft<Database> => {
  if (optionsSet) return {name, access: {}, schemata: [], ...optionsSet}
  return {
    name,
    access: {},
    schemata: [],
    options: defaultDatabaseOptions,
    environmentOptions: environments ? defaultEnvironmentsOptions(environments, defaultDatabaseOptions) : {}
  }
}

export const schemaFactory = (name: string, environments: Environment[], optionsSet?: OptionsSet<SchemaOptions>): Draft<Schema> => {
  if (optionsSet) return {name, access: {}, ...optionsSet}
  return {
    name,
    access: {},
    options: defaultSchemaOptions,
    environmentOptions: environments ? defaultEnvironmentsOptions(environments, defaultSchemaOptions) : {}
  }
}

export const databasesSlice = createSlice({
  name: 'databases',
  initialState,
  reducers: {
    addDatabase: crudAdd(databaseFactory),
    removeDatabase: crudRemove(),
    renameDatabase: crudRename(),
    setDatabaseOptions: crudSetOptions<Database, DatabaseOptions>(),
    setDatabaseEnvironmentOptions: crudSetEnvironmentOptions<Database, DatabaseOptions>(),
    addSchema: (state, action: AddSchemaAction) => {
      const database = find(state, db => db.name === action.payload.database)
      if (!database) throw new NoSuchDatabaseError(action.payload.database)

      if (some(database.schemata, s => s.name === action.payload.schema)) return

      const newSchema = schemaFactory(action.payload.schema, action.payload.environments, action.payload.optionsSet)
      insertSortedBy(database.schemata, newSchema, s => s.name)
    },
    removeSchema: (state, action: RemoveSchemaAction) => {
      const database = find(state, db => db.name === action.payload.database)
      if (database) remove(database.schemata, s => s.name === action.payload.schema)
    },
    renameSchema: (state, action: RenameSchemaAction) => {
      const database = find(state, db => db.name === action.payload.database)
      if (database) {
        const schema = find(database.schemata, s => s.name === action.payload.schema)
        if (schema) schema.name = action.payload.newName
        database.schemata.sort((a, b) => a.name >= b.name ? 1 : a.name === b.name ? 0 : -1)
      }
    },
    setSchemaOptions: (state, action: SetSchemaOptionsAction) => {
      const database = find(state, db => db.name === action.payload.database)
      if (database) {
        const schema = find(database.schemata, s => s.name === action.payload.schema)
        if (schema) schema.options = castDraft(action.payload.options)
      }
    },
    setSchemaEnvironmentOptions: (state, action: SetSchemaEnvironmentOptionsAction) => {
      const database = find(state, db => db.name === action.payload.database)
      if (database) {
        const schema = find(database.schemata, s => s.name === action.payload.schema)
        if (schema) schema.environmentOptions = castDraft(action.payload.environmentOptions)
      }
    },
    setDatabaseAccess: (state, action: DatabaseAccessAction) => {
      const payload = action.payload

      const database = find(state, db => db.name === payload.database)
      if (!database) throw new NoSuchDatabaseError(payload.database)

      if (!database.access[payload.role]) database.access[payload.role] = []

      if (payload.level === null) {
        remove(database.access[payload.role], a => a.environment === payload.environment)
      } else {
        const access = database.access[payload.role]?.find(a => a.environment === action.payload.environment)
        if (access) {
          access.level = payload.level
        } else {
          database.access[payload.role].push({level: payload.level, environment: payload.environment})
        }
      }
    },
    setSchemaAccess: (state, action: SchemaAccessAction) => {
      const payload = action.payload

      const database = find(state, db => db.name === payload.database)
      if (!database) throw new NoSuchDatabaseError(payload.database)

      const schema = find(database.schemata, s => s.name === payload.schema)
      if (!schema) throw new NoSuchSchemaError(payload.schema)

      if (!schema.access[payload.role]) schema.access[payload.role] = []

      if (payload.level === null) {
        remove(schema.access[payload.role], a => a.environment === payload.environment)
      } else {
        const access = schema.access[payload.role]?.find(a => a.environment === action.payload.environment)
        if (access) {
          access.level = payload.level
        } else {
          schema.access[payload.role].push({level: payload.level, environment: payload.environment})
        }
      }
    },
  },
  extraReducers: (builder) => {
    // when an environment is added we must set default environment options
    builder.addCase(addEnvironment, (state: Draft<DatabaseState>, action) => {
      const environmentName = action.payload.name
      for (const database of state) {
        database.environmentOptions[environmentName] = defaultDatabaseOptions
        for (const schema of database.schemata) {
          schema.environmentOptions[environmentName] = defaultSchemaOptions
        }
      }
    })
      // when an environment is renamed we must rename it in all the database and schema access objects
      // and transfer environment options
      .addCase(updateEnvironment, (state: Draft<DatabaseState>, action) => {
        const environmentName = action.payload.name
        for (const database of state) {
          database.environmentOptions[action.payload.newName] = database.environmentOptions[environmentName]
          delete database.environmentOptions[environmentName]
          for (const [, access] of Object.entries(database.access)) {
            for (const entry of access) {
              if (entry.environment === environmentName) entry.environment = action.payload.newName
            }
          }

          for (const schema of database.schemata) {
            schema.environmentOptions[action.payload.newName] = schema.environmentOptions[environmentName]
            delete schema.environmentOptions[environmentName]
            for (const [, access] of Object.entries(schema.access)) {
              for (const entry of access) {
                if (entry.environment === environmentName) entry.environment = action.payload.newName
              }
            }
          }
        }
      })
      // when an environment is removed we must remove the corresponding the database and schema access objects
      // and remove environment options
      .addCase(removeEnvironment, (state: Draft<DatabaseState>, action) => {
        for (const database of state) {
          delete database.environmentOptions[action.payload]
          for (const [, access] of Object.entries(database.access)) {
            remove(access, a => a.environment === action.payload)
          }

          for (const schema of database.schemata) {
            delete schema.environmentOptions[action.payload]
            for (const [, access] of Object.entries(schema.access)) {
              remove(access, a => a.environment === action.payload)
            }
          }
        }
      })
      // when a functional role is renamed we must rename it in all the database and schema access objects
      .addCase(updateFunctionalRole, (state: Draft<DatabaseState>, action) => {
        for (const database of state) {
          if (action.payload.name in database.access) {
            database.access[action.payload.newName] = database.access[action.payload.name]
            delete database.access[action.payload.name]
          }

          for (const schema of database.schemata) {
            if (action.payload.name in schema.access) {
              schema.access[action.payload.newName] = schema.access[action.payload.name]
              delete schema.access[action.payload.name]
            }
          }
        }
      })
      // when a functional role is deleted we must remove the corresponding database and schema access
      .addCase(removeFunctionalRole, (state: Draft<DatabaseState>, action) => {
        for (const database of state) {
          if (action.payload in database.access) delete database.access[action.payload]
          for (const schema of database.schemata) {
            if (action.payload in schema.access) delete schema.access[action.payload]
          }
        }
      })
  }
})

export const {
  addDatabase,
  removeDatabase,
  renameDatabase,
  setDatabaseOptions,
  setDatabaseEnvironmentOptions,
  addSchema,
  removeSchema,
  renameSchema,
  setSchemaOptions,
  setSchemaEnvironmentOptions,
  setDatabaseAccess,
  setSchemaAccess
} = databasesSlice.actions

export const selectDatabases = (state: RootState) => state.databases
export const selectDatabaseSchemaExists = createSelector([selectDatabases, (state, search: { database: string, schema: string }) => search],
  (items, search) => (find(items, item => item.name === search.database)?.schemata || [] as Schema[]).some(s => s.name === search.schema))
export default databasesSlice.reducer
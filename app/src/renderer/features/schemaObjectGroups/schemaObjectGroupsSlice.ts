import {SchemaObjectGroup} from './schemaObjectGroup'
import { createSlice, Draft, PayloadAction} from '@reduxjs/toolkit'
import {crudAdd, crudRemove, crudRename, crudSetAccess} from '../../app/slices'
import {find, includes, remove} from 'lodash'
import {RootState} from '../../app/store'
import {SchemaObjectGroupAccessLevel} from 'roleout-lib/build/access/schemaObjectGroupAccessLevel'
import {removeEnvironment, updateEnvironment} from '../environments/environmentsSlice'
import {removeFunctionalRole, updateFunctionalRole} from '../functionalRoles/functionalRolesSlice'

export type SchemaObjectGroupObjectPayload = { schemaObjectGroupName: string, databaseName: string, schemaName: string, name: string }
export type SchemaObjectGroupObjectPayloadAction = PayloadAction<SchemaObjectGroupObjectPayload>

type SchemaObjectGroupState = SchemaObjectGroup[]

export class SchemaObjectGroupSliceError extends Error {
  constructor(s: string) {
    super(s)
  }
}

export class NoSuchSchemaObjectGroupError extends SchemaObjectGroupSliceError {
  constructor(name: string) {
    super(`No schema object group exists with name '${name}'`)
  }
}

const factory = (name: string, state: Draft<SchemaObjectGroupState>): Draft<SchemaObjectGroup> => {
  return {
    name,
    objects: {},
    access: {}
  }
}

const findSchemaObjectGroup = (state: SchemaObjectGroupState, name: string) => {
  const schemaObjectGroup = find(state, sog => sog.name === name)
  if (!schemaObjectGroup) throw new NoSuchSchemaObjectGroupError(name)
  return schemaObjectGroup
}

const pushThrough = (schemaObjectGroup: SchemaObjectGroup, databaseName: string, schemaName: string, objectName: string, objectType: 'tables' | 'views') => {
  schemaObjectGroup.objects[databaseName] ||= {}
  schemaObjectGroup.objects[databaseName][schemaName] ||= {tables: [], views: []}
  if (!schemaObjectGroup.objects[databaseName][schemaName][objectType].includes(objectName)) {
    schemaObjectGroup.objects[databaseName][schemaName][objectType].push(objectName)
  }
}

const removeThrough = (schemaObjectGroup: SchemaObjectGroup, databaseName: string, schemaName: string, objectName: string, objectType: 'tables' | 'views') => {
  if (schemaObjectGroup.objects[databaseName] && schemaObjectGroup.objects[databaseName][schemaName]) {
    remove(schemaObjectGroup.objects[databaseName][schemaName][objectType], name => name === objectName)
    if (schemaObjectGroup.objects[databaseName][schemaName].tables.length === 0 && schemaObjectGroup.objects[databaseName][schemaName].views.length === 0) {
      delete schemaObjectGroup.objects[databaseName][schemaName]
      if (Object.keys(schemaObjectGroup.objects[databaseName]).length === 0) delete schemaObjectGroup.objects[databaseName]
    }
  }
}

export const schemaObjectGroupsSlice = createSlice({
  name: 'schemaObjectGroups',
  initialState: [] as SchemaObjectGroup[],
  reducers: {
    addSchemaObjectGroup: crudAdd(factory),
    removeSchemaObjectGroup: crudRemove(),
    updateSchemaObjectGroup: crudRename(),
    addTableToSchemaObjectGroup: (state, action: SchemaObjectGroupObjectPayloadAction) => {
      const payload = action.payload
      const schemaObjectGroup = findSchemaObjectGroup(state, payload.schemaObjectGroupName)
      pushThrough(schemaObjectGroup, payload.databaseName, payload.schemaName, payload.name, 'tables')
    },
    removeTableFromSchemaObjectGroup: (state, action: SchemaObjectGroupObjectPayloadAction) => {
      const payload = action.payload
      const schemaObjectGroup = findSchemaObjectGroup(state, payload.schemaObjectGroupName)
      removeThrough(schemaObjectGroup, payload.databaseName, payload.schemaName, payload.name, 'tables')
    },
    addViewToSchemaObjectGroup: (state, action: SchemaObjectGroupObjectPayloadAction) => {
      const payload = action.payload
      const schemaObjectGroup = findSchemaObjectGroup(state, payload.schemaObjectGroupName)
      pushThrough(schemaObjectGroup, payload.databaseName, payload.schemaName, payload.name, 'views')
    },
    removeViewFromSchemaObjectGroup: (state, action: SchemaObjectGroupObjectPayloadAction) => {
      const payload = action.payload
      const schemaObjectGroup = findSchemaObjectGroup(state, payload.schemaObjectGroupName)
      removeThrough(schemaObjectGroup, payload.databaseName, payload.schemaName, payload.name, 'views')
    },
    setSchemaObjectGroupAccess: crudSetAccess<SchemaObjectGroup, SchemaObjectGroupAccessLevel>()
  },

  extraReducers: (builder) => {
    builder
    // when an environment is renamed we must rename it in all the virtual warehouse access objects
      .addCase(updateEnvironment, (state: Draft<SchemaObjectGroupState>, action) => {
        for (const schemaObjectGroup of state) {
          // Access
          for (const [, access] of Object.entries(schemaObjectGroup.access)) {
            for (const entry of access) {
              if (entry.environment === action.payload.name) entry.environment = action.payload.newName
            }
          }
        }
      })
    // when an environment is removed we must remove the corresponding the virtual warehouse access objects
      .addCase(removeEnvironment, (state: Draft<SchemaObjectGroupState>, action) => {
        for (const schemaObjectGroup of state) {
          // Access
          for (const [, access] of Object.entries(schemaObjectGroup.access)) {
            remove(access, a => a.environment === action.payload)
          }
        }
      })
    // when a functional role is renamed we must rename it in all the virtual warehouse access objects
      .addCase(updateFunctionalRole, (state: Draft<SchemaObjectGroupState>, action) => {
        for (const schemaObjectGroup of state) {
          if (action.payload.name in schemaObjectGroup.access) {
            schemaObjectGroup.access[action.payload.newName] = schemaObjectGroup.access[action.payload.name]
            delete schemaObjectGroup.access[action.payload.name]
          }
        }
      })
    // when a functional role is deleted we must remove the corresponding access
      .addCase(removeFunctionalRole, (state: Draft<SchemaObjectGroupState>, action) => {
        for (const schemaObjectGroup of state) {
          if (action.payload in schemaObjectGroup.access) delete schemaObjectGroup.access[action.payload]
        }
      })
  }
}
)
export const {
  addSchemaObjectGroup,
  removeSchemaObjectGroup,
  updateSchemaObjectGroup,
  addTableToSchemaObjectGroup,
  removeTableFromSchemaObjectGroup,
  addViewToSchemaObjectGroup,
  removeViewFromSchemaObjectGroup,
  setSchemaObjectGroupAccess
} = schemaObjectGroupsSlice.actions

export const selectSchemaObjectGroups = (state: RootState) => state.schemaObjectGroups
export const selectSchemaObjectGroup = (state: RootState, name: string) => state.schemaObjectGroups.find(sog => sog.name === name)
export const schemaObjectGroupDataObjectExists = (schemaObjectGroup: SchemaObjectGroup, search: { database: string, schema: string, objectName: string }) => {
  const database = schemaObjectGroup.objects[search.database]
  if (!database) return false
  const schema = database[search.schema]
  if (!schema) return false
  return includes(schema.tables, search.objectName) || includes(schema.views, search.objectName)
}


export default schemaObjectGroupsSlice.reducer

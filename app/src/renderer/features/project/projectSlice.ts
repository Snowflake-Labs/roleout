import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {defaultProjectOptions} from 'roleout-lib/build/project'

export interface ProjectState {
  name: string,
  isLoaded: boolean,
  environmentsEnabled: boolean
  schemaObjectGroupsEnabled: boolean
  enforceUnquotedIdentifiers: boolean
}

const initialState: ProjectState = {
  name: '',
  isLoaded: false,
  environmentsEnabled: false,
  schemaObjectGroupsEnabled: false,
  enforceUnquotedIdentifiers: defaultProjectOptions.enforceUnquotedIdentifiers
}

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    setIsLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload
    },
    setEnvironmentsEnabled: (state, action: PayloadAction<boolean>) => {
      state.environmentsEnabled = action.payload
    },
    setSchemaObjectGroupsEnabled: (state, action: PayloadAction<boolean>) => {
      state.schemaObjectGroupsEnabled = action.payload
    },
    setEnforceUnquotedIdentifiers: (state, action: PayloadAction<boolean>) => {
      state.enforceUnquotedIdentifiers = action.payload
    },
  }
})

export const {
  setName,
  setIsLoaded,
  setEnvironmentsEnabled,
  setSchemaObjectGroupsEnabled,
  setEnforceUnquotedIdentifiers
} = projectSlice.actions

export default projectSlice.reducer
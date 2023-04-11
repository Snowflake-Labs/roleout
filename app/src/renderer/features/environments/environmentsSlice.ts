import {createSlice} from '@reduxjs/toolkit'
import {Environment} from './environment'
import {crudAdd, crudRemove, crudRename} from '../../app/slices'

const factory = (name: string): Environment => {
  return {name}
}

export const environmentsSlice = createSlice({
  name: 'environments',
  initialState: [] as Environment[],
  reducers: {
    addEnvironment: crudAdd(factory),
    removeEnvironment: crudRemove(),
    updateEnvironment: crudRename(),
  }
})

export const {
  addEnvironment,
  removeEnvironment,
  updateEnvironment,
} = environmentsSlice.actions

export default environmentsSlice.reducer

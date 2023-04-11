import {FunctionalRole} from './functionalRole'
import {createSlice} from '@reduxjs/toolkit'
import {crudAdd, crudRemove, crudRename} from '../../app/slices'

const factory = (name: string) => {
  return {name}
}

export const functionalRolesSlice = createSlice({
  name: 'functionalRoles',
  initialState: [] as FunctionalRole[],
  reducers: {
    addFunctionalRole: crudAdd(factory),
    removeFunctionalRole: crudRemove(),
    updateFunctionalRole: crudRename(),
  },
}
)

export const {
  addFunctionalRole,
  removeFunctionalRole,
  updateFunctionalRole
} = functionalRolesSlice.actions

export default functionalRolesSlice.reducer
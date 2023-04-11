import type {Draft, PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {VirtualWarehouse} from './virtualWarehouse'
import {VirtualWarehouseAccessLevel} from 'roleout-lib/access/virtualWarehouseAccessLevel'
import { remove} from 'lodash'
import {
  crudAdd,
  crudRemove,
  crudRename,
  crudSetAccess,
  crudSetEnvironmentOptions,
  crudSetOptions
} from '../../app/slices'
import {addEnvironment, removeEnvironment, updateEnvironment} from '../environments/environmentsSlice'
import {removeFunctionalRole, updateFunctionalRole} from '../functionalRoles/functionalRolesSlice'
import {
  defaultVirtualWarehouseOptions,
  VirtualWarehouseOptions
} from 'roleout-lib/build/objects/virtualWarehouse'
import {Environment} from '../environments/environment'
import {defaultEnvironmentsOptions, OptionsSet} from '../options/options'

export class VirtualWarehouseSliceError extends Error {
  constructor(s: string) {
    super(s)
  }
}

export class NoSuchVirtualWarehouseError extends VirtualWarehouseSliceError {
  constructor(name: string) {
    super(`No such virtualWarehouse '${name}'`)
  }
}

type VirtualWarehouseState = VirtualWarehouse[]
type VirtualWarehouseAccessAction = PayloadAction<{ virtualWarehouse: string, role: string, level: VirtualWarehouseAccessLevel | null, environment?: string }>

const factory = (name: string, _state: Draft<VirtualWarehouseState>, environments: Environment[], options?: OptionsSet<VirtualWarehouseOptions>): Draft<VirtualWarehouse> => {
  if (options) return {name, access: {}, ...options}
  return {
    name,
    access: {},
    options: defaultVirtualWarehouseOptions,
    environmentOptions: environments ? defaultEnvironmentsOptions(environments, defaultVirtualWarehouseOptions) : {}
  }
}

export const virtualWarehousesSlice = createSlice({
  name: 'virtualWarehouses',
  initialState: [] as VirtualWarehouse[],
  reducers: {
    addVirtualWarehouse: crudAdd(factory),
    removeVirtualWarehouse: crudRemove(),
    updateVirtualWarehouse: crudRename(),
    setVirtualWarehouseOptions: crudSetOptions<VirtualWarehouse, VirtualWarehouseOptions>(),
    setVirtualWarehouseEnvironmentOptions: crudSetEnvironmentOptions<VirtualWarehouse, VirtualWarehouseOptions>(),
    setVirtualWarehouseAccess: crudSetAccess<VirtualWarehouse, VirtualWarehouseAccessLevel>(),
  },
  extraReducers: (builder) => {
    builder
      // when an environment is created we must add default options for it
      .addCase(addEnvironment, (state: Draft<VirtualWarehouseState>, action) => {
        for (const virtualWarehouse of state) {
          virtualWarehouse.environmentOptions[action.payload.name] = defaultVirtualWarehouseOptions
        }
      })
      // when an environment is renamed we must rename it in all the virtual warehouse access objects
      .addCase(updateEnvironment, (state: Draft<VirtualWarehouseState>, action) => {
        for (const virtualWarehouse of state) {
          // Environment Options
          virtualWarehouse.environmentOptions[action.payload.newName] = virtualWarehouse.environmentOptions[action.payload.name]
          delete virtualWarehouse.environmentOptions[action.payload.name]

          // Access
          for (const [, access] of Object.entries(virtualWarehouse.access)) {
            for (const entry of access) {
              if (entry.environment === action.payload.name) entry.environment = action.payload.newName
            }
          }
        }
      })
      // when an environment is removed we must remove the corresponding the virtual warehouse access objects
      .addCase(removeEnvironment, (state: Draft<VirtualWarehouseState>, action) => {
        for (const virtualWarehouse of state) {
          // Environment Options
          delete virtualWarehouse.environmentOptions[action.payload]

          // Access
          for (const [, access] of Object.entries(virtualWarehouse.access)) {
            remove(access, a => a.environment === action.payload)
          }
        }
      })
      // when a functional role is renamed we must rename it in all the virtual warehouse access objects
      .addCase(updateFunctionalRole, (state: Draft<VirtualWarehouseState>, action) => {
        for (const virtualWarehouse of state) {
          if (action.payload.name in virtualWarehouse.access) {
            virtualWarehouse.access[action.payload.newName] = virtualWarehouse.access[action.payload.name]
            delete virtualWarehouse.access[action.payload.name]
          }
        }
      })
      // when a functional role is deleted we must remove the corresponding access
      .addCase(removeFunctionalRole, (state: Draft<VirtualWarehouseState>, action) => {
        for (const virtualWarehouse of state) {
          if (action.payload in virtualWarehouse.access) delete virtualWarehouse.access[action.payload]
        }
      })
  }
})

export const {
  addVirtualWarehouse,
  removeVirtualWarehouse,
  updateVirtualWarehouse,
  setVirtualWarehouseOptions,
  setVirtualWarehouseEnvironmentOptions,
  setVirtualWarehouseAccess
} = virtualWarehousesSlice.actions

export default virtualWarehousesSlice.reducer
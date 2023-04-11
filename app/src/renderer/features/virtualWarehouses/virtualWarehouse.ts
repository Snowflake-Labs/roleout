import {VirtualWarehouseAccess} from '../access/virtualWarehouseAccess'
import {VirtualWarehouseOptions} from 'roleout-lib/build/objects/virtualWarehouse'

export interface VirtualWarehouse  {
  readonly name: string
  readonly options: VirtualWarehouseOptions
  readonly environmentOptions: {
    [env: string]: VirtualWarehouseOptions
  }
  readonly access: { [role: string]: VirtualWarehouseAccess[] }
}
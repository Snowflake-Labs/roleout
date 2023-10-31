import {VirtualWarehouse} from '../objects/virtualWarehouse'
import {Role} from '../roles/role'
import {Grant, GrantType} from './grant'
import {Privilege} from '../privilege'
import {AccountObjectType} from '../objects/objects'

export class VirtualWarehouseGrant implements Grant {
  virtualWarehouse: VirtualWarehouse
  privileges: Privilege[]
  role: Role
  type: GrantType = 'VirtualWarehouseGrant'
  objectType = AccountObjectType.WAREHOUSE

  constructor(
    virtualWarehouse: VirtualWarehouse,
    privileges: Privilege[],
    role: Role
  ) {
    this.virtualWarehouse = virtualWarehouse
    this.privileges = privileges
    this.role = role
  }
}

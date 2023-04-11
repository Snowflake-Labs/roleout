import { VirtualWarehouse } from '../objects/virtualWarehouse'
import { Role } from '../roles/role'
import {Grant, GrantKind, GrantType} from './grant'
import { Privilege } from '../privilege'

export class VirtualWarehouseGrant implements Grant {
  virtualWarehouse: VirtualWarehouse
  privilege: Privilege
  role: Role
  type: GrantType = 'VirtualWarehouseGrant'
  kind: GrantKind = 'virtual_warehouse'

  constructor(
    virtualWarehouse: VirtualWarehouse,
    privilege: Privilege,
    role: Role
  ) {
    this.virtualWarehouse = virtualWarehouse
    this.privilege = privilege
    this.role = role
  }
}

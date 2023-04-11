import { AccessRole } from './accessRole'
import { VirtualWarehouse } from '../objects/virtualWarehouse'
import { Grant } from '../grants/grant'
import { NamingConvention } from '../namingConvention'
import Mustache from 'mustache'
import {
  VirtualWarehouseAccessLevel,
  virtualWarehouseAccessLevelShortName,
} from '../access/virtualWarehouseAccessLevel'
import { VirtualWarehouseGrant } from '../grants/virtualWarehouseGrant'
import { Privilege } from '../privilege'

export class VirtualWarehouseAccessRole implements AccessRole {
  virtualWarehouse: VirtualWarehouse
  name: string
  accessLevel: VirtualWarehouseAccessLevel
  grants: Grant[]

  constructor(
    virtualWarehouse: VirtualWarehouse,
    accessLevel: VirtualWarehouseAccessLevel,
    namingConvention: NamingConvention
  ) {
    this.virtualWarehouse = virtualWarehouse
    this.accessLevel = accessLevel
    this.grants = this.buildGrants()
    this.name = this.generateName(namingConvention)
  }

  private generateName(namingConvention: NamingConvention): string {
    return Mustache.render(namingConvention.virtualWarehouseAccessRole, {
      name: this.virtualWarehouse.name,
      levelShort: virtualWarehouseAccessLevelShortName(this.accessLevel),
    })
  }

  private buildGrants(): Grant[] {
    const monitorGrants = [
      new VirtualWarehouseGrant(this.virtualWarehouse, Privilege.MONITOR, this),
    ]

    const usageGrants = [new VirtualWarehouseGrant(this.virtualWarehouse, Privilege.USAGE, this)]

    const fullGrants = [
      new VirtualWarehouseGrant(this.virtualWarehouse, Privilege.OWNERSHIP, this),
    ]

    switch (this.accessLevel) {
    case VirtualWarehouseAccessLevel.Usage:
      return usageGrants
    case VirtualWarehouseAccessLevel.UsageMonitor:
      return usageGrants.concat(monitorGrants)
    case VirtualWarehouseAccessLevel.Full:
      return fullGrants
    }
  }
}

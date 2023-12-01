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
    this.grants = this.buildGrants(namingConvention)
    this.name = this.generateName(namingConvention)
  }

  private generateName(namingConvention: NamingConvention): string {
    return Mustache.render(namingConvention.virtualWarehouseAccessRole, {
      name: this.virtualWarehouse.name,
      levelShort: virtualWarehouseAccessLevelShortName(this.accessLevel),
    })
  }

  private buildGrants(namingConvention: NamingConvention): Grant[] {
    // all other grants depend on the virtual warehouse ownership being set
    let virtualWarehouseOwnerGrant: VirtualWarehouseGrant
    if (this.accessLevel === VirtualWarehouseAccessLevel.Full) {
      virtualWarehouseOwnerGrant = new VirtualWarehouseGrant(this.virtualWarehouse, [Privilege.OWNERSHIP], this)
    } else {
      virtualWarehouseOwnerGrant = new VirtualWarehouseGrant(this.virtualWarehouse, [Privilege.OWNERSHIP], new VirtualWarehouseAccessRole(this.virtualWarehouse, VirtualWarehouseAccessLevel.Full, namingConvention))
    }
    const usageGrants = [new VirtualWarehouseGrant(this.virtualWarehouse, [Privilege.USAGE], this, [virtualWarehouseOwnerGrant])]

    const usageMonitorGrants = [
      new VirtualWarehouseGrant(this.virtualWarehouse, [Privilege.USAGE, Privilege.MONITOR], this, [virtualWarehouseOwnerGrant]),
    ]

    const monitorGrants = [
      new VirtualWarehouseGrant(this.virtualWarehouse, [Privilege.MONITOR], this, [virtualWarehouseOwnerGrant]),
    ]

    const fullGrants = [
      new VirtualWarehouseGrant(this.virtualWarehouse, [Privilege.OWNERSHIP], this),
    ]

    switch (this.accessLevel) {
    case VirtualWarehouseAccessLevel.Usage:
      return usageGrants
    case VirtualWarehouseAccessLevel.UsageMonitor:
      return usageMonitorGrants
    case VirtualWarehouseAccessLevel.Monitor:
      return monitorGrants
    case VirtualWarehouseAccessLevel.Full:
      return fullGrants
    }
  }
}

import {TerraformResource} from './terraformResource'
import {
  VirtualWarehouse,
  VirtualWarehouseOptions,
  VirtualWarehouseScalingPolicy,
  VirtualWarehouseSize
} from '../../objects/virtualWarehouse'
import {TerraformBackend} from '../terraformBackend'
import compact from 'lodash/compact'
import standardizeIdentifierForResource from './standardizeIdentifierForResource'

export class TerraformVirtualWarehouse implements TerraformResource, VirtualWarehouseOptions {
  name: string
  size: VirtualWarehouseSize
  minClusterCount: number
  maxClusterCount: number
  scalingPolicy: VirtualWarehouseScalingPolicy
  autoSuspend: number
  autoResume: boolean

  constructor(name: string, size: VirtualWarehouseSize, minClusterCount: number, maxClusterCount: number, scalingPolicy: VirtualWarehouseScalingPolicy, autoSuspend: number, autoResume: boolean) {
    this.name = name
    this.size = size
    this.minClusterCount = minClusterCount
    this.maxClusterCount = maxClusterCount
    this.scalingPolicy = scalingPolicy
    this.autoSuspend = autoSuspend
    this.autoResume = autoResume
  }

  resourceType(): string {
    return 'snowflake_warehouse'
  }

  resourceName(): string {
    return standardizeIdentifierForResource(this.name)
  }

  resourceID(): string {
    return this.name
  }

  resourceBlock(): string {
    const spacing = TerraformBackend.SPACING

    return compact([
      `resource ${this.resourceType()} ${this.resourceName()} {`,
      spacing + `name = "${this.name}"`,
      spacing + `warehouse_size = "${this.size}"`,
      spacing + 'initially_suspended = true',
      spacing + `max_cluster_count = ${this.maxClusterCount}`,
      spacing + `min_cluster_count = ${this.minClusterCount}`,
      this.maxClusterCount > this.minClusterCount ? spacing + `scaling_policy = "${this.scalingPolicy}"` : null,
      spacing + `auto_suspend = ${this.autoSuspend * 60}`,
      spacing + `auto_resume = ${this.autoResume}`,
      '}',
    ]).join('\n')
  }

  static fromVirtualWarehouse(virtualWarehouse: VirtualWarehouse) {
    return new TerraformVirtualWarehouse(
      virtualWarehouse.name,
      virtualWarehouse.size,
      virtualWarehouse.minClusterCount,
      virtualWarehouse.maxClusterCount,
      virtualWarehouse.scalingPolicy,
      virtualWarehouse.autoSuspend,
      virtualWarehouse.autoResume
    )
  }
}

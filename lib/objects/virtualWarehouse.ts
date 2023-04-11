import {VirtualWarehouseAccess} from '../access/virtualWarehouseAccess'
import {VirtualWarehouseAccessRole} from '../roles/virtualWarehouseAccessRole'
import {VirtualWarehouseAccessLevel} from '../access/virtualWarehouseAccessLevel'
import {NamingConvention} from '../namingConvention'
import {FunctionalRole} from '../roles/functionalRole'

export enum VirtualWarehouseSize {
  XSMALL ='XSMALL',
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  XLARGE = 'XLARGE',
  XXLARGE = 'XXLARGE',
  XXXLARGE = 'XXXLARGE',
  X4LARGE = 'X4LARGE',
  X5LARGE = 'X5LARGE',
  X6LARGE = 'X6LARGE'
}

export type VirtualWarehouseScalingPolicy = 'STANDARD' | 'ECONOMY'

export interface VirtualWarehouseOptions {
  size: VirtualWarehouseSize
  minClusterCount: number
  maxClusterCount: number
  autoSuspend: number
  autoResume: boolean
  scalingPolicy: VirtualWarehouseScalingPolicy
}

export const defaultVirtualWarehouseOptions: VirtualWarehouseOptions = {
  size: VirtualWarehouseSize.MEDIUM,
  minClusterCount: 1,
  maxClusterCount: 1,
  autoSuspend: 10,
  autoResume: true,
  scalingPolicy: 'STANDARD'
}

export class VirtualWarehouse implements VirtualWarehouseOptions {
  name: string
  size: VirtualWarehouseSize
  minClusterCount: number
  maxClusterCount: number
  scalingPolicy: VirtualWarehouseScalingPolicy
  autoSuspend: number
  autoResume: boolean
  access: VirtualWarehouseAccess

  constructor(name: string, options: VirtualWarehouseOptions = defaultVirtualWarehouseOptions) {
    this.name = name
    this.size = options.size
    this.minClusterCount = options.minClusterCount
    this.maxClusterCount = options.maxClusterCount
    this.scalingPolicy = options.scalingPolicy
    this.autoSuspend = options.autoSuspend
    this.autoResume = options.autoResume
    this.access = new Map<FunctionalRole, VirtualWarehouseAccessLevel>()
  }

  accessRoles(namingConvention: NamingConvention): VirtualWarehouseAccessRole[] {
    return [
      VirtualWarehouseAccessLevel.Usage,
      VirtualWarehouseAccessLevel.UsageMonitor,
      VirtualWarehouseAccessLevel.Full,
    ].map((level) => new VirtualWarehouseAccessRole(this, level, namingConvention))
  }

  equals(other: VirtualWarehouse) {
    return this.name === other.name
  }
}

import {VirtualWarehouseAccess} from '../access/virtualWarehouseAccess'
import {VirtualWarehouseAccessRole} from '../roles/virtualWarehouseAccessRole'
import {VirtualWarehouseAccessLevel} from '../access/virtualWarehouseAccessLevel'
import {NamingConvention} from '../namingConvention'
import {FunctionalRole} from '../roles/functionalRole'

export type VirtualWarehouseType = 'STANDARD' | 'SNOWPARK-OPTIMIZED'

export enum VirtualWarehouseSize {
  XSMALL = 'XSMALL',
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

export function parseVirtualWarehouseSize(s: string): VirtualWarehouseSize {
  switch (s) {
  case 'X-Small':
    return VirtualWarehouseSize.XSMALL
  case 'Small':
    return VirtualWarehouseSize.SMALL
  case 'Medium':
    return VirtualWarehouseSize.MEDIUM
  case 'Large':
    return VirtualWarehouseSize.LARGE
  case 'X-Large':
    return VirtualWarehouseSize.XLARGE
  case '2X-Large':
    return VirtualWarehouseSize.XXLARGE
  case '3X-Large':
    return VirtualWarehouseSize.XXXLARGE
  case '4X-Large':
    return VirtualWarehouseSize.X4LARGE
  case '5X-Large':
    return VirtualWarehouseSize.X5LARGE
  case '6X-Large':
    return VirtualWarehouseSize.X6LARGE
  default:
    throw new Error(`Invalid virtual warehouse size string '${s}'`)
  }
}

export type VirtualWarehouseScalingPolicy = 'STANDARD' | 'ECONOMY'

export interface VirtualWarehouseOptions {
  size: VirtualWarehouseSize
  minClusterCount: number
  maxClusterCount: number
  autoSuspend: number
  autoResume: boolean
  scalingPolicy: VirtualWarehouseScalingPolicy
  enableQueryAcceleration: boolean
  queryAccelerationMaxScaleFactor: number
  type: VirtualWarehouseType
}

export const defaultVirtualWarehouseOptions: VirtualWarehouseOptions = {
  size: VirtualWarehouseSize.MEDIUM,
  minClusterCount: 1,
  maxClusterCount: 1,
  autoSuspend: 10,
  autoResume: true,
  scalingPolicy: 'STANDARD',
  enableQueryAcceleration: false,
  queryAccelerationMaxScaleFactor: 8,
  type: 'STANDARD'
}

export class VirtualWarehouse implements VirtualWarehouseOptions {
  name: string
  size: VirtualWarehouseSize
  minClusterCount: number
  maxClusterCount: number
  scalingPolicy: VirtualWarehouseScalingPolicy
  autoSuspend: number
  autoResume: boolean
  enableQueryAcceleration: boolean
  queryAccelerationMaxScaleFactor: number
  type: 'STANDARD' | 'SNOWPARK-OPTIMIZED'
  access: VirtualWarehouseAccess

  constructor(name: string, options: VirtualWarehouseOptions = defaultVirtualWarehouseOptions) {
    this.name = name
    this.size = options.size
    this.minClusterCount = options.minClusterCount
    this.maxClusterCount = options.maxClusterCount
    this.scalingPolicy = options.scalingPolicy
    this.autoSuspend = options.autoSuspend
    this.autoResume = options.autoResume
    this.enableQueryAcceleration = options.enableQueryAcceleration
    this.queryAccelerationMaxScaleFactor = options.queryAccelerationMaxScaleFactor
    this.type = options.type
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

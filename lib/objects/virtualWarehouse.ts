import {VirtualWarehouseAccess} from '../access/virtualWarehouseAccess'
import {VirtualWarehouseAccessRole} from '../roles/virtualWarehouseAccessRole'
import {VirtualWarehouseAccessLevel} from '../access/virtualWarehouseAccessLevel'
import {NamingConvention} from '../namingConvention'
import {FunctionalRole} from '../roles/functionalRole'

export type VirtualWarehouseType = 'STANDARD' | 'SNOWPARK-OPTIMIZED'

export enum VirtualWarehouseSize {
  XSMALL = 'X-Small',
  SMALL = 'Small',
  MEDIUM = 'Medium',
  LARGE = 'Large',
  XLARGE = 'X-Large',
  XXLARGE = '2X-Large',
  XXXLARGE = '3X-Large',
  X4LARGE = '4X-Large',
  X5LARGE = '5X-Large',
  X6LARGE = '6X-Large'
}

export function virtualWarehouseSizeSQLIdentifier(s: VirtualWarehouseSize): string {
  switch (s) {
  case VirtualWarehouseSize.XSMALL:
    return 'XSMALL'
  case VirtualWarehouseSize.SMALL:
    return 'SMALL'
  case VirtualWarehouseSize.MEDIUM:
    return 'MEDIUM'
  case VirtualWarehouseSize.LARGE:
    return 'LARGE'
  case VirtualWarehouseSize.XLARGE:
    return 'XLARGE'
  case VirtualWarehouseSize.XXLARGE:
    return 'XXLARGE'
  case VirtualWarehouseSize.XXXLARGE:
    return 'XXXLARGE'
  case VirtualWarehouseSize.X4LARGE:
    return 'X4LARGE'
  case VirtualWarehouseSize.X5LARGE:
    return 'X5LARGE'
  case VirtualWarehouseSize.X6LARGE:
    return 'X6LARGE'
  }
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
  case 'XSMALL':
    return VirtualWarehouseSize.XSMALL
  case 'SMALL':
    return VirtualWarehouseSize.SMALL
  case 'MEDIUM':
    return VirtualWarehouseSize.MEDIUM
  case 'LARGE':
    return VirtualWarehouseSize.LARGE
  case 'XLARGE':
    return VirtualWarehouseSize.XLARGE
  case 'XXLARGE':
    return VirtualWarehouseSize.XXLARGE
  case 'XXXLARGE':
    return VirtualWarehouseSize.XXXLARGE
  case 'X4LARGE':
    return VirtualWarehouseSize.X4LARGE
  case 'X5LARGE':
    return VirtualWarehouseSize.X5LARGE
  case 'X6LARGE':
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
  queryAccelerationMaxScaleFactor?: number
  type: VirtualWarehouseType
  statementTimeoutInSeconds?: number
  resourceMonitor?: string
  initiallySuspended: boolean
}

export const defaultVirtualWarehouseOptions: VirtualWarehouseOptions = {
  size: VirtualWarehouseSize.MEDIUM,
  minClusterCount: 1,
  maxClusterCount: 1,
  autoSuspend: 10,
  autoResume: true,
  scalingPolicy: 'STANDARD',
  enableQueryAcceleration: false,
  queryAccelerationMaxScaleFactor: undefined,
  type: 'STANDARD',
  statementTimeoutInSeconds: undefined,
  initiallySuspended: true
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
  queryAccelerationMaxScaleFactor?: number
  type: 'STANDARD' | 'SNOWPARK-OPTIMIZED'
  access: VirtualWarehouseAccess
  statementTimeoutInSeconds?: number
  resourceMonitor?: string
  initiallySuspended: boolean

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
    this.statementTimeoutInSeconds = options.statementTimeoutInSeconds
    this.resourceMonitor = options.resourceMonitor
    this.initiallySuspended = options.initiallySuspended
  }

  accessRoles(namingConvention: NamingConvention): VirtualWarehouseAccessRole[] {
    return [
      VirtualWarehouseAccessLevel.Usage,
      VirtualWarehouseAccessLevel.UsageMonitor,
      VirtualWarehouseAccessLevel.Monitor,
      VirtualWarehouseAccessLevel.Full,
    ].map((level) => new VirtualWarehouseAccessRole(this, level, namingConvention))
  }

  equals(other: VirtualWarehouse) {
    return this.name === other.name
  }

  toRecord() {
    const accessRecords = Array(...this.access.entries()).map(([role, level]) => {
      return {role: role.name, level: VirtualWarehouseAccessLevel[level]}
    })
    return {
      name: this.name,
      options: {
        size: this.size,
        minClusterCount: this.minClusterCount,
        maxClusterCount: this.maxClusterCount,
        scalingPolicy: this.scalingPolicy,
        autoSuspend: this.autoSuspend,
        autoResume: this.autoResume,
        enableQueryAcceleration: this.enableQueryAcceleration,
        queryAccelerationMaxScaleFactor: this.queryAccelerationMaxScaleFactor,
        type: this.type,
        statementTimeoutInSeconds: this.statementTimeoutInSeconds,
        resourceMonitor: this.resourceMonitor,
        initiallySuspended: this.initiallySuspended
      },
      access: accessRecords
    }
  }
}

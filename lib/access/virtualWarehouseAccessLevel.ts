import {UndefinedAccessLevelError} from './undefinedAccessLevelError'

export enum VirtualWarehouseAccessLevel {
  Usage,
  UsageMonitor,
  Monitor,
  Full,
}

export function parseVirtualWarehouseAccessLevel(str: string): VirtualWarehouseAccessLevel {
  const level = VirtualWarehouseAccessLevel[str as keyof typeof VirtualWarehouseAccessLevel]
  if (undefined === level) {
    throw new UndefinedAccessLevelError(str)
  } else {
    return level
  }
}

export function virtualWarehouseAccessLevelShortName(accessLevel: VirtualWarehouseAccessLevel): string {
  switch (accessLevel) {
  case VirtualWarehouseAccessLevel.Usage:
    return 'U'
  case VirtualWarehouseAccessLevel.UsageMonitor:
    return 'UM'
  case VirtualWarehouseAccessLevel.Monitor:
    return 'M'
  case VirtualWarehouseAccessLevel.Full:
    return 'FULL'
  }
}

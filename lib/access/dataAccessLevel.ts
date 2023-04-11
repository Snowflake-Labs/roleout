import {UndefinedAccessLevelError} from './undefinedAccessLevelError'

export enum DataAccessLevel {
  Read,
  ReadWrite,
  Full,
}

export function parseDataAccessLevel(str: string): DataAccessLevel {
  const level = DataAccessLevel[str as keyof typeof DataAccessLevel]
  if (undefined === level) {
    throw new UndefinedAccessLevelError(str)
  } else {
    return level
  }
}

export function dataAccessLevelShortName(level: DataAccessLevel): string {
  switch (level) {
  case DataAccessLevel.Read:
    return 'R'
  case DataAccessLevel.ReadWrite:
    return 'RW'
  case DataAccessLevel.Full:
    return 'FULL'
  }
}

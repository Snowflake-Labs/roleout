import {UndefinedAccessLevelError} from './undefinedAccessLevelError'

export enum SchemaObjectGroupAccessLevel {
  Read,
  ReadWrite,
}

export function parseSchemaObjectGroupAccessLevel(str: string): SchemaObjectGroupAccessLevel {
  const level = SchemaObjectGroupAccessLevel[str as keyof typeof SchemaObjectGroupAccessLevel]
  if (undefined === level) {
    throw new UndefinedAccessLevelError(str)
  } else {
    return level
  }
}

export function schemaObjectGroupAccessLevelShortName(level: SchemaObjectGroupAccessLevel): string {
  switch (level) {
  case SchemaObjectGroupAccessLevel.Read:
    return 'R'
  case SchemaObjectGroupAccessLevel.ReadWrite:
    return 'RW'
  }
}

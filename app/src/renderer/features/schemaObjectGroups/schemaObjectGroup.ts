import {SchemaObjectGroupAccess} from '../access/schemaObjectGroupAccess'

export type SchemaObjectGroup = {
  readonly name: string
  readonly objects: {
    [database: string]: {
      [schema: string]: {
        tables: string[]
        views: string[]
      }
    }
  }
  readonly access: { [role: string]: SchemaObjectGroupAccess[] }
}
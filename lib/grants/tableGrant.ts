import {Table} from '../objects/table'
import {Schema} from '../objects/schema'
import {Role} from '../roles/role'
import {Privilege} from '../privilege'
import {SchemaObjectGrant} from './schemaObjectGrant'
import {Grant} from './grant'
import {SchemaObjectType} from '../objects/objects'

export class TableGrant extends SchemaObjectGrant {
  schema: Schema
  table?: Table
  future: boolean
  privileges: Privilege[]
  role: Role
  dependsOn?: Grant[]
  objectType = SchemaObjectType.TABLE

  constructor(
    schema: Schema,
    future: boolean,
    privileges: Privilege[],
    role: Role,
    table?: Table,
    dependsOn?: Grant[]
  ) {
    super()
    this.schema = schema
    this.table = table
    this.future = future
    this.privileges = privileges
    this.role = role
    this.dependsOn = dependsOn
  }

  objectName(): string | undefined {
    return this.table?.name
  }
}

import {Table} from '../objects/table'
import {Schema} from '../objects/schema'
import {Role} from '../roles/role'
import {Privilege} from '../privilege'
import {SchemaObjectGrant, SchemaObjectGrantKind} from './schemaObjectGrant'
import {Grant} from './grant'

export class TableGrant extends SchemaObjectGrant {
  schema: Schema
  table?: Table
  future: boolean
  privilege: Privilege
  role: Role
  dependsOn?: Grant[]
  kind: SchemaObjectGrantKind = 'table'

  constructor(
    schema: Schema,
    future: boolean,
    privilege: Privilege,
    role: Role,
    table?: Table,
    dependsOn?: Grant[]
  ) {
    super()
    this.schema = schema
    this.table = table
    this.future = future
    this.privilege = privilege
    this.role = role
    this.dependsOn = dependsOn
  }

  objectName(): string | undefined {
    return this.table?.name
  }
}

import { Schema } from '../objects/schema'
import { Role } from '../roles/role'
import {Grant, GrantKind, GrantType} from './grant'
import { Privilege } from '../privilege'

export class SchemaGrant implements Grant {
  schema: Schema
  privileges: Privilege[]
  role: Role
  type: GrantType = 'SchemaGrant'
  kind: GrantKind = 'schema'

  constructor(schema: Schema, privileges: Privilege[], role: Role) {
    this.schema = schema
    this.privileges = privileges
    this.role = role
  }
}

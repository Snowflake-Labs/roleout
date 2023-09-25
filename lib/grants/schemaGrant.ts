import { Schema } from '../objects/schema'
import { Role } from '../roles/role'
import {Grant, GrantKind, GrantType} from './grant'
import { Privilege } from '../privilege'
import {Database} from '../objects/database'

export class SchemaGrant implements Grant {
  schema: Schema
  privilege: Privilege
  role: Role
  type: GrantType = 'SchemaGrant'
  kind: GrantKind = 'schema'

  constructor(schema: Schema, privilege: Privilege, role: Role) {
    this.schema = schema
    this.privilege = privilege
    this.role = role
  }
}

import {Schema} from '../objects/schema'
import {Role} from '../roles/role'
import {Grant, GrantType} from './grant'
import {Privilege} from '../privilege'
import {AccountObjectType} from '../objects/objects'

export class SchemaGrant implements Grant {
  schema: Schema
  privileges: Privilege[]
  role: Role
  type: GrantType = 'SchemaGrant'
  objectType = AccountObjectType.SCHEMA

  constructor(schema: Schema, privileges: Privilege[], role: Role) {
    this.schema = schema
    this.privileges = privileges
    this.role = role
  }
}

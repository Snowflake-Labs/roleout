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
  dependsOn?: Grant[]

  constructor(schema: Schema, privileges: Privilege[], role: Role, dependsOn?: Grant[]) {
    this.schema = schema
    this.privileges = privileges
    this.role = role
    this.dependsOn = dependsOn
  }
}

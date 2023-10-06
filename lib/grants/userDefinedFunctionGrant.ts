import { UserDefinedFunction } from '../objects/userDefinedFunction'
import { Schema } from '../objects/schema'
import { Role } from '../roles/role'
import { Privilege } from '../privilege'
import {SchemaObjectGrant, SchemaObjectGrantKind} from './schemaObjectGrant'
import {Grant} from './grant'

export class UserDefinedFunctionGrant extends SchemaObjectGrant {
  schema: Schema
  func?: UserDefinedFunction
  future: boolean
  privileges: Privilege[]
  role: Role
  dependsOn?: Grant[]
  kind: SchemaObjectGrantKind = 'function'

  constructor(
    schema: Schema,
    future: boolean,
    privileges: Privilege[],
    role: Role,
    func?: UserDefinedFunction,
    dependsOn?: Grant[]
  ) {
    super()
    this.schema = schema
    this.func = func
    this.future = future
    this.privileges = privileges
    this.role = role
    this.dependsOn = dependsOn
  }

  objectName(): string | undefined {
    return this.func?.name
  }
}

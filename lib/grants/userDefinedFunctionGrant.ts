import {UserDefinedFunction} from '../objects/userDefinedFunction'
import {Schema} from '../objects/schema'
import {Role} from '../roles/role'
import {Privilege} from '../privilege'
import {SchemaObjectGrant} from './schemaObjectGrant'
import {Grant} from './grant'
import {SchemaObjectType} from '../objects/objects'

export class UserDefinedFunctionGrant extends SchemaObjectGrant {
  schema: Schema
  func?: UserDefinedFunction
  future: boolean
  privileges: Privilege[]
  role: Role
  dependsOn?: Grant[]
  objectType = SchemaObjectType.FUNCTION

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

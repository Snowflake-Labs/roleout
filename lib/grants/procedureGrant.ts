import {Procedure} from '../objects/procedure'
import {Schema} from '../objects/schema'
import {Role} from '../roles/role'
import {Privilege} from '../privilege'
import {SchemaObjectGrant} from './schemaObjectGrant'
import {Grant} from './grant'
import {SchemaObjectType} from '../objects/objects'

export class ProcedureGrant extends SchemaObjectGrant {
  schema: Schema
  procedure?: Procedure
  future: boolean
  privileges: Privilege[]
  role: Role
  dependsOn?: Grant[]
  objectType = SchemaObjectType.PROCEDURE

  constructor(
    schema: Schema,
    future: boolean,
    privileges: Privilege[],
    role: Role,
    procedure?: Procedure,
    dependsOn?: Grant[]
  ) {
    super()
    this.schema = schema
    this.procedure = procedure
    this.future = future
    this.privileges = privileges
    this.role = role
    this.dependsOn = dependsOn
  }

  objectName(): string | undefined {
    return this.procedure?.name
  }
}

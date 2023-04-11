import { Procedure } from '../objects/procedure'
import { Schema } from '../objects/schema'
import { Role } from '../roles/role'
import { Privilege } from '../privilege'
import {SchemaObjectGrant, SchemaObjectGrantKind} from './schemaObjectGrant'
import {Grant} from './grant'

export class ProcedureGrant extends SchemaObjectGrant {
  schema: Schema
  procedure?: Procedure
  future: boolean
  privilege: Privilege
  role: Role
  dependsOn?: Grant[]
  kind: SchemaObjectGrantKind = 'procedure'

  constructor(
    schema: Schema,
    future: boolean,
    privilege: Privilege,
    role: Role,
    procedure?: Procedure,
    dependsOn?: Grant[]
  ) {
    super()
    this.schema = schema
    this.procedure = procedure
    this.future = future
    this.privilege = privilege
    this.role = role
    this.dependsOn = dependsOn
  }

  objectName(): string | undefined {
    return this.procedure?.name
  }
}

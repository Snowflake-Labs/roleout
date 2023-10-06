import { Sequence } from '../objects/sequence'
import { Schema } from '../objects/schema'
import { Role } from '../roles/role'
import {SchemaObjectGrant, SchemaObjectGrantKind} from './schemaObjectGrant'
import { Privilege } from '../privilege'
import {Grant} from './grant'

export class SequenceGrant extends SchemaObjectGrant {
  schema: Schema
  sequence?: Sequence
  future: boolean
  privileges: Privilege[]
  role: Role
  dependsOn?: Grant[]
  kind: SchemaObjectGrantKind = 'sequence'

  constructor(
    schema: Schema,
    future: boolean,
    privileges: Privilege[],
    role: Role,
    sequence?: Sequence,
    dependsOn?: Grant[]
  ) {
    super()
    this.schema = schema
    this.sequence = sequence
    this.future = future
    this.privileges = privileges
    this.role = role
    this.dependsOn = dependsOn
  }

  objectName(): string | undefined {
    return this.sequence?.name
  }
}

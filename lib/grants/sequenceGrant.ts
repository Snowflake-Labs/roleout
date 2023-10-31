import {Sequence} from '../objects/sequence'
import {Schema} from '../objects/schema'
import {Role} from '../roles/role'
import {SchemaObjectGrant} from './schemaObjectGrant'
import {Privilege} from '../privilege'
import {Grant} from './grant'
import {SchemaObjectType} from '../objects/objects'

export class SequenceGrant extends SchemaObjectGrant {
  schema: Schema
  sequence?: Sequence
  future: boolean
  privileges: Privilege[]
  role: Role
  dependsOn?: Grant[]
  objectType = SchemaObjectType.SEQUENCE

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

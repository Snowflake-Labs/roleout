import {Stream} from '../objects/stream'
import {Schema} from '../objects/schema'
import {Role} from '../roles/role'
import {Privilege} from '../privilege'
import {SchemaObjectGrant} from './schemaObjectGrant'
import {Grant} from './grant'
import {SchemaObjectType} from '../objects/objects'

export class StreamGrant extends SchemaObjectGrant {
  schema: Schema
  stream?: Stream
  future: boolean
  privileges: Privilege[]
  role: Role
  dependsOn?: Grant[]
  objectType = SchemaObjectType.STREAM

  constructor(
    schema: Schema,
    future: boolean,
    privileges: Privilege[],
    role: Role,
    stream?: Stream,
    dependsOn?: Grant[]
  ) {
    super()
    this.schema = schema
    this.stream = stream
    this.future = future
    this.privileges = privileges
    this.role = role
    this.dependsOn = dependsOn
  }

  objectName(): string | undefined {
    return this.stream?.name
  }
}

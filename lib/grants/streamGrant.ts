import {Stream} from '../objects/stream'
import {Schema} from '../objects/schema'
import {Role} from '../roles/role'
import {Privilege} from '../privilege'
import {SchemaObjectGrant, SchemaObjectGrantKind} from './schemaObjectGrant'
import {Grant} from './grant'

export class StreamGrant extends SchemaObjectGrant {
  schema: Schema
  stream?: Stream
  future: boolean
  privilege: Privilege
  role: Role
  dependsOn?: Grant[]
  kind: SchemaObjectGrantKind = 'stream'

  constructor(
    schema: Schema,
    future: boolean,
    privilege: Privilege,
    role: Role,
    stream?: Stream,
    dependsOn?: Grant[]
  ) {
    super()
    this.schema = schema
    this.stream = stream
    this.future = future
    this.privilege = privilege
    this.role = role
    this.dependsOn = dependsOn
  }

  objectName(): string | undefined {
    return this.stream?.name
  }
}

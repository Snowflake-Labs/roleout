import {Stream} from '../objects/stream'
import {Schema} from '../objects/schema'
import {Role} from '../roles/role'
import {Privilege} from '../privilege'
import {SchemaObjectGrant, SchemaObjectGrantKind} from './schemaObjectGrant'
import {Grant} from './grant'
import {Pipe} from '../objects/pipe'

export class PipeGrant extends SchemaObjectGrant {
  schema: Schema
  pipe?: Pipe
  future: boolean
  privilege: Privilege
  role: Role
  dependsOn?: Grant[]
  kind: SchemaObjectGrantKind = 'pipe'

  constructor(
    schema: Schema,
    future: boolean,
    privilege: Privilege,
    role: Role,
    pipe?: Pipe,
    dependsOn?: Grant[]
  ) {
    super()
    this.schema = schema
    this.pipe = pipe
    this.future = future
    this.privilege = privilege
    this.role = role
    this.dependsOn = dependsOn
  }

  objectName(): string | undefined {
    return this.pipe?.name
  }
}

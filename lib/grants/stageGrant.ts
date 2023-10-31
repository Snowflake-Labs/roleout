import {Stage} from '../objects/stage'
import {Schema} from '../objects/schema'
import {Role} from '../roles/role'
import {SchemaObjectGrant} from './schemaObjectGrant'
import {Privilege} from '../privilege'
import {Grant} from './grant'
import {SchemaObjectType} from '../objects/objects'

export class StageGrant extends SchemaObjectGrant {
  schema: Schema
  stage?: Stage
  future: boolean
  privileges: Privilege[]
  role: Role
  dependsOn?: Grant[]
  objectType = SchemaObjectType.STAGE

  constructor(
    schema: Schema,
    future: boolean,
    privileges: Privilege[],
    role: Role,
    stage?: Stage,
    dependsOn?: Grant[]
  ) {
    super()
    this.schema = schema
    this.stage = stage
    this.future = future
    this.privileges = privileges
    this.role = role
    this.dependsOn = dependsOn
  }

  objectName(): string | undefined {
    return this.stage?.name
  }
}

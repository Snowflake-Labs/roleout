import {View} from '../objects/view'
import {Schema} from '../objects/schema'
import {Role} from '../roles/role'
import {Privilege} from '../privilege'
import {SchemaObjectGrant} from './schemaObjectGrant'
import {Grant} from './grant'
import {MaterializedView} from '../objects/materializedView'
import {SchemaObjectType} from '../objects/objects'

export class MaterializedViewGrant extends SchemaObjectGrant {
  schema: Schema
  materializedView?: View
  future: boolean
  privileges: Privilege[]
  role: Role
  dependsOn?: Grant[]
  objectType = SchemaObjectType.MATERIALIZED_VIEW

  constructor(
    schema: Schema,
    future: boolean,
    privileges: Privilege[],
    role: Role,
    materializedView?: MaterializedView,
    dependsOn?: Grant[]
  ) {
    super()
    this.schema = schema
    this.materializedView = materializedView
    this.future = future
    this.privileges = privileges
    this.role = role
    this.dependsOn = dependsOn
  }

  objectName(): string | undefined {
    return this.materializedView?.name
  }
}

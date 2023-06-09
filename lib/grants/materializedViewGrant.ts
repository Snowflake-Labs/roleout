import {View} from '../objects/view'
import {Schema} from '../objects/schema'
import {Role} from '../roles/role'
import {Privilege} from '../privilege'
import {SchemaObjectGrant, SchemaObjectGrantKind} from './schemaObjectGrant'
import {Grant} from './grant'
import {MaterializedView} from '../objects/materializedView'

export class MaterializedViewGrant extends SchemaObjectGrant {
  schema: Schema
  materializedView?: View
  future: boolean
  privilege: Privilege
  role: Role
  dependsOn?: Grant[]
  kind: SchemaObjectGrantKind = 'materialized_view'

  constructor(
    schema: Schema,
    future: boolean,
    privilege: Privilege,
    role: Role,
    materializedView?: MaterializedView,
    dependsOn?: Grant[]
  ) {
    super()
    this.schema = schema
    this.materializedView = materializedView
    this.future = future
    this.privilege = privilege
    this.role = role
    this.dependsOn = dependsOn
  }

  objectName(): string | undefined {
    return this.materializedView?.name
  }
}

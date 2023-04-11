import {View} from '../objects/view'
import {Schema} from '../objects/schema'
import {Role} from '../roles/role'
import {Privilege} from '../privilege'
import {SchemaObjectGrant, SchemaObjectGrantKind} from './schemaObjectGrant'
import {Grant} from './grant'

export class ViewGrant extends SchemaObjectGrant {
  schema: Schema
  view?: View
  future: boolean
  privilege: Privilege
  role: Role
  dependsOn?: Grant[]
  kind: SchemaObjectGrantKind = 'view'

  constructor(
    schema: Schema,
    future: boolean,
    privilege: Privilege,
    role: Role,
    view?: View,
    dependsOn?: Grant[]
  ) {
    super()
    this.schema = schema
    this.view = view
    this.future = future
    this.privilege = privilege
    this.role = role
    this.dependsOn = dependsOn
  }

  objectName(): string | undefined {
    return this.view?.name
  }
}

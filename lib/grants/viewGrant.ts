import {View} from '../objects/view'
import {Schema} from '../objects/schema'
import {Role} from '../roles/role'
import {Privilege} from '../privilege'
import {SchemaObjectGrant} from './schemaObjectGrant'
import {Grant} from './grant'
import {SchemaObjectType} from '../objects/objects'

export class ViewGrant extends SchemaObjectGrant {
  schema: Schema
  view?: View
  future: boolean
  privileges: Privilege[]
  role: Role
  dependsOn?: Grant[]
  objectType = SchemaObjectType.VIEW

  constructor(
    schema: Schema,
    future: boolean,
    privileges: Privilege[],
    role: Role,
    view?: View,
    dependsOn?: Grant[]
  ) {
    super()
    this.schema = schema
    this.view = view
    this.future = future
    this.privileges = privileges
    this.role = role
    this.dependsOn = dependsOn
  }

  objectName(): string | undefined {
    return this.view?.name
  }
}

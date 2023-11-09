import {Schema} from '../objects/schema'
import {Role} from '../roles/role'
import {Privilege} from '../privilege'
import {Grant, GrantType} from './grant'
import {SchemaObjectType} from '../objects/objects'

export abstract class SchemaObjectGrant implements Grant {
  abstract schema: Schema
  abstract future: boolean
  abstract privileges: Privilege[]
  abstract role: Role
  abstract dependsOn?: Grant[]
  type: GrantType = 'SchemaObjectGrant'
  abstract objectType: SchemaObjectType

  abstract objectName(): string | undefined

  toString(): string {
    return `${this.schema.database.name}.${this.schema.name} ${this.future ? 'future' : ''} ${this.privileges.map(p => p.toString())} on ${this.objectType} to role ${this.role.name}`
  }
}


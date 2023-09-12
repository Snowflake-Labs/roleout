import {Grant, GrantType} from './grant'
import {Database} from '../objects/database'
import {Privilege} from '../privilege'
import {Role} from '../roles/role'
import {SchemaObjectGrantKind} from './schemaObjectGrant'

export abstract class DatabaseSchemaObjectsGrant implements Grant {
  database: Database
  future: boolean
  privilege: Privilege
  role: Role
  type: GrantType = 'DatabaseSchemaObjectsGrant'
  abstract kind: SchemaObjectGrantKind

  constructor(
    database: Database,
    future: boolean,
    privilege: Privilege,
    role: Role,
  ) {
    this.database = database
    this.future = future
    this.privilege = privilege
    this.role = role
  }
}

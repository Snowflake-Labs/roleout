import {Role} from '../roles/role'
import {Grant, GrantKind, GrantType} from './grant'
import {Privilege} from '../privilege'
import {Database} from '../objects/database'

export class DatabaseSchemataGrant implements Grant {
  database: Database
  future: boolean
  privilege: Privilege
  role: Role
  type: GrantType = 'DatabaseSchemataGrant'
  kind: GrantKind = 'schema'

  constructor(database: Database, future: boolean, privilege: Privilege, role: Role) {
    this.database = database
    this.privilege = privilege
    this.role = role
    this.future = future
  }
}

import { Database } from '../objects/database'
import { Role } from '../roles/role'
import {Grant, GrantKind, GrantType} from './grant'
import { Privilege } from '../privilege'

export class DatabaseGrant implements Grant {
  database: Database
  privilege: Privilege
  role: Role
  type: GrantType = 'DatabaseGrant'
  kind: GrantKind = 'database'

  constructor(database: Database, privilege: Privilege, role: Role) {
    this.database = database
    this.privilege = privilege
    this.role = role
  }
}

import { Database } from '../objects/database'
import { Role } from '../roles/role'
import {Grant, GrantKind, GrantType} from './grant'
import { Privilege } from '../privilege'

export class DatabaseGrant implements Grant {
  database: Database
  privileges: Privilege[]
  role: Role
  type: GrantType = 'DatabaseGrant'
  kind: GrantKind = 'database'

  constructor(database: Database, privileges: Privilege[], role: Role) {
    this.database = database
    this.privileges = privileges
    this.role = role
  }
}

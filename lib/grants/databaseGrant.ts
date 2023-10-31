import {Database} from '../objects/database'
import {Role} from '../roles/role'
import {Grant, GrantType} from './grant'
import {Privilege} from '../privilege'
import {AccountObjectType} from '../objects/objects'

export class DatabaseGrant implements Grant {
  database: Database
  privileges: Privilege[]
  role: Role
  type: GrantType = 'DatabaseGrant'
  objectType = AccountObjectType.DATABASE

  constructor(database: Database, privileges: Privilege[], role: Role) {
    this.database = database
    this.privileges = privileges
    this.role = role
  }
}

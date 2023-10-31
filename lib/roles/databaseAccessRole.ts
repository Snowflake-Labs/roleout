import {AccessRole} from './accessRole'
import {DataAccessLevel, dataAccessLevelShortName} from '../access/dataAccessLevel'
import {Grant} from '../grants/grant'
import {Privilege} from '../privilege'
import {NamingConvention} from '../namingConvention'
import Mustache from 'mustache'
import {DatabaseGrant} from '../grants/databaseGrant'
import {Database} from '../objects/database'

export class DatabaseAccessRole implements AccessRole {
  database: Database
  name: string
  accessLevel: DataAccessLevel
  grants: Grant[]

  constructor(
    database: Database,
    level: DataAccessLevel,
    namingConvention: NamingConvention,
  ) {
    this.database = database
    this.accessLevel = level
    this.grants = [new DatabaseGrant(this.database, [Privilege.USAGE], this)]
    this.name = this.generateName(namingConvention)
  }

  private generateName(namingConvention: NamingConvention): string {
    return Mustache.render(namingConvention.databaseAccessRole, {
      database: this.database.name,
      levelShort: dataAccessLevelShortName(this.accessLevel),
    })
  }
}

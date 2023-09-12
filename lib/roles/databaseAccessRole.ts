import {AccessRole} from './accessRole'
import {DataAccessLevel, dataAccessLevelShortName} from '../access/dataAccessLevel'
import {Grant} from '../grants/grant'
import {Privilege} from '../privilege'
import {NamingConvention} from '../namingConvention'
import Mustache from 'mustache'
import {DatabaseGrant} from '../grants/databaseGrant'
import {Database} from '../objects/database'
import {DatabaseTablesGrant} from '../grants/databaseTablesGrant'
import {DatabaseSchemataGrant} from '../grants/databaseSchemataGrant'
import {DatabaseViewsGrant} from '../grants/databaseViewsGrant'
import {DatabaseSequencesGrant} from '../grants/databaseSequencesGrant'
import {DatabaseStagesGrant} from '../grants/databaseStagesGrant'
import {DatabaseFileFormatsGrant} from '../grants/databaseFileFormatsGrant'
import {DatabaseStreamsGrant} from '../grants/databaseStreamsGrant'
import {DatabaseProceduresGrant} from '../grants/databaseProceduresGrant'
import {DatabaseUserDefinedFunctionsGrant} from '../grants/databaseUserDefinedFunctionsGrant'
import {DatabaseMaterializedViewsGrant} from '../grants/databaseMaterializedViewsGrant'
import {DatabaseTasksGrant} from '../grants/databaseTasksGrant'

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
    this.grants = this.buildGrants()
    this.name = this.generateName(namingConvention)
  }

  private generateName(namingConvention: NamingConvention): string {
    return Mustache.render(namingConvention.databaseAccessRole, {
      database: this.database.name,
      levelShort: dataAccessLevelShortName(this.accessLevel),
    })
  }

  private buildGrants(): Grant[] {
    const readGrants = () => [new DatabaseGrant(this.database, Privilege.USAGE, this)].concat([false, true].flatMap((future) => {
      return [
        new DatabaseSchemataGrant(this.database, future, Privilege.USAGE, this),
        new DatabaseTablesGrant(this.database, future, Privilege.SELECT, this),
        new DatabaseViewsGrant(this.database, future, Privilege.SELECT, this),
        new DatabaseSequencesGrant(this.database, future, Privilege.USAGE, this),
        new DatabaseStagesGrant(this.database, future, Privilege.USAGE, this),
        new DatabaseStagesGrant(this.database, future, Privilege.READ, this),
        new DatabaseFileFormatsGrant(this.database, future, Privilege.USAGE, this),
        new DatabaseStreamsGrant(this.database, future, Privilege.SELECT, this),
        new DatabaseProceduresGrant(this.database, future, Privilege.USAGE, this),
        new DatabaseUserDefinedFunctionsGrant(this.database, future, Privilege.USAGE, this),
        new DatabaseMaterializedViewsGrant(this.database, future, Privilege.SELECT, this),
      ]
    }))

    const readWriteGrants = () => readGrants().concat([false, true].flatMap((future) => {
      return [
        new DatabaseTablesGrant(this.database, future, Privilege.INSERT, this),
        new DatabaseTablesGrant(this.database, future, Privilege.UPDATE, this),
        new DatabaseTablesGrant(this.database, future, Privilege.DELETE, this),
        new DatabaseTablesGrant(this.database, future, Privilege.REFERENCES, this),
        new DatabaseStagesGrant(this.database, future, Privilege.WRITE, this),
        new DatabaseTasksGrant(this.database, future, Privilege.MONITOR, this),
        new DatabaseTasksGrant(this.database, future, Privilege.OPERATE, this),
      ]
    }))

    switch (this.accessLevel) {
    case DataAccessLevel.Read:
      return readGrants()
    case DataAccessLevel.ReadWrite:
      return readWriteGrants()
    case DataAccessLevel.Full:
      throw new Error('Full access is unsupported on databases')
    }
  }
}

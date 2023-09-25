import {Schema} from './schema'
import {NamingConvention} from '../namingConvention'
import {SchemaAccessRole} from '../roles/schemaAccessRole'
import {DataAccessLevel} from '../access/dataAccessLevel'
import {DatabaseAccessRole} from '../roles/databaseAccessRole'
import {DataAccess} from '../access/dataAccess'
import {FunctionalRole} from '../roles/functionalRole'

export interface DatabaseOptions {
  transient: boolean
  dataRetentionTimeInDays?: number
}

export const defaultDatabaseOptions: DatabaseOptions = {
  transient: false,
  dataRetentionTimeInDays: undefined
}

export class Database implements DatabaseOptions {
  name: string
  schemata: Schema[]
  access: DataAccess
  transient: boolean
  dataRetentionTimeInDays?: number

  constructor(name: string, options: DatabaseOptions = defaultDatabaseOptions) {
    this.name = name
    this.schemata = []
    this.access = new Map<FunctionalRole, DataAccessLevel>()
    this.transient = options.transient
    this.dataRetentionTimeInDays = options.dataRetentionTimeInDays
  }

  equals(other: Database) {
    return this.name === other.name
  }

  accessRoles(namingConvention: NamingConvention): DatabaseAccessRole[] {
    return [DataAccessLevel.Read, DataAccessLevel.ReadWrite, DataAccessLevel.Full].map(
      (level) => new DatabaseAccessRole(this, level, namingConvention)
    )
  }

  toRecord() {
    return {
      name: this.name,
      options: {
        transient: this.transient,
        dataRetentionTimeInDays: this.dataRetentionTimeInDays
      },
      schemata: this.schemata.map(s => s.toRecord())
    }
  }
}

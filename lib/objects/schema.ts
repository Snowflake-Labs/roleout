import {Database} from './database'
import {Table} from './table'
import {DataAccess} from '../access/dataAccess'
import {SchemaAccessRole} from '../roles/schemaAccessRole'
import {DataAccessLevel} from '../access/dataAccessLevel'
import {NamingConvention} from '../namingConvention'
import {FunctionalRole} from '../roles/functionalRole'
import {VirtualWarehouseAccessLevel} from '../access/virtualWarehouseAccessLevel'

export interface SchemaOptions {
  managedAccess: boolean
  transient: boolean
  dataRetentionTimeInDays?: number
}

export const defaultSchemaOptions: SchemaOptions = {
  managedAccess: true,
  transient: false,
  dataRetentionTimeInDays: undefined
}

export class Schema implements SchemaOptions {
  name: string
  database: Database
  access: DataAccess
  managedAccess: boolean
  transient: boolean
  dataRetentionTimeInDays?: number

  constructor(name: string, database: Database, options: SchemaOptions = defaultSchemaOptions) {
    this.name = name
    this.database = database
    this.access = new Map<FunctionalRole, DataAccessLevel>()
    this.managedAccess = options.managedAccess
    this.transient = options.transient
    this.dataRetentionTimeInDays = options.dataRetentionTimeInDays
  }

  accessRoles(namingConvention: NamingConvention): SchemaAccessRole[] {
    return [DataAccessLevel.Read, DataAccessLevel.ReadWrite, DataAccessLevel.Full].map(
      (level) => new SchemaAccessRole(this, level, namingConvention)
    )
  }

  toRecord() {
    const accessRecords = Array(...this.access.entries()).map(([role, level]) => {
      return {role: role.name, level: DataAccessLevel[level]}
    })
    return {
      name: this.name,
      options: {
        transient: this.transient,
        dataRetentionTimeInDays: this.dataRetentionTimeInDays,
        managedAccess: this.managedAccess
      },
      access: accessRecords
    }
  }
}

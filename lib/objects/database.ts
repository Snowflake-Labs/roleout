import {Schema} from './schema'

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
  transient: boolean
  dataRetentionTimeInDays?: number

  constructor(name: string, options: DatabaseOptions = defaultDatabaseOptions) {
    this.name = name
    this.schemata = []
    this.transient = options.transient
    this.dataRetentionTimeInDays = options.dataRetentionTimeInDays
  }

  equals(other: Database) {
    return this.name === other.name
  }
}

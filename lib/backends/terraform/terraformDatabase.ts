import {TerraformResource} from './terraformResource'
import {TerraformBackend} from '../terraformBackend'
import {Database, DatabaseOptions} from '../../objects/database'
import {compact} from 'lodash'
import standardizeIdentifierForResource from './standardizeIdentifierForResource'

export class TerraformDatabase implements TerraformResource, DatabaseOptions {
  name: string
  transient: boolean
  dataRetentionTimeInDays?: number

  constructor(name: string, transient: boolean, dataRetentionTimeInDays?: number) {
    this.name = name
    this.transient = transient
    this.dataRetentionTimeInDays = dataRetentionTimeInDays
  }

  resourceType = 'snowflake_database'

  resourceName(): string {
    return standardizeIdentifierForResource(this.name)
  }

  resourceID(): string {
    return this.name
  }

  resourceBlock(): string {
    const spacing = TerraformBackend.SPACING

    return compact([
      `resource ${this.resourceType} ${this.resourceName()} {`,
      spacing + 'provider = snowflake.sysadmin',
      spacing + `name = "${this.name}"`,
      this.transient !== undefined ? spacing + `is_transient = ${this.transient}` : null,
      this.dataRetentionTimeInDays !== undefined ? spacing + `data_retention_time_in_days = ${this.dataRetentionTimeInDays}` : null,
      '}',
    ]).join('\n')
  }

  static fromDatabase(database: Database): TerraformDatabase {
    return new TerraformDatabase(database.name, database.transient, database.dataRetentionTimeInDays)
  }
}

export function isTerraformDatabase(obj: Database | TerraformDatabase): obj is TerraformDatabase {
  return 'resourceType' in obj && obj.resourceType === 'snowflake_database'
}


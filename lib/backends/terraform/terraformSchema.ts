import {TerraformResource} from './terraformResource'
import {TerraformDatabase} from './terraformDatabase'
import {TerraformBackend} from '../terraformBackend'
import {Schema, SchemaOptions} from '../../objects/schema'
import {compact} from 'lodash'
import standardizeIdentifierForResource from './standardizeIdentifierForResource'

export class TerraformSchema implements TerraformResource, SchemaOptions {
  name: string
  database: TerraformDatabase
  managedAccess: boolean
  transient: boolean
  dataRetentionTimeInDays?: number

  constructor(name: string, database: TerraformDatabase, managedAccess: boolean, transient: boolean, dataRetentionTimeInDays?: number) {
    this.name = name
    this.database = database
    this.managedAccess = managedAccess
    this.transient = transient
    this.dataRetentionTimeInDays = dataRetentionTimeInDays
  }

  resourceType = 'snowflake_schema'

  resourceName(): string {
    const standardDatabaseName = standardizeIdentifierForResource(this.database.name)
    const standardSchemaName = standardizeIdentifierForResource(this.name)
    return standardDatabaseName + '__' + standardSchemaName
  }

  resourceID(): string {
    // database|schema
    return `${this.database.name}|${this.name}`
  }

  resourceBlock(): string {
    const spacing = TerraformBackend.SPACING

    return compact([
      `resource ${this.resourceType} ${this.resourceName()} {`,
      spacing + 'provider = snowflake.sysadmin',
      spacing + `database = snowflake_database.${this.database.resourceName()}.name`,
      spacing + `name = "${this.name}"`,
      spacing + `is_managed = ${this.managedAccess}`,
      this.transient !== undefined ? spacing + `is_transient = ${this.transient}` : null,
      this.dataRetentionTimeInDays !== undefined ? spacing + `data_retention_days = ${this.dataRetentionTimeInDays}` : null,
      '}',
    ]).join('\n')
  }

  qualifiedName(): string {
    return `"${this.database.name}"."${this.name}"`
  }

  static fromSchema(schema: Schema): TerraformSchema {
    return new TerraformSchema(schema.name, TerraformDatabase.fromDatabase(schema.database), schema.managedAccess, schema.transient, schema.dataRetentionTimeInDays)
  }
}


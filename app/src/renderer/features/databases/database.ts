import {DatabaseOptions} from 'roleout-lib/build/objects/database'
import {Schema} from '../schema/schema'
import {EnvironmentOptions} from '../options/options'
import {DataAccess} from '../access/dataAccess'

export interface Database {
  readonly name: string
  readonly access: { [role: string]: DataAccess[] }
  readonly schemata: Schema[]
  readonly options: DatabaseOptions
  readonly environmentOptions: EnvironmentOptions<DatabaseOptions>
}
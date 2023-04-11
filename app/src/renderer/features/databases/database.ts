import {DatabaseOptions} from 'roleout-lib/build/objects/database'
import {Schema} from '../schema/schema'
import {EnvironmentOptions} from '../options/options'

export interface Database {
  readonly name: string
  readonly schemata: Schema[]
  readonly options: DatabaseOptions
  readonly environmentOptions: EnvironmentOptions<DatabaseOptions>
}
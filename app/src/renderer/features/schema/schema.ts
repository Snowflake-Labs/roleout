import {DataAccess} from '../access/dataAccess'
import {SchemaOptions} from 'roleout-lib/build/objects/schema'
import {EnvironmentOptions} from '../options/options'

export interface Schema {
  readonly name: string
  readonly access: { [role: string]: DataAccess[] }
  readonly options: SchemaOptions
  readonly environmentOptions: EnvironmentOptions<SchemaOptions>
}
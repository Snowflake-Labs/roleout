import { Schema } from './schema'

export class UserDefinedFunction {
  name: string
  schema: Schema

  constructor(name: string, schema: Schema) {
    this.name = name
    this.schema = schema
  }
}

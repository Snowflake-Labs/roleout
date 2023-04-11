import { Schema } from './schema'

export class View {
  name: string
  schema: Schema

  constructor(name: string, schema: Schema) {
    this.name = name
    this.schema = schema
  }
}

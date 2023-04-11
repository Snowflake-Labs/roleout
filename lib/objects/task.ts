import { Schema } from './schema'

export class Task {
  name: string
  schema: Schema

  constructor(name: string, schema: Schema) {
    this.name = name
    this.schema = schema
  }
}

import {FileFormat} from '../objects/fileFormat'
import {Schema} from '../objects/schema'
import {Role} from '../roles/role'
import {Privilege} from '../privilege'
import {SchemaObjectGrant} from './schemaObjectGrant'
import {Grant} from './grant'
import {SchemaObjectType} from '../objects/objects'

export class FileFormatGrant extends SchemaObjectGrant {
  schema: Schema
  fileFormat?: FileFormat
  future: boolean
  privileges: Privilege[]
  role: Role
  dependsOn?: Grant[]
  objectType = SchemaObjectType.FILE_FORMAT

  constructor(
    schema: Schema,
    future: boolean,
    privileges: Privilege[],
    role: Role,
    fileFormat?: FileFormat,
    dependsOn?: Grant[]
  ) {
    super()
    this.schema = schema
    this.fileFormat = fileFormat
    this.future = future
    this.privileges = privileges
    this.role = role
    this.dependsOn = dependsOn
  }

  objectName(): string | undefined {
    return this.fileFormat?.name
  }
}

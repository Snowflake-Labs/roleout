import {FileFormat} from '../objects/fileFormat'
import {Schema} from '../objects/schema'
import {Role} from '../roles/role'
import {Privilege} from '../privilege'
import {SchemaObjectGrant, SchemaObjectGrantKind} from './schemaObjectGrant'
import {Grant} from './grant'

export class FileFormatGrant extends SchemaObjectGrant {
  schema: Schema
  fileFormat?: FileFormat
  future: boolean
  privilege: Privilege
  role: Role
  dependsOn?: Grant[]
  kind: SchemaObjectGrantKind = 'file_format'

  constructor(
    schema: Schema,
    future: boolean,
    privilege: Privilege,
    role: Role,
    fileFormat?: FileFormat,
    dependsOn?: Grant[]
  ) {
    super()
    this.schema = schema
    this.fileFormat = fileFormat
    this.future = future
    this.privilege = privilege
    this.role = role
    this.dependsOn = dependsOn
  }

  objectName(): string | undefined {
    return this.fileFormat?.name
  }
}

import {SchemaObjectGrantKind} from './schemaObjectGrant'
import {DatabaseSchemaObjectsGrant} from './databaseSchemaObjectsGrant'

export class DatabaseFileFormatsGrant extends DatabaseSchemaObjectsGrant {
  kind: SchemaObjectGrantKind = 'file_format'
}

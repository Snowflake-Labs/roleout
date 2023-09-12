import {SchemaObjectGrantKind} from './schemaObjectGrant'
import {DatabaseSchemaObjectsGrant} from './databaseSchemaObjectsGrant'

export class DatabaseStreamsGrant extends DatabaseSchemaObjectsGrant {
  kind: SchemaObjectGrantKind = 'stream'
}

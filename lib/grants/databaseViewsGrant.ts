import {SchemaObjectGrantKind} from './schemaObjectGrant'
import {DatabaseSchemaObjectsGrant} from './databaseSchemaObjectsGrant'

export class DatabaseViewsGrant extends DatabaseSchemaObjectsGrant {
  kind: SchemaObjectGrantKind = 'view'
}

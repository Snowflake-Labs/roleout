import {SchemaObjectGrantKind} from './schemaObjectGrant'
import {DatabaseSchemaObjectsGrant} from './databaseSchemaObjectsGrant'

export class DatabaseMaterializedViewsGrant extends DatabaseSchemaObjectsGrant {
  kind: SchemaObjectGrantKind = 'materialized_view'
}

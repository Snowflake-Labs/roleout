import {SchemaObjectGrantKind} from './schemaObjectGrant'
import {DatabaseSchemaObjectsGrant} from './databaseSchemaObjectsGrant'

export class DatabaseTablesGrant extends DatabaseSchemaObjectsGrant {
  kind: SchemaObjectGrantKind = 'table'
}

import {SchemaObjectGrantKind} from './schemaObjectGrant'
import {DatabaseSchemaObjectsGrant} from './databaseSchemaObjectsGrant'

export class DatabaseProceduresGrant extends DatabaseSchemaObjectsGrant {
  kind: SchemaObjectGrantKind = 'procedure'
}

import {SchemaObjectGrantKind} from './schemaObjectGrant'
import {DatabaseSchemaObjectsGrant} from './databaseSchemaObjectsGrant'

export class DatabaseTasksGrant extends DatabaseSchemaObjectsGrant {
  kind: SchemaObjectGrantKind = 'task'
}

import {SchemaObjectGrantKind} from './schemaObjectGrant'
import {DatabaseSchemaObjectsGrant} from './databaseSchemaObjectsGrant'

export class DatabaseStagesGrant extends DatabaseSchemaObjectsGrant {
  kind: SchemaObjectGrantKind = 'stage'
}

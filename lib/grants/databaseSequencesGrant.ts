import {SchemaObjectGrantKind} from './schemaObjectGrant'
import {DatabaseSchemaObjectsGrant} from './databaseSchemaObjectsGrant'

export class DatabaseSequencesGrant extends DatabaseSchemaObjectsGrant {
  kind: SchemaObjectGrantKind = 'sequence'
}

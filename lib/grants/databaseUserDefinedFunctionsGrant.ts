import {SchemaObjectGrantKind} from './schemaObjectGrant'
import {DatabaseSchemaObjectsGrant} from './databaseSchemaObjectsGrant'

export class DatabaseUserDefinedFunctionsGrant extends DatabaseSchemaObjectsGrant {
  kind: SchemaObjectGrantKind = 'function'
}

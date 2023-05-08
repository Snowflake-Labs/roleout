import {SchemaObjectGrantKind} from '../../grants/schemaObjectGrant'

export const TERRAFORM_VERSION = '0.63.0'
export const ON_ALL_SUPPORTED_RESOURCES: SchemaObjectGrantKind[] = [
  'view', 'table', 'stage', 'materialized_view', 'schema'
]
export const NO_SHARES_IN_ID_RESOURCES: SchemaObjectGrantKind[] = [
  'file_format', 'pipe', 'sequence', 'stage', 'stream', 'task'
]
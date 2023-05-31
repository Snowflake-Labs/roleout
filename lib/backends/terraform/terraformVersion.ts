import {SchemaObjectGrantKind} from '../../grants/schemaObjectGrant'

export const TERRAFORM_VERSION = '0.64.0'

export const NO_SHARES_IN_ID_RESOURCES: SchemaObjectGrantKind[] = [
  'file_format', 'sequence', 'stage', 'stream', 'task'
]
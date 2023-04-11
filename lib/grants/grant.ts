import { Privilege } from '../privilege'
import { Role } from '../roles/role'
import {SchemaObjectGrant, SchemaObjectGrantKind} from './schemaObjectGrant'
import {SchemaGrant} from './schemaGrant'
import {DatabaseGrant} from './databaseGrant'
import {VirtualWarehouseGrant} from './virtualWarehouseGrant'

export type GrantType = 'SchemaObjectGrant' | 'SchemaGrant' | 'DatabaseGrant' | 'VirtualWarehouseGrant'
export type GrantKind = SchemaObjectGrantKind | 'schema' | 'database' | 'virtual_warehouse'

export interface Grant {
  privilege: Privilege
  role: Role
  type: GrantType
  kind: GrantKind
}

export function isSchemaObjectGrant(obj: any): obj is SchemaObjectGrant {
  return 'type' in obj && obj.type === 'SchemaObjectGrant'
}

export function isSchemaGrant(obj: any): obj is SchemaGrant {
  return 'type' in obj && obj.type === 'SchemaGrant'
}

export function isDatabaseGrant(obj: any): obj is DatabaseGrant {
  return 'type' in obj && obj.type === 'DatabaseGrant'
}

export function isVirtualWarehouseGrant(obj: any): obj is VirtualWarehouseGrant {
  return 'type' in obj && obj.type === 'VirtualWarehouseGrant'
}

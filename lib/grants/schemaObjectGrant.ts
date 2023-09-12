import {Schema} from '../objects/schema'
import {Role} from '../roles/role'
import {Privilege} from '../privilege'
import {Grant, GrantType} from './grant'
import {Database} from '../objects/database'

export const SchemaObjectGrantKinds = ['file_format', 'function', 'materialized_view', 'procedure', 'sequence', 'stage', 'stream', 'table', 'task', 'view']
export type SchemaObjectGrantKind = typeof SchemaObjectGrantKinds[number]

export abstract class SchemaObjectGrant implements Grant {
  abstract schema: Schema
  abstract future: boolean
  abstract privilege: Privilege
  abstract role: Role
  abstract dependsOn?: Grant[]
  type: GrantType = 'SchemaObjectGrant'
  abstract kind: SchemaObjectGrantKind

  abstract objectName(): string | undefined
}


import {TerraformResource} from './terraformResource'
import {immerable} from 'immer'
import {NamingConvention} from '../../namingConvention'
import {
  Grant,
  GrantKind, isSchemaObjectGrant
} from '../../grants/grant'
import {Role} from '../../roles/role'
import {TerraformRole} from './terraformRole'
import {Privilege} from '../../privilege'
import {SchemaObjectType, SnowflakeObjectType} from '../../objects/objects'
import {TerraformDatabase} from './terraformDatabase'
import {TerraformVirtualWarehouse} from './terraformVirtualWarehouse'
import {TerraformSchema} from './terraformSchema'

export type TerraformAccountObject = TerraformDatabase | TerraformVirtualWarehouse

export type OnAccountObject = {
  object: TerraformAccountObject
  objectType: SnowflakeObjectType
}

export type OnSchema = {
  allSchemasInDatabase?: TerraformDatabase
  futureSchemasInDatabase?: TerraformDatabase
  schema?: TerraformSchema
}

export type OnSchemaObjectAll = {
  objectType: SchemaObjectType
  inDatabase: TerraformDatabase
  inSchema: TerraformSchema
}

export type OnSchemaObjectFuture = OnSchemaObjectAll

export type OnSchemaObject = {
  all?: OnSchemaObjectAll
  future?: OnSchemaObjectFuture
}

export type Props = {
  allPrivileges?: boolean
  onAccount?: boolean
  onAccountObject?: OnAccountObject
  onSchema?: OnSchema
  onSchemaObject?: OnSchemaObject
  privileges?: Privilege[]
  withGrantOption?: boolean
}

export abstract class TerraformPrivilegesGrant implements TerraformResource {
  [immerable] = true

  type = 'TerraformPrivilegesGrant'
  role: TerraformRole | Role
  props: Props

  protected constructor(role: TerraformRole | Role, props: Props) {
    this.role = role
    this.props = props
  }

  resourceType(): string {
    return 'snowflake_grant_privileges_to_role'
  }

  resourceID(): string

  resourceBlock(namingConvention: NamingConvention): string

  uniqueKey(): string

  abstract resourceName(namingConvention: NamingConvention): string
}

export function isTerraformPrivilegesGrant(obj: any): obj is TerraformPrivilegesGrant {
  return 'kind' in obj && obj.type === 'TerraformPrivilegesGrant'
}

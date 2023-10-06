import {TerraformResource} from './terraformResource'
import {NamingConvention} from '../../namingConvention'
import {Role} from '../../roles/role'
import {TerraformRole} from './terraformRole'
import {SchemaObjectType, SnowflakeObjectType} from '../../objects/objects'
import {TerraformDatabase} from './terraformDatabase'
import {TerraformVirtualWarehouse} from './terraformVirtualWarehouse'
import {TerraformSchema} from './terraformSchema'
import {TerraformBackend} from '../terraformBackend'
import compact from 'lodash/compact'

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

export function onAccountObjectResourceBlock(obj: OnAccountObject, indents: number): string {
  const spacing = TerraformBackend.SPACING
  const indentation = spacing.repeat(indents)
  return [
    'on_account_object {',
    spacing + `object_type = "${obj.objectType}"`,
    spacing + `object_name = ${obj.object.resourceName}`,
    '}'
  ].map(line => indentation + line).join('\n')
}

export function onSchemaResourceBlock(onSchema: OnSchema, indents: number): string {
  const spacing = TerraformBackend.SPACING
  const indentation = spacing.repeat(indents)
  return compact([
    'on_schema {',
    onSchema.allSchemasInDatabase ? `all_schemas_in_database = snowflake_database.${onSchema.allSchemasInDatabase.resourceName()}.name` : null,
    onSchema.futureSchemasInDatabase ? `future_schemas_in_database = snowflake_database.${onSchema.futureSchemasInDatabase.resourceName()}.name` : null,
    onSchema.schema ? spacing + `schema_name = ${onSchema.schema.qualifiedName()}` : null,
    '}'
  ]).map(line => indentation + line).join('\n')
}


/*
export type Props = {
  allPrivileges?: boolean
  onAccount?: boolean
  onAccountObject?: OnAccountObject
  onSchema?: OnSchema
  onSchemaObject?: OnSchemaObject
  privileges?: Privilege[]
  withGrantOption?: boolean
  dependsOn?: TerraformResource[]
}

 */

export abstract class TerraformPrivilegesGrant implements TerraformResource {
  role: TerraformRole | Role

  protected constructor(role: TerraformRole | Role) {
    this.role = role
  }

  resourceType(): string {
    return 'snowflake_grant_privileges_to_role'
  }

  abstract resourceID(): string

  abstract resourceBlock(namingConvention: NamingConvention): string

  abstract resourceName(namingConvention: NamingConvention): string
}

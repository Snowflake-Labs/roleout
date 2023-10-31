import {TerraformResource} from './terraformResource'
import {NamingConvention} from '../../namingConvention'
import {Role} from '../../roles/role'
import {TerraformRole} from './terraformRole'
import {SchemaObjectType, SchemaObjectTypePlural, SnowflakeObjectType} from '../../objects/objects'
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
  objectTypePlural: SchemaObjectTypePlural
  inDatabase?: TerraformDatabase
  inSchema?: TerraformSchema
}

export type OnSchemaObjectFuture = OnSchemaObjectAll

export type OnSchemaObject = {
  objectType?: SchemaObjectType
  objectName?: string
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
    onSchema.schema ? spacing + `schema_name = "${onSchema.schema.qualifiedName()}"` : null,
    '}'
  ]).map(line => indentation + line).join('\n')
}

export function onSchemaObjectResourceBlock(onSchemaObject: OnSchemaObject, indents: number): string {
  const spacing = TerraformBackend.SPACING
  const indentation = spacing.repeat(indents)
  return compact([
    'on_schema_object {',
    onSchemaObject.all ? onSchemaObjectAllResourceBlock(onSchemaObject.all, indents + 1) : null,
    '}'
  ]).map(line => indentation + line).join('\n')
}

export function onSchemaObjectAllResourceBlock(onSchemaObjectAll: OnSchemaObjectAll, indents: number): string {
  const spacing = TerraformBackend.SPACING
  const indentation = spacing.repeat(indents)
  return compact([
    'all {',
    spacing + `object_type_plural = "${onSchemaObjectAll.objectTypePlural}"`,
    onSchemaObjectAll.inSchema ? spacing + `in_schema = "${onSchemaObjectAll.inSchema.qualifiedName()}"` : null,
    onSchemaObjectAll.inDatabase ? spacing + `in_database = "${onSchemaObjectAll.inDatabase.name}"` : null,
    '}'
  ]).map(line => indentation + line).join('\n')
}

export function onSchemaObjectFutureResourceBlock(onSchemaObjectFuture: OnSchemaObjectFuture, indents: number): string {
  const spacing = TerraformBackend.SPACING
  const indentation = spacing.repeat(indents)
  return compact([
    'future {',
    spacing + `object_type_plural = "${onSchemaObjectFuture.objectTypePlural}"`,
    onSchemaObjectFuture.inSchema ? spacing + `in_schema = "${onSchemaObjectFuture.inSchema.qualifiedName()}"` : null,
    onSchemaObjectFuture.inDatabase ? spacing + `in_database = "${onSchemaObjectFuture.inDatabase.name}"` : null,
    '}'
  ]).map(line => indentation + line).join('\n')
}


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

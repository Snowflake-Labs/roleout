import {immerable} from 'immer'
import {TerraformGrant} from './terraformGrant'
import {SchemaObjectGrant, SchemaObjectGrantKind} from '../../grants/schemaObjectGrant'
import {NamingConvention} from '../../namingConvention'
import {TerraformBackend} from '../terraformBackend'
import {TerraformDatabase} from './terraformDatabase'
import {TerraformSchema} from './terraformSchema'
import Mustache from 'mustache'
import {TerraformRole} from './terraformRole'
import {Role} from '../../roles/role'
import {terraformGrantFromGrant} from './helpers'
import {compact} from 'lodash'
import {TerraformResource} from './terraformResource'
import {NO_SHARES_IN_ID_RESOURCES} from './terraformVersion'
import standardizeIdentifierForResource from './standardizeIdentifierForResource'

export class TerraformSchemaObjectGrant extends TerraformGrant {
  [immerable] = true

  kind: SchemaObjectGrantKind
  objectName?: string
  database: TerraformDatabase
  schema: TerraformSchema
  privilege: string
  toRoles: Role[]
  toTerraformRoles: TerraformRole[]
  onFuture: boolean
  dependsOn: TerraformResource[]

  constructor(
    kind: SchemaObjectGrantKind,
    database: TerraformDatabase,
    schema: TerraformSchema,
    privilege: string,
    toRoles: Role[],
    toTerraformRoles: TerraformRole[],
    onFuture: boolean,
    dependsOn: TerraformResource[],
    objectName?: string
  ) {
    super()
    this.kind = kind
    this.objectName = objectName
    this.database = database
    this.schema = schema
    this.privilege = privilege
    this.toRoles = toRoles
    this.toTerraformRoles = toTerraformRoles
    this.onFuture = onFuture
    this.dependsOn = dependsOn
  }

  uniqueKey(): string {
    return compact([
      this.kind,
      this.database.name,
      this.schema.name,
      this.objectName,
      this.privilege,
      this.onFuture ? 'future' : 'current'
    ]).join('|')
  }

  resourceType(): string {
    return `snowflake_${this.kind}_grant`
  }

  resourceName(namingConvention: NamingConvention): string {
    return Mustache.render(namingConvention.terraformGrantResourceName, {
      database: standardizeIdentifierForResource(this.database.name),
      databaseLower: standardizeIdentifierForResource(this.database.name).toLowerCase(),
      schema: standardizeIdentifierForResource(this.schema.name),
      schemaLower: standardizeIdentifierForResource(this.schema.name).toLowerCase(),
      privilege: this.privilege,
      privilegeLower: this.privilege.toLowerCase(),
      kind: this.kind + 's',
      kindLower: this.kind.toLowerCase() + 's',
      future: this.onFuture,
      objectName: this.objectName
    })
  }

  resourceID(): string {
    if (['function', 'procedure'].includes(this.kind)) {
      //database_name|schema_name|object_name|argument_data_types|privilege|with_grant_option|on_future|roles
      //FIXME this can't currently actually grant on a specific procedure/function because we don't collect argument types
      return `${this.database.name}|${this.schema.name}|${this.objectName || ''}||${this.privilege}|false|${this.onFuture}|${this.toRoles.map(r => r.name).concat(this.toTerraformRoles.map(tr => tr.name)).join(',')}|`
    }

    if (NO_SHARES_IN_ID_RESOURCES.includes(this.kind)) {
      // no shares and on_all
      //database_name|schema_name|object_name|privilege|with_grant_option|on_future|on_all|roles
      return `${this.database.name}|${this.schema.name}|${this.objectName || ''}|${this.privilege}|false|${this.onFuture}|${this.onAll()}|${this.toRoles.map(r => r.name).concat(this.toTerraformRoles.map(tr => tr.name)).join(',')}`
    }

    // shares and on_all
    // database_name|schema_name|object_name|privilege|with_grant_option|on_future|on_all|roles|shares
    return `${this.database.name}|${this.schema.name}|${this.objectName || ''}|${this.privilege}|false|${this.onFuture}|${this.onAll()}|${this.toRoles.map(r => r.name).concat(this.toTerraformRoles.map(tr => tr.name)).join(',')}|`
  }

  resourceBlock(namingConvention: NamingConvention): string {
    const spacing = TerraformBackend.SPACING

    const roles = this.roleAndRoleResourceStrings().join(', ')
    const dependsOn = this.dependsOn.map(r => `${r.resourceType()}.${r.resourceName(namingConvention)}`).join(', ')

    // future grant on all
    if (this.onFuture) return compact([
      `resource ${this.resourceType()} ${this.resourceName(namingConvention)} {`,
      spacing + `database_name = snowflake_database.${this.database.resourceName()}.name`,
      spacing + `schema_name = snowflake_schema.${this.schema.resourceName()}.name\n`,
      spacing + `privilege = "${this.privilege}"`,
      spacing + `roles = [${roles}]\n`,
      spacing + 'on_future = true',
      spacing + 'with_grant_option = false',
      spacing + 'enable_multiple_grants = true',
      dependsOn.length > 0 ? spacing + `depends_on = [${dependsOn}]` : null,
      '}',
    ]).join('\n')

    // current grant on single object
    if (this.objectName) return compact([
      `resource ${this.resourceType()} ${this.resourceName(namingConvention)} {`,
      spacing + `database_name = snowflake_database.${this.database.resourceName()}.name`,
      spacing + `schema_name = snowflake_schema.${this.schema.resourceName()}.name`,
      spacing + `${this.kind}_name = "${this.objectName}"`,
      spacing + `privilege = "${this.privilege}"`,
      spacing + `roles = [${roles}]\n`,
      spacing + 'with_grant_option = false',
      spacing + 'enable_multiple_grants = true',
      dependsOn.length > 0 ? spacing + `depends_on = [${dependsOn}]` : null,
      '}',
    ]).join('\n')

    // current grant on all
    return compact([
      `resource ${this.resourceType()} ${this.resourceName(namingConvention)} {`,
      spacing + `database_name = snowflake_database.${this.database.resourceName()}.name`,
      spacing + `schema_name = snowflake_schema.${this.schema.resourceName()}.name`,
      spacing + `privilege = "${this.privilege}"`,
      spacing + `roles = [${roles}]`,
      spacing + 'enable_multiple_grants = true',
      spacing + 'on_all = true',
      dependsOn.length > 0 ? spacing + `depends_on = [${dependsOn}]` : null,
      '}'
    ]).join('\n')
  }

  onAll(): boolean {
    return !this.onFuture && !this.objectName
  }

  static fromSchemaObjectGrant(grant: SchemaObjectGrant, dependsOn: TerraformResource[] = []): TerraformSchemaObjectGrant {
    return new TerraformSchemaObjectGrant(
      grant.kind,
      TerraformDatabase.fromDatabase(grant.schema.database),
      TerraformSchema.fromSchema(grant.schema),
      grant.privilege,
      [],
      [TerraformRole.fromRole(grant.role)],
      grant.future,
      grant.dependsOn ? grant.dependsOn.map(sog => terraformGrantFromGrant(sog)).concat(dependsOn) : dependsOn,
      grant.objectName()
    )
  }
}

export function isTerraformSchemaObjectGrant(obj: TerraformResource): obj is TerraformSchemaObjectGrant {
  return (obj as TerraformSchemaObjectGrant).kind !== undefined
}

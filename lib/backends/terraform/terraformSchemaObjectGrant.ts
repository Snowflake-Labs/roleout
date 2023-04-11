import {immerable} from 'immer'
import {TerraformGrant} from './terraformGrant'
import {SchemaObjectGrant, SchemaObjectGrantKind} from '../../grants/schemaObjectGrant'
import {NamingConvention} from '../../namingConvention'
import {TerraformBackend} from '../terraformBackend'
import {TerraformDatabase} from './terraformDatabase'
import {TerraformSchema} from './terraformSchema'
import {Privilege} from '../../privilege'
import Mustache from 'mustache'
import {TerraformRole} from './terraformRole'
import {Role} from '../../roles/role'
import {terraformGrantFromGrant} from './helpers'
import {compact} from 'lodash'

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
  dependsOn: TerraformGrant[]

  constructor(
    kind: SchemaObjectGrantKind,
    database: TerraformDatabase,
    schema: TerraformSchema,
    privilege: string,
    toRoles: Role[],
    toTerraformRoles: TerraformRole[],
    onFuture: boolean,
    dependsOn: TerraformGrant[],
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
      database: this.database.resourceName(),
      databaseLower: this.database.resourceName().toLowerCase(),
      schema: this.schema.resourceName(),
      schemaLower: this.schema.resourceName().toLowerCase(),
      privilege: this.privilege,
      privilegeLower: this.privilege.toLowerCase(),
      kind: this.kind + 's',
      kindLower: this.kind.toLowerCase() + 's',
      future: this.onFuture,
      objectName: this.objectName
    })
  }

  resourceID(): string {
    // database|schema|object?|privilege|role|false
    return `${this.database.name}|${this.schema.name}|${this.objectName || ''}|${this.privilege}|${this.toRoles.map(r => r.name).concat(this.toTerraformRoles.map(tr => tr.name)).join(',')}|false`
  }

  resourceBlock(namingConvention: NamingConvention): string {
    const spacing = TerraformBackend.SPACING

    const roles = this.roleAndRoleResourceStrings().join(', ')
    const dependsOn = this.dependsOn.map(tg => `snowflake_${tg.kind}_grant.${tg.resourceName(namingConvention)}`).join(', ')

    if (this.onFuture) return [
      `resource ${this.resourceType()} ${this.resourceName(namingConvention)} {`,
      spacing + `database_name = snowflake_database.${this.database.resourceName()}.name`,
      spacing + `schema_name = snowflake_schema.${this.schema.resourceName()}.name\n`,
      spacing + `privilege = "${this.privilege}"`,
      spacing + `roles = [${roles}]\n`,
      spacing + 'on_future = true',
      spacing + 'with_grant_option = false',
      spacing + 'enable_multiple_grants = true',
      spacing + `depends_on = [${dependsOn}]`,
      '}',
    ].join('\n')

    if (this.objectName) return [
      `resource ${this.resourceType()} ${this.resourceName(namingConvention)} {`,
      spacing + `database_name = snowflake_database.${this.database.resourceName()}.name`,
      spacing + `schema_name = snowflake_schema.${this.schema.resourceName()}.name`,
      spacing + `${this.kind}_name = "${this.objectName}"`,
      spacing + `privilege = "${this.privilege}"`,
      spacing + `roles = [${roles}]\n`,
      spacing + 'with_grant_option = false',
      spacing + 'enable_multiple_grants = true',
      spacing + `depends_on = [${dependsOn}]`,
      '}',
    ].join('\n')

    const pluralKind = this.kind.toString().replace(/_/g, '-') + 's'
    return compact([
      `module "${this.schema.resourceName()}_grant_${this.privilege}_on_current_${pluralKind}" {`,
      spacing + `source = "./modules/snowflake-grant-all-current-${pluralKind}"`,
      spacing + `database_name = snowflake_database.${this.database.resourceName()}.name`,
      spacing + `schema_name = snowflake_schema.${this.schema.resourceName()}.name`,
      spacing + `privilege = "${this.privilege}"`,
      spacing + `roles = [${roles}]`,
      spacing + 'enable_multiple_grants = true',
      '}'
    ]).join('\n')
  }

  static fromSchemaObjectGrant(grant: SchemaObjectGrant): TerraformSchemaObjectGrant {
    return new TerraformSchemaObjectGrant(
      grant.kind,
      TerraformDatabase.fromDatabase(grant.schema.database),
      TerraformSchema.fromSchema(grant.schema),
      grant.privilege,
      [],
      [TerraformRole.fromRole(grant.role)],
      grant.future,
      grant.dependsOn ? grant.dependsOn.map(sog => terraformGrantFromGrant(sog)) : [],
      grant.objectName()
    )
  }
}

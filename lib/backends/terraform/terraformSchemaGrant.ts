import {TerraformGrant} from './terraformGrant'
import {immerable} from 'immer'
import {GrantKind} from '../../grants/grant'
import {NamingConvention} from '../../namingConvention'
import {TerraformBackend} from '../terraformBackend'
import {TerraformDatabase} from './terraformDatabase'
import {TerraformSchema} from './terraformSchema'
import {SchemaGrant} from '../../grants/schemaGrant'
import Mustache from 'mustache'
import {TerraformRole} from './terraformRole'
import {Role} from '../../roles/role'

export class TerraformSchemaGrant extends TerraformGrant {
  [immerable] = true

  kind: GrantKind = 'schema'
  database: TerraformDatabase
  schema: TerraformSchema
  privilege: string
  toRoles: Role[]
  toTerraformRoles: TerraformRole[]

  constructor(database: TerraformDatabase, schema: TerraformSchema, privilege: string, toRoles: Role[], toTerraformRoles: TerraformRole[]) {
    super()
    this.database = database
    this.schema = schema
    this.privilege = privilege
    this.toRoles = toRoles
    this.toTerraformRoles = toTerraformRoles
  }

  uniqueKey(): string {
    return [
      this.kind,
      this.database.name,
      this.schema.name,
      this.privilege,
    ].join('|')
  }

  resourceType(): string {
    return 'snowflake_schema_grant'
  }

  resourceName(namingConvention: NamingConvention): string {
    return Mustache.render(namingConvention.terraformGrantResourceName, {
      database: this.database.resourceName(),
      databaseLower: this.database.resourceName().toLowerCase(),
      schema: this.schema.name.toUpperCase().replace(/[^a-zA-Z0-9_-]/g, '_'),
      schemaLower: this.schema.name.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase(),
      privilege: this.privilege,
      privilegeLower: this.privilege.toLowerCase(),
      kind: 'schema',
      kindLower: 'schema',
    })
  }

  resourceID(): string {
    // database|schema||privilege|roles|false
    return `${this.database.name}|${this.schema.name}||${this.privilege}|${this.toRoles.map(r => r.name).concat(this.toTerraformRoles.map(tr => tr.name)).join(',')}|false`
  }

  resourceBlock(namingConvention: NamingConvention): string {
    const spacing = TerraformBackend.SPACING

    return [
      `resource ${this.resourceType()} ${this.resourceName(namingConvention)} {`,
      spacing + `database_name = snowflake_database.${this.database.resourceName()}.name`,
      spacing + `schema_name = snowflake_schema.${this.schema.resourceName()}.name\n`,
      spacing + `privilege = "${this.privilege}"`,
      spacing + `roles = [${this.roleAndRoleResourceStrings().join(', ')}]\n`,
      spacing + `depends_on = [${this.toTerraformRoles.map(r => `snowflake_role_grants.role_${r.resourceName().toLowerCase()}_grants`)}]\n`,
      spacing + 'with_grant_option = false',
      spacing + 'enable_multiple_grants = true',
      '}',
    ].join('\n')
  }

  static fromSchemaGrant(grant: SchemaGrant): TerraformSchemaGrant {
    return new TerraformSchemaGrant(
      TerraformDatabase.fromDatabase(grant.schema.database),
      TerraformSchema.fromSchema(grant.schema),
      grant.privilege,
      [],
      [TerraformRole.fromRole(grant.role)]
    )
  }
}

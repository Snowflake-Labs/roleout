import {TerraformPrivilegesGrant} from './terraformPrivilegesGrant'
import {GrantKind} from '../../grants/grant'
import {NamingConvention} from '../../namingConvention'
import {TerraformBackend} from '../terraformBackend'
import {TerraformDatabase} from './terraformDatabase'
import {TerraformSchema} from './terraformSchema'
import {SchemaGrant} from '../../grants/schemaGrant'
import Mustache from 'mustache'
import {TerraformRole} from './terraformRole'
import {Role} from '../../roles/role'
import {TerraformResource} from './terraformResource'
import {compact} from 'lodash'
import standardizeIdentifierForResource from './standardizeIdentifierForResource'
import {Privilege} from '../../privilege'

export type Props = {
  allPrivileges?: boolean
  privileges?: Privilege[]
  withGrantOption?: boolean
  dependsOn?: TerraformResource[]
}

export class TerraformSchemaGrant extends TerraformPrivilegesGrant {
  schema: TerraformSchema
  props: Props

  constructor(role: Role | TerraformRole, schema: TerraformSchema, props: Props) {
    super(role)
    this.schema = schema
    this.props = props
  }

  resourceName(namingConvention: NamingConvention): string {
    return Mustache.render(namingConvention.terraformGrantResourceName, {
      database: standardizeIdentifierForResource(this.database.name),
      databaseLower: standardizeIdentifierForResource(this.database.name).toLowerCase(),
      schema: standardizeIdentifierForResource(this.schema.name),
      schemaLower: standardizeIdentifierForResource(this.schema.name).toLowerCase(),
      privilege: this.privilege,
      privilegeLower: this.privilege.toLowerCase(),
      kind: 'schema',
      kindLower: 'schema',
      future: this.onFuture,
      onAll: this.onAll
    })
  }

  resourceID(): string {
    // database_name|schema_name|privilege|with_grant_option|on_future|on_all|roles|shares
    return `${this.database.name}|${this.schema.name}|${this.privilege}|false|${this.onFuture}|${this.onAll}|${this.toRoles.map(r => r.name).concat(this.toTerraformRoles.map(tr => tr.name)).join(',')}|`
  }

  resourceBlock(namingConvention: NamingConvention): string {
    const spacing = TerraformBackend.SPACING
    const dependencies = this.toTerraformRoles.map(r => `snowflake_role_grants.role_${r.resourceName().toLowerCase()}_grants`)
      .concat(this.dependsOn.map(r => `${r.resourceType()}.${r.resourceName(namingConvention)}`))

    return compact([
      `resource ${this.resourceType()} ${this.resourceName(namingConvention)} {`,
      spacing + `database_name = snowflake_database.${this.database.resourceName()}.name`,
      spacing + `schema_name = snowflake_schema.${this.schema.resourceName()}.name\n`,
      spacing + `privilege = "${this.privilege}"`,
      spacing + `roles = [${this.roleAndRoleResourceStrings().join(', ')}]\n`,
      this.dependsOn.length > 0 ? spacing + `depends_on = [${dependencies.join(', ')}]\n` : null,
      spacing + 'with_grant_option = false',
      spacing + 'enable_multiple_grants = true',
      '}',
    ]).join('\n')
  }

  static fromSchemaGrant(grant: SchemaGrant, dependsOn: TerraformResource[] = []): TerraformSchemaGrant {
    if(!grant.schema) throw new Error('Missing schema')
    return new TerraformSchemaGrant(
      TerraformDatabase.fromDatabase(grant.schema.database),
      TerraformSchema.fromSchema(grant.schema),
      grant.privilege,
      [],
      [TerraformRole.fromRole(grant.role)],
      dependsOn
    )
  }
}

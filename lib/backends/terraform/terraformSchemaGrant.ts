import {
  OnAccountObject,
  onAccountObjectResourceBlock, OnSchema,
  onSchemaResourceBlock,
  TerraformPrivilegesGrant
} from './terraformPrivilegesGrant'
import {NamingConvention} from '../../namingConvention'
import {TerraformBackend} from '../terraformBackend'
import {TerraformSchema} from './terraformSchema'
import {SchemaGrant} from '../../grants/schemaGrant'
import Mustache from 'mustache'
import {TerraformRole} from './terraformRole'
import {Role} from '../../roles/role'
import {TerraformResource} from './terraformResource'
import {compact} from 'lodash'
import standardizeIdentifierForResource from './standardizeIdentifierForResource'
import {Privilege} from '../../privilege'
import {terraformGrantFromGrant} from './helpers'

export type Props = {
  allPrivileges?: boolean
  future?: boolean
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
    this.props.dependsOn ||= []
    this.props.dependsOn.push(this.schema)
  }

  resourceID(): string {
    return ''
  }

  resourceName(namingConvention: NamingConvention): string {
    const standardDatabaseName = standardizeIdentifierForResource(this.schema.database.name)
    const standardSchemaName = standardizeIdentifierForResource(this.schema.name)
    const standardRoleName = standardizeIdentifierForResource(this.role.name)
    return Mustache.render(namingConvention.terraformGrantResourceName, {
      database: standardDatabaseName,
      databaseLower: standardDatabaseName.toLowerCase(),
      schema: standardSchemaName,
      schemaLower: standardSchemaName.toLowerCase(),
      role: standardRoleName,
      roleLower: standardRoleName.toLowerCase(),
      kind: 'schema',
      kindLower: 'schema',
      future: false,
      allPrivileges: false
    })
  }

  resourceBlock(namingConvention: NamingConvention): string {
    const spacing = TerraformBackend.SPACING
    const onSchema: OnSchema = {
      allSchemasInDatabase: undefined, // currently unsupported
      futureSchemasInDatabase: undefined, // currently unsupported
      schema: this.schema
    }
    const onSchemaBlock = onSchemaResourceBlock(onSchema, 1)
    const roleName = 'resourceName' in this.role ? `snowflake_role.${this.role.resourceName()}.name` : `"${this.role.name}"`

    return compact([
      `resource ${this.resourceType} ${this.resourceName(namingConvention)} {`,
      spacing + `role_name = ${roleName}`,
      onSchemaBlock,
      this.props.privileges ? spacing + `privileges = [${this.props.privileges.map(p => `"${p}"`).join(', ')}]` : null,
      this.props.allPrivileges ? spacing + 'all_privileges = true' : null,
      this.props.withGrantOption !== undefined ? spacing + `with_grant_options = ${this.props.withGrantOption}` : null,
      this.props.dependsOn ? spacing + `depends_on = [${this.props.dependsOn.map(r => r.resourceType + '.' + r.resourceName(namingConvention)).join(', ')}]` : null,
      '}'
    ]).join('\n')
  }

  toString(): string {
    return `${this.resourceType} ${this.props.privileges ? this.props.privileges.join(',') : ''} on ${this.schema.database.name}.${this.schema.name} to ${this.role.name}`
  }

  static fromSchemaGrant(grant: SchemaGrant, dependsOn: TerraformResource[]): TerraformSchemaGrant {
    return new TerraformSchemaGrant(grant.role, TerraformSchema.fromSchema(grant.schema), {
      privileges: grant.privileges,
      dependsOn: grant.dependsOn ? grant.dependsOn.map(sog => terraformGrantFromGrant(sog)).concat(dependsOn) : dependsOn,
    })
  }
}

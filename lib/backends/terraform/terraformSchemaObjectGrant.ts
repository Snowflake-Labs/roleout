import {
  OnSchemaObject,
  OnSchemaObjectAll,
  OnSchemaObjectFuture,
  onSchemaObjectResourceBlock,
  TerraformPrivilegesGrant
} from './terraformPrivilegesGrant'
import {SchemaObjectGrant} from '../../grants/schemaObjectGrant'
import {NamingConvention} from '../../namingConvention'
import {TerraformBackend} from '../terraformBackend'
import {TerraformSchema} from './terraformSchema'
import Mustache from 'mustache'
import {isTerraformRole, TerraformRole} from './terraformRole'
import {Role} from '../../roles/role'
import {terraformGrantFromGrant} from './helpers'
import {TerraformResource} from './terraformResource'
import standardizeIdentifierForResource from './standardizeIdentifierForResource'
import {Privilege} from '../../privilege'
import {pluralize, SchemaObjectType} from '../../objects/objects'
import {compact} from 'lodash'

export type Props = {
  objectType: SchemaObjectType
  allPrivileges?: boolean
  all?: boolean
  future?: boolean
  privileges?: Privilege[]
  withGrantOption?: boolean
  dependsOn?: TerraformResource[]
}

/**
 * Grants to all objects of given type in schema
 */
export class TerraformSchemaObjectGrant extends TerraformPrivilegesGrant {
  schema: TerraformSchema
  props: Props

  constructor(
    role: Role | TerraformRole,
    schema: TerraformSchema,
    props: Props
  ) {
    super(role)
    this.schema = schema
    this.props = props
    this.props.dependsOn ||= []
    this.props.dependsOn.push(this.schema)
    if(isTerraformRole(role)) this.props.dependsOn.push(role)
  }

  resourceName(namingConvention: NamingConvention): string {
    const standardDatabaseName = standardizeIdentifierForResource(this.schema.database.name)
    const standardSchemaName = standardizeIdentifierForResource(this.schema.name)
    const standardRoleName = standardizeIdentifierForResource(this.role.name)
    const standardObjectType = this.props.objectType.replace(/\s/gi, '_')
    return Mustache.render(namingConvention.terraformGrantResourceName, {
      database: standardDatabaseName,
      databaseLower: standardDatabaseName.toLowerCase(),
      schema: standardSchemaName,
      schemaLower: standardSchemaName.toLowerCase(),
      role: standardRoleName,
      roleLower: standardRoleName.toLowerCase(),
      objectType: standardObjectType,
      objectTypeLower: standardObjectType.toLowerCase(),
      future: this.props.future,
      allPrivileges: this.props.allPrivileges
    })
  }

  resourceID(): string {
    return ''
  }

  resourceBlock(namingConvention: NamingConvention): string {
    const spacing = TerraformBackend.SPACING

    const onSchemaObjectAll: OnSchemaObjectAll | undefined = this.props.all ? {
      objectTypePlural: pluralize(this.props.objectType),
      inSchema: this.schema
    } : undefined

    const onSchemaObjectFuture: OnSchemaObjectFuture | undefined = this.props.future ? {
      objectTypePlural: pluralize(this.props.objectType),
      inSchema: this.schema
    } : undefined

    const onSchemaObject: OnSchemaObject = {
      objectType: this.props.objectType,
      all: onSchemaObjectAll,
      future: onSchemaObjectFuture
    }

    const onSchemaObjectBlock = onSchemaObjectResourceBlock(onSchemaObject,1)

    const roleName = 'resourceName' in this.role ? `snowflake_role.${this.role.resourceName()}.name` : `"${this.role.name}"`

    return compact([
      `resource ${this.resourceType} ${this.resourceName(namingConvention)} {`,
      spacing + `role_name = ${roleName}`,
      this.props.privileges ? spacing + `privileges = [${this.props.privileges.map(p => `"${p}"`).join(', ')}]` : null,
      onSchemaObjectBlock,
      this.props.allPrivileges ? spacing + 'all_privileges = true' : null,
      this.props.withGrantOption !== undefined ? spacing + `with_grant_options = ${this.props.withGrantOption}` : null,
      this.props.dependsOn ? spacing + `depends_on = [${this.props.dependsOn.map(r => r.resourceType + '.' + r.resourceName(namingConvention)).join(', ')}]` : null,
      '}'
    ]).join('\n')
  }

  toString(): string {
    return `${this.resourceType} ${this.props.privileges ? this.props.privileges.join(',') : ''} on ${this.schema.database.name}.${this.schema.name} ${this.props.objectType} to ${this.role.name}`
  }

  static fromSchemaObjectGrant(grant: SchemaObjectGrant, dependsOn: TerraformResource[] = []): TerraformSchemaObjectGrant {
    return new TerraformSchemaObjectGrant(
      grant.role,
      TerraformSchema.fromSchema(grant.schema),
      {
        privileges: grant.privileges,
        all: !grant.future && grant.objectName() === undefined,
        future: grant.future,
        dependsOn: grant.dependsOn ? grant.dependsOn.map(sog => terraformGrantFromGrant(sog)).concat(dependsOn) : dependsOn,
        objectType: grant.objectType
      }
    )
  }
}

import {OnAccountObject, onAccountObjectResourceBlock, TerraformPrivilegesGrant} from './terraformPrivilegesGrant'
import {NamingConvention} from '../../namingConvention'
import {TerraformDatabase} from './terraformDatabase'
import {DatabaseGrant} from '../../grants/databaseGrant'
import Mustache from 'mustache'
import standardizeIdentifierForResource from './standardizeIdentifierForResource'
import {TerraformRole} from './terraformRole'
import {Role} from '../../roles/role'
import {TerraformResource} from './terraformResource'
import {AccountObjectType} from '../../objects/objects'
import {Privilege} from '../../privilege'
import {TerraformBackend} from '../terraformBackend'
import compact from 'lodash/compact'

export type Props = {
  allPrivileges?: boolean
  privileges?: Privilege[]
  withGrantOption?: boolean
  dependsOn?: TerraformResource[]
}

export class TerraformDatabaseGrant extends TerraformPrivilegesGrant {
  database: TerraformDatabase
  props: Props

  constructor(role: Role | TerraformRole, database: TerraformDatabase, props: Props) {
    super(role)
    this.database = database
    this.props = props
  }

  resourceID(): string {
    return ''
  }

  resourceName(namingConvention: NamingConvention): string {
    const standardDatabaseName = standardizeIdentifierForResource(this.database.name)
    const standardRoleName = standardizeIdentifierForResource(this.role.name)
    return Mustache.render(namingConvention.terraformGrantResourceName, {
      database: standardDatabaseName,
      databaseLower: standardDatabaseName.toLowerCase(),
      role: standardRoleName,
      roleLower: standardRoleName.toLowerCase(),
      schema: false,
      kind: 'database',
      kindLower: 'database',
      future: false,
    })
  }

  resourceBlock(namingConvention: NamingConvention): string {
    const spacing = TerraformBackend.SPACING
    const onAccountObject: OnAccountObject = {
      object: this.database,
      objectType: AccountObjectType.DATABASE
    }

    const onAccountBlock = onAccountObjectResourceBlock(onAccountObject, 1)
    const roleName = 'resourceName' in this.role ? `snowflake_role.${this.role.resourceName()}.name` : `"${this.role.name}"`

    return compact([
      `resource ${this.resourceType()} ${this.resourceName(namingConvention)} {`,
      spacing + `role_name = ${roleName}`,
      onAccountBlock,
      this.props.privileges ? spacing + `privileges = [${this.props.privileges.map(p => `"${p}"`).join(', ')}]` : null,
      this.props.allPrivileges ? spacing + 'all_privileges = true' : null,
      this.props.withGrantOption !== undefined ? spacing + `with_grant_options = ${this.props.withGrantOption}` : null,
      '}'
    ]).join('\n')
  }

  static fromDatabaseGrant(grant: DatabaseGrant, dependsOn?: TerraformResource[]): TerraformDatabaseGrant {
    return new TerraformDatabaseGrant(grant.role, TerraformDatabase.fromDatabase(grant.database), {
      privileges: [grant.privilege],
      dependsOn
    })
  }
}

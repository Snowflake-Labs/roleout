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

export type OnAccountObjectProps = {
  allPrivileges?: boolean
  privileges?: Privilege[]
  withGrantOption?: boolean
  dependsOn?: TerraformResource[]
}

export abstract class TerraformAccountObjectGrant extends TerraformPrivilegesGrant {
  props: OnAccountObjectProps

  protected constructor(role: Role | TerraformRole, props: OnAccountObjectProps) {
    super(role)
    this.props = props
  }

  abstract onAccountObject(): OnAccountObject

  resourceBlock(namingConvention: NamingConvention): string {
    const spacing = TerraformBackend.SPACING
    const onAccountObject: OnAccountObject = this.onAccountObject()

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
}

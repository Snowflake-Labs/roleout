import {TerraformResource} from './terraformResource'
import {TerraformRole} from './terraformRole'
import {NamingConvention} from '../../namingConvention'
import {TerraformBackend} from '../terraformBackend'
import Mustache from 'mustache'
import {Role} from '../../roles/role'
import {flatten} from 'lodash'
import compact from 'lodash/compact'

export class TerraformRoleOwnershipGrant implements TerraformResource {
  onRole: TerraformRole
  toRole: Role

  constructor(onRole: TerraformRole, toRole: Role) {
    this.onRole = onRole
    this.toRole = toRole
  }

  resourceType = 'snowflake_role_ownership_grant'

  resourceName(namingConvention: NamingConvention): string {
    return Mustache.render(namingConvention.terraformRoleOwnershipGrantResourceName, {
      role: this.onRole.resourceName(),
      roleLower: this.onRole.resourceName().toLowerCase()
    })
  }

  resourceID(): string {
    return `${this.onRole.name}|${this.toRole.name}|COPY`
  }

  resourceBlock(namingConvention: NamingConvention): string {
    const spacing = TerraformBackend.SPACING
    return flatten(compact([
      `resource ${this.resourceType} ${this.resourceName(namingConvention)} {`,
      spacing + `on_role_name = snowflake_role.${this.onRole.resourceName()}.name`,
      spacing + `to_role_name = "${this.toRole.name}"`,
      spacing + 'revert_ownership_to_role_name = "SYSADMIN"',
      '}'
    ]))
      .join('\n')
  }
}

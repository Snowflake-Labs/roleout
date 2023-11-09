import {TerraformResource} from './terraformResource'
import {TerraformRole} from './terraformRole'
import {NamingConvention} from '../../namingConvention'
import {TerraformBackend} from '../terraformBackend'
import Mustache from 'mustache'
import {Role} from '../../roles/role'
import {flatten} from 'lodash'
import compact from 'lodash/compact'

export class TerraformRoleGrants implements TerraformResource {
  fromRole: TerraformRole
  toRoles: Role[]
  toTerraformRoles: TerraformRole[]
  dependsOn: TerraformResource[]

  constructor(fromRole: TerraformRole, toRoles: Role[], toTerraformRoles: TerraformRole[], dependsOn: TerraformResource[] = []) {
    this.fromRole = fromRole
    this.toRoles = toRoles
    this.toTerraformRoles = toTerraformRoles
    this.dependsOn = dependsOn
  }

  resourceType = 'snowflake_role_grants'

  resourceName(namingConvention: NamingConvention): string {
    return Mustache.render(namingConvention.terraformGrantRoleResourceName, {
      role: this.fromRole.resourceName(),
      roleLower: this.fromRole.resourceName().toLowerCase()
    })
  }

  resourceID(): string {
    // {role_name}|{roles}|{users}
    return `${this.fromRole.name}|${this.toRoles.map(r => r.name).concat(this.toTerraformRoles.map(tr => tr.name)).join(',')}|`
  }

  resourceBlock(namingConvention: NamingConvention): string {
    const spacing = TerraformBackend.SPACING
    return flatten(compact([
      `resource ${this.resourceType} ${this.resourceName(namingConvention)} {`,
      spacing + `role_name = snowflake_role.${this.fromRole.resourceName()}.name\n`,
      spacing + 'enable_multiple_grants = true',
      spacing + 'roles = [',
      this.roleAndRoleResourceStrings().map((rn) => spacing.repeat(2) + `${rn},`),
      spacing + ']',
      this.dependsOn.length > 0 ? spacing + 'depends_on = [' + this.dependsOn.map(r => `${r.resourceType}.${r.resourceName(namingConvention)}`).join(', ') + ']' : null,
      '}'
    ]))
      .join('\n')
  }

  protected roleAndRoleResourceStrings(): string[] {
    return this.toRoles.map(r => `"${r.name}"`).concat(this.toTerraformRoles.map(tr => `snowflake_role.${tr.resourceName()}.name`))
  }
}

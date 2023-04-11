import {TerraformResource} from './terraformResource'
import {immerable} from 'immer'
import {NamingConvention} from '../../namingConvention'
import {
  Grant,
  GrantKind
} from '../../grants/grant'
import {Role} from '../../roles/role'
import {TerraformRole} from './terraformRole'

export abstract class TerraformGrant implements TerraformResource {
  [immerable] = true

  abstract resourceType(): string
  abstract resourceName(namingConvention: NamingConvention): string
  abstract resourceID(): string
  abstract resourceBlock(namingConvention: NamingConvention): string
  abstract uniqueKey(): string

  abstract kind: GrantKind
  abstract toRoles: Role[]
  abstract toTerraformRoles: TerraformRole[]

  protected roleAndRoleResourceStrings(): string[] {
    return this.toRoles.map(r => `"${r.name}"`).concat(this.toTerraformRoles.map(tr => `snowflake_role.${tr.resourceName()}.name`))
  }

}

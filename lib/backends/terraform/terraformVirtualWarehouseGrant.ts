import {TerraformGrant} from './terraformGrant'
import {GrantKind} from '../../grants/grant'
import {TerraformVirtualWarehouse} from './terraformVirtualWarehouse'
import {immerable} from 'immer'
import {NamingConvention} from '../../namingConvention'
import {TerraformBackend} from '../terraformBackend'
import {VirtualWarehouseGrant} from '../../grants/virtualWarehouseGrant'
import Mustache from 'mustache'
import {TerraformRole} from './terraformRole'
import {Role} from '../../roles/role'

export class TerraformVirtualWarehouseGrant extends TerraformGrant {
  [immerable] = true

  kind: GrantKind = 'virtual_warehouse'
  virtualWarehouse: TerraformVirtualWarehouse
  privilege: string
  toRoles: Role[]
  toTerraformRoles: TerraformRole[]

  constructor(virtualWarehouse: TerraformVirtualWarehouse, privilege: string, toRoles: Role[], toTerraformRoles: TerraformRole[]) {
    super()
    this.virtualWarehouse = virtualWarehouse
    this.privilege = privilege
    this.toRoles = toRoles
    this.toTerraformRoles = toTerraformRoles
  }

  uniqueKey(): string {
    return [
      this.kind,
      this.virtualWarehouse.name,
      this.privilege,
    ].join('|')
  }

  resourceType(): string {
    return 'snowflake_warehouse_grant'
  }

  resourceName(namingConvention: NamingConvention): string {
    return Mustache.render(
      namingConvention.terraformGrantVirtualWarehouseResourceName,
      {
        virtualWarehouse: this.virtualWarehouse.resourceName(),
        virtualWarehouseLower: this.virtualWarehouse.resourceName().toLowerCase(),
        privilege: this.privilege,
        privilegeLower: this.privilege.toLowerCase(),
      }
    )
  }

  resourceID(): string {
    // warehouse|||privilege|roles|false
    return `${this.virtualWarehouse.name}|||${this.privilege}|${this.toRoles.map(r => r.name).concat(this.toTerraformRoles.map(tr => tr.name)).join(',')}|false`
  }

  resourceBlock(namingConvention: NamingConvention): string {
    const spacing = TerraformBackend.SPACING

    return [
      `resource ${this.resourceType()} ${this.resourceName(namingConvention)} {`,
      spacing + `warehouse_name = snowflake_warehouse.${this.virtualWarehouse.resourceName()}.name`,
      spacing + `privilege = "${this.privilege}"\n`,
      spacing + `roles = [${this.roleAndRoleResourceStrings().join(', ')}]\n`,
      spacing + 'with_grant_option = false',
      spacing + 'enable_multiple_grants = true',
      '}',
    ].join('\n')
  }

  static fromVirtualWarehouseGrant(grant: VirtualWarehouseGrant): TerraformVirtualWarehouseGrant {
    return new TerraformVirtualWarehouseGrant(
      TerraformVirtualWarehouse.fromVirtualWarehouse(grant.virtualWarehouse),
      grant.privilege,
      [],
      [TerraformRole.fromRole(grant.role)]
    )
  }
}

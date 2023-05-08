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
import {TerraformResource} from './terraformResource'
import {compact} from 'lodash'

export class TerraformVirtualWarehouseGrant extends TerraformGrant {
  [immerable] = true

  kind: GrantKind = 'virtual_warehouse'
  virtualWarehouse: TerraformVirtualWarehouse
  privilege: string
  toRoles: Role[]
  toTerraformRoles: TerraformRole[]
  dependsOn: TerraformResource[]

  constructor(virtualWarehouse: TerraformVirtualWarehouse, privilege: string, toRoles: Role[], toTerraformRoles: TerraformRole[], dependsOn: TerraformResource[] = []) {
    super()
    this.virtualWarehouse = virtualWarehouse
    this.privilege = privilege
    this.toRoles = toRoles
    this.toTerraformRoles = toTerraformRoles
    this.dependsOn = dependsOn
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
    //warehouse-name|privilege|with_grant_option|roles
    return `${this.virtualWarehouse.name}|${this.privilege}|false|${this.toRoles.map(r => r.name).concat(this.toTerraformRoles.map(tr => tr.name)).join(',')}`
  }

  resourceBlock(namingConvention: NamingConvention): string {
    const spacing = TerraformBackend.SPACING

    return compact([
      `resource ${this.resourceType()} ${this.resourceName(namingConvention)} {`,
      spacing + `warehouse_name = snowflake_warehouse.${this.virtualWarehouse.resourceName()}.name`,
      spacing + `privilege = "${this.privilege}"\n`,
      spacing + `roles = [${this.roleAndRoleResourceStrings().join(', ')}]\n`,
      spacing + 'with_grant_option = false',
      spacing + 'enable_multiple_grants = true',
      this.dependsOn.length > 0 ? spacing + `depends_on = [${this.dependsOn.map(r => `${r.resourceType()}.${r.resourceName(namingConvention)}`)}]` : null,
      '}',
    ]).join('\n')
  }

  static fromVirtualWarehouseGrant(grant: VirtualWarehouseGrant, dependsOn: TerraformResource[] = []): TerraformVirtualWarehouseGrant {
    return new TerraformVirtualWarehouseGrant(
      TerraformVirtualWarehouse.fromVirtualWarehouse(grant.virtualWarehouse),
      grant.privilege,
      [],
      [TerraformRole.fromRole(grant.role)],
      dependsOn
    )
  }
}

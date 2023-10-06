import {OnAccountObject} from './terraformPrivilegesGrant'
import {TerraformVirtualWarehouse} from './terraformVirtualWarehouse'
import {NamingConvention} from '../../namingConvention'
import {VirtualWarehouseGrant} from '../../grants/virtualWarehouseGrant'
import Mustache from 'mustache'
import {TerraformRole} from './terraformRole'
import {Role} from '../../roles/role'
import {TerraformResource} from './terraformResource'
import standardizeIdentifierForResource from './standardizeIdentifierForResource'
import {AccountObjectType} from '../../objects/objects'
import {OnAccountObjectProps, TerraformAccountObjectGrant} from './terraformAccountObjectGrant'

export class TerraformVirtualWarehouseGrant extends TerraformAccountObjectGrant {
  virtualWarehouse: TerraformVirtualWarehouse

  constructor(role: Role | TerraformRole, virtualWarehouse: TerraformVirtualWarehouse, props: OnAccountObjectProps) {
    super(role, props)
    this.virtualWarehouse = virtualWarehouse
    this.props = props
  }

  resourceID(): string {
    return ''
  }

  resourceName(namingConvention: NamingConvention): string {
    const standardVirtualWarehouseName = standardizeIdentifierForResource(this.virtualWarehouse.name)
    const standardRoleName = standardizeIdentifierForResource(this.role.name)
    return Mustache.render(
      namingConvention.terraformGrantVirtualWarehouseResourceName,
      {
        virtualWarehouse: standardVirtualWarehouseName,
        virtualWarehouseLower: standardVirtualWarehouseName.toLowerCase(),
        role: standardRoleName,
        roleLower: standardRoleName.toLowerCase()
      }
    )
  }

  onAccountObject(): OnAccountObject {
    return {
      object: this.virtualWarehouse,
      objectType: AccountObjectType.WAREHOUSE
    }
  }

  static fromVirtualWarehouseGrant(grant: VirtualWarehouseGrant, dependsOn: TerraformResource[] = []): TerraformVirtualWarehouseGrant {
    return new TerraformVirtualWarehouseGrant(grant.role, TerraformVirtualWarehouse.fromVirtualWarehouse(grant.virtualWarehouse), {
      privileges: grant.privileges,
      dependsOn
    })
  }
}

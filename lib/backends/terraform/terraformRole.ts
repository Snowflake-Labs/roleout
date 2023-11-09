import {TerraformBackend} from '../terraformBackend'
import {TerraformResource} from './terraformResource'
import standardizeIdentifierForResource from './standardizeIdentifierForResource'
import {Role} from '../../roles/role'

export class TerraformRole implements TerraformResource {
  name: string

  constructor(name: string) {
    this.name = name
  }

  resourceType = 'snowflake_role'

  resourceName(): string {
    return standardizeIdentifierForResource(this.name)
  }

  resourceID(): string {
    return this.name
  }

  resourceBlock(): string {
    const spacing = TerraformBackend.SPACING

    return [
      `resource ${this.resourceType} ${this.resourceName()} {`,
      spacing + `name = "${this.name}"`,
      '}',
    ].join('\n')
  }

  static fromRole(role: Role) {
    return new TerraformRole(role.name)
  }
}

export function isTerraformRole(role: Role | TerraformRole): role is TerraformRole {
  return 'resourceType' in role && role.resourceType === 'snowflake_role'
}
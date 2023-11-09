import {NamingConvention} from '../../namingConvention'

export interface TerraformResource {
  resourceType: string
  resourceName(namingConvention: NamingConvention): string
  resourceBlock(namingConvention: NamingConvention): string
  resourceID(): string
}


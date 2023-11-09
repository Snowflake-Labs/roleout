import {Grant, isDatabaseGrant, isSchemaGrant, isSchemaObjectGrant, isVirtualWarehouseGrant} from '../../grants/grant'
import {TerraformSchemaObjectGrant} from './terraformSchemaObjectGrant'
import {TerraformSchemaGrant} from './terraformSchemaGrant'
import {TerraformDatabaseGrant} from './terraformDatabaseGrant'
import {TerraformVirtualWarehouseGrant} from './terraformVirtualWarehouseGrant'
import {TerraformResource} from './terraformResource'

/**
 * Note: does not maintain transitive dependencies from `grant`
 * @param grant
 */
export const terraformGrantFromGrant = (grant: Grant): TerraformResource => {
  if (isSchemaObjectGrant(grant)) return TerraformSchemaObjectGrant.fromSchemaObjectGrant(grant)
  if (isSchemaGrant(grant)) return TerraformSchemaGrant.fromSchemaGrant(grant, [])
  if (isDatabaseGrant(grant)) return TerraformDatabaseGrant.fromDatabaseGrant(grant, [])
  if (isVirtualWarehouseGrant(grant)) return TerraformVirtualWarehouseGrant.fromVirtualWarehouseGrant(grant)
  throw new Error('Unexpected grant type')
}

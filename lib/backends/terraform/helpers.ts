import {Grant, isDatabaseGrant, isSchemaGrant, isSchemaObjectGrant, isVirtualWarehouseGrant} from '../../grants/grant'
import {TerraformSchemaObjectGrant} from './terraformSchemaObjectGrant'
import {TerraformSchemaGrant} from './terraformSchemaGrant'
import {TerraformDatabaseGrant} from './terraformDatabaseGrant'
import {TerraformVirtualWarehouseGrant} from './terraformVirtualWarehouseGrant'

export const terraformGrantFromGrant = (grant: Grant): TerraformSchemaGrant | TerraformSchemaObjectGrant | TerraformDatabaseGrant | TerraformVirtualWarehouseGrant => {
  if (isSchemaObjectGrant(grant)) return TerraformSchemaObjectGrant.fromSchemaObjectGrant(grant)
  if (isSchemaGrant(grant)) return TerraformSchemaGrant.fromSchemaGrant(grant)
  if (isDatabaseGrant(grant)) return TerraformDatabaseGrant.fromDatabaseGrant(grant)
  if (isVirtualWarehouseGrant(grant)) return TerraformVirtualWarehouseGrant.fromVirtualWarehouseGrant(grant)
  throw new Error('Unexpected grant type')
}

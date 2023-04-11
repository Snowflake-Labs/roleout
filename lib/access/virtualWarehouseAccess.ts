import { FunctionalRole } from '../roles/functionalRole'
import { VirtualWarehouseAccessLevel } from './virtualWarehouseAccessLevel'

export type VirtualWarehouseAccess = Map<FunctionalRole, VirtualWarehouseAccessLevel>

import {Role} from '../roles/role'
import {DataAccessLevel} from './dataAccessLevel'
import {VirtualWarehouseAccessLevel} from './virtualWarehouseAccessLevel'

export type AccessLevel = DataAccessLevel | VirtualWarehouseAccessLevel;

export interface Access {
    role: Role;
    level: AccessLevel;
}

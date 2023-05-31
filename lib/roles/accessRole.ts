import { Grant } from '../grants/grant'

export interface AccessRole {
  name: string;
  grants: Grant[];
}
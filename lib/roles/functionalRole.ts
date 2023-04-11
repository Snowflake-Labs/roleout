import { Role } from './role'

export class FunctionalRole extends Role {
  constructor(name: string) {
    super(name)
  }

  equals(other: FunctionalRole) {
    return this.name === other.name
  }
}

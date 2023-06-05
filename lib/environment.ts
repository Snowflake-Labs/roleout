import {Deployable} from './deployable'

export class Environment extends Deployable {
  toRecord(): Record<string, unknown> {
    return {
      name: this.name
    }
  }
}
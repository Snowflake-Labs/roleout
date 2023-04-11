import {Deployable} from './deployable'

export class Environment extends Deployable {
  toObject(): Record<string, unknown> {
    return {
      name: this.name
    }
  }
}
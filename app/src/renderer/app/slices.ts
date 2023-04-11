import { Draft, PayloadAction} from '@reduxjs/toolkit'
import {find, remove, some} from 'lodash'
import {insertSortedBy} from '../util'
import {AdvancedOptionable, EnvironmentOptions, OptionsSet} from '../features/options/options'
import {Environment} from '../features/environments/environment'
import {castDraft} from 'immer'
import {Access} from '../features/access/access'

export interface HasName {
  name: string
}

export interface HasAccess<AccessLevel> {
  access: { [role: string]: Access<AccessLevel>[] }
}

export class CRUDSliceError extends Error {
  constructor(s: string) {
    super(s)
  }
}

export class NoSuchObjectError extends CRUDSliceError {
  constructor(name: string) {
    super(`No such object '${name}'`)
  }
}

export type AddPayload<Options> = { name: string, environments: Environment[], optionsSet?: OptionsSet<Options> }
export type AddAction<Options> = PayloadAction<AddPayload<Options>>
export type AccessPayload<AccessLevel> = { name: string, role: string, level: AccessLevel | null, environment?: string }
export type AccessAction<AccessLevel> = PayloadAction<AccessPayload<AccessLevel>>

export function crudAdd<A extends HasName, Options extends Record<string, any>>(factory: (name: string, state: Draft<A>[], environments: Environment[], optionsSet?: OptionsSet<Options>) => Draft<A>) {
  return (state: Draft<A[]>, action: AddAction<Options>) => {
    if (!some(state, obj => obj.name === action.payload.name)) {
      insertSortedBy(state, factory(action.payload.name, state, action.payload.environments, action.payload.optionsSet), obj => obj.name)
    }
  }
}

export function crudRemove<A extends HasName>() {
  return (state: Draft<A[]>, action: PayloadAction<string>) => {
    remove(state, obj => obj.name === action.payload)
  }
}

export function crudRename<A extends HasName>() {
  return (state: Draft<A[]>, action: PayloadAction<{ name: string, newName: string }>) => {
    const object = find(state, obj => obj.name === action.payload.name)
    if (object) object.name = action.payload.newName
    state.sort((a, b) => a.name >= b.name ? 1 : a.name === b.name ? 0 : -1)
  }
}

export function crudSetOptions<A extends HasName & AdvancedOptionable<Options>, Options extends Record<string, any>>() {
  return (state: Draft<A[]>, action: PayloadAction<{ name: string, options: Options }>) => {
    const object = find(state, obj => obj.name === action.payload.name)
    if (object) object.options = castDraft(action.payload.options)
  }
}

export function crudSetEnvironmentOptions<A extends HasName & AdvancedOptionable<Options>, Options extends Record<string, any>>() {
  return (state: Draft<A[]>, action: PayloadAction<{ name: string, environmentOptions: EnvironmentOptions<Options> }>) => {
    const object = find(state, obj => obj.name === action.payload.name)
    if (object) object.environmentOptions = castDraft(action.payload.environmentOptions)
  }
}

export function crudSetAccess<A extends HasName & HasAccess<AccessLevel>, AccessLevel>() {
  return (state: Draft<A>[], action: AccessAction<AccessLevel>) => {
    const payload = action.payload

    const object = find(state, obj => obj.name === action.payload.name)
    if (!object) throw new NoSuchObjectError(action.payload.name)

    if (!object.access[payload.role]) object.access[payload.role] = []

    if (payload.level === null) {
      remove(object.access[payload.role], a => a.environment === payload.environment)
    } else {
      const access = object.access[payload.role]?.find(a => a.environment === action.payload.environment)
      if (access) {
        access.level = castDraft(payload.level)
      } else {
        object.access[payload.role].push({level: castDraft(payload.level), environment: payload.environment})
      }
    }
  }
}

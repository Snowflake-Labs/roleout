import {reduce} from 'lodash'
import {Environment} from '../environments/environment'
import produce, {castDraft} from 'immer'
import {PayloadAction} from '@reduxjs/toolkit'

export interface AdvancedOptionsProps<Options> {
  options: Options
  setOptions: (options: Options) => SetOptionsPayloadAction<Options>
  environmentOptions: EnvironmentOptions<Options>
  setEnvironmentOptions: (environmentOptions: EnvironmentOptions<Options>) => SetEnvironmentOptionsPayloadAction<Options>
}

export interface AdvancedOptionable<Options extends Record<string, any>> {
  name: string
  options: Options
  environmentOptions: EnvironmentOptions<Options>
}

export function isAdvancedOptionable<T extends Record<string, any>>(obj: any): obj is AdvancedOptionable<T> {
  return 'options' in obj && 'environmentOptions' in obj
}

export type EnvironmentOptions<Options> = {
  readonly [env: string]: Options
}

export type OptionsSet<Options> = {
  options: Options
  environmentOptions: EnvironmentOptions<Options>
}

export function defaultEnvironmentsOptions<Options>(environments: Environment[], defaultOptions: Options) {
  return reduce(environments, (opts, env) => {
    return produce(opts, draft => {
      draft[env.name] = castDraft(defaultOptions)
    })
  }, {} as EnvironmentOptions<Options>)
}

export type SetOptionsPayloadAction<Options> = PayloadAction<{ name: string, options: Options } | { name: string, environmentOptions: EnvironmentOptions<Options> }>
export type SetEnvironmentOptionsPayloadAction<Options> = PayloadAction<{ name: string, environmentOptions: EnvironmentOptions<Options> }>

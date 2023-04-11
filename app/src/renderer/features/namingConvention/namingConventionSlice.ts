import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {NamingConvention} from 'roleout-lib/namingConvention'
import {defaultNamingConvention} from 'roleout-lib/namingConvention'

type NamingConventionState = NamingConvention

const initialState: NamingConventionState = defaultNamingConvention

type SetTemplatePayloadAction = PayloadAction<{template: keyof NamingConventionState, value: string}>

export const namingConventionSlice = createSlice({
  name: 'namingConvention',
  initialState,
  reducers: {
    setTemplate: (state, action: SetTemplatePayloadAction) => {
      state[action.payload.template] = action.payload.value
    },
  }
})

export const {
  setTemplate
} = namingConventionSlice.actions

export default namingConventionSlice.reducer
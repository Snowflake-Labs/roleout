import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'

export interface OptionsState {
  showAdvancedOptions: boolean
}

const initialState: OptionsState = {
  showAdvancedOptions: false
}

export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setShowAdvancedOptions: (state, action: PayloadAction<boolean>) => {
      state.showAdvancedOptions = action.payload
    },
  }
})

export const {
  setShowAdvancedOptions
} = optionsSlice.actions

export default optionsSlice.reducer
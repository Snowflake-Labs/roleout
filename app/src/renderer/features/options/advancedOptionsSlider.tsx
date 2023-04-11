import React, {ChangeEvent, FunctionComponent} from 'react'
import {FormControlLabel, Switch} from '@mui/material'
import {useAppSelector} from '../../app/hooks'
import {useDispatch} from 'react-redux'
import {setShowAdvancedOptions} from './optionsSlice'

const AdvancedOptionsSlider: FunctionComponent<Record<never, unknown>> = () => {
  const dispatch = useDispatch()
  const showAdvancedOptions = useAppSelector(state => state.options.showAdvancedOptions)

  const handleChange = (_e: ChangeEvent<HTMLInputElement>, checked: boolean) =>
    dispatch(setShowAdvancedOptions(checked))

  return (
    <FormControlLabel
      value="advanced-options"
      control={<Switch checked={showAdvancedOptions} onChange={handleChange} color="primary"/>}
      label="Advanced Options"
      labelPlacement="end"
    />
  )
}

export default AdvancedOptionsSlider

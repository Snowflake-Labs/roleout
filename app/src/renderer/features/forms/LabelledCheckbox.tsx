import FormControl from '@mui/material/FormControl'
import {Checkbox, FormControlLabel} from '@mui/material'
import React from 'react'

interface Props {
  label: string
  checked: boolean
  disabled?: boolean
  handleChange: (checked: boolean) => unknown

  [childProps: string]: unknown
}

const LabelledCheckbox = React.forwardRef(function LabelledCheckbox(props: Props, ref) {
  const {label, checked, disabled, handleChange, ...childProps} = props
  return (
    <FormControl>
      <FormControlLabel control={<Checkbox checked={checked}/>} label={label} disabled={disabled}
        onChange={(_e, checked) => handleChange(checked)}
        ref={ref}
        {...childProps}

      />
    </FormControl>
  )
})

export default LabelledCheckbox

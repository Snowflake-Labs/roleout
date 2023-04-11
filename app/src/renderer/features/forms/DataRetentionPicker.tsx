import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import {FormHelperText, Select} from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import {range} from 'lodash'
import React, {FunctionComponent} from 'react'
import {SelectChangeEvent} from '@mui/material/Select'

interface Props {
  dataRetentionTimeInDays?: number
  handleChange: (e: SelectChangeEvent) => unknown
  error?: string
}

const DataRetentionPicker: FunctionComponent<Props> = ({dataRetentionTimeInDays, handleChange, error}) => {
  return (
    <FormControl size="small" fullWidth sx={{minWidth: '10rem'}} error={!!error}>
      <InputLabel>Data Retention Days</InputLabel>
      <Select value={dataRetentionTimeInDays !== undefined ? dataRetentionTimeInDays.toString() : 'default'} label="Data Retention Days" onChange={handleChange}>
        <MenuItem key={'default'} value="default">Default</MenuItem>
        {range(0, 91).map(i =>
          <MenuItem key={i} value={i.toString()}>{i}</MenuItem>
        )}
      </Select>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  )
}

export default DataRetentionPicker
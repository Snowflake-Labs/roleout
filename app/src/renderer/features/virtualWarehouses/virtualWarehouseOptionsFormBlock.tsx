import React, {ChangeEvent, FunctionComponent, useEffect, useState} from 'react'
import {AdvancedOptionsProps} from '../options/options'
import {
  FormHelperText,
  Grid,
  InputAdornment,
  Select,
  TextField
} from '@mui/material'
import {
  VirtualWarehouseOptions,
  VirtualWarehouseScalingPolicy,
  VirtualWarehouseSize, VirtualWarehouseType
} from 'roleout-lib/build/objects/virtualWarehouse'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import {produce} from 'immer'
import {SelectChangeEvent} from '@mui/material/Select'
import {range} from 'lodash'
import {Draft} from '@reduxjs/toolkit'
import {useAppDispatch} from '../../app/hooks'
import LabelledCheckbox from '../forms/LabelledCheckbox'

export type Props = Pick<AdvancedOptionsProps<VirtualWarehouseOptions>, 'setOptions' | 'options'>

const VirtualWarehouseOptionsFormBlock: FunctionComponent<Props> = ({setOptions, options}) => {
  const dispatch = useAppDispatch()

  const [newAutoSuspendStr, setNewAutoSuspendStr] = useState(options.autoSuspend.toString())
  const [newQueryAccelerationMaxScaleFactorStr, setNewQueryAccelerationMaxScaleFactorStr] = useState(options.queryAccelerationMaxScaleFactor ? options.queryAccelerationMaxScaleFactor.toString() : '')
  const [multiClusterError, setMultiClusterError] = useState<string | null>(null)
  const [newStatementTimeoutStr, setNewStatementTimeoutStr] = useState(options.statementTimeoutInSeconds ? options.statementTimeoutInSeconds.toString() : '')
  const [newResourceMonitorStr, setNewResourceMonitorStr] = useState(options.resourceMonitor ? options.resourceMonitor.toString() : '')

  useEffect(() => {
    if (options.maxClusterCount < options.minClusterCount && !multiClusterError) {
      setMultiClusterError('Min clusters must be <= max clusters')
    } else if (options.maxClusterCount >= options.minClusterCount && !!multiClusterError) {
      setMultiClusterError(null)
    }
  }, [options])

  const setOption = (recipe: (draft: Draft<VirtualWarehouseOptions>) => void) => {
    dispatch(setOptions(produce(options, recipe)))
  }

  const handleChangeSize = (e: SelectChangeEvent) =>
    setOption(draft => {
      draft.size = e.target.value as VirtualWarehouseSize
    })

  const handleChangeMinClusters = (e: SelectChangeEvent) =>
    setOption(draft => {
      draft.minClusterCount = parseInt(e.target.value as string)
    })

  const handleChangeMaxClusters = (e: SelectChangeEvent) =>
    setOption(draft => {
      draft.maxClusterCount = parseInt(e.target.value as string)
    })

  const handleChangeScalingPolicy = (e: SelectChangeEvent) =>
    setOption(draft => {
      draft.scalingPolicy = e.target.value as VirtualWarehouseScalingPolicy
    })

  const handleChangeAutoSuspend = (e: ChangeEvent<HTMLInputElement>) => {
    const strValue = (e.target.value as string).replace(/[^0-9]/, '')
    if ('' === strValue) {
      setNewAutoSuspendStr('')
      setOption(draft => {
        draft.autoSuspend = 0
      })
      return
    }

    const numberValue = parseInt(strValue)
    if (!isNaN(numberValue)) {
      setNewAutoSuspendStr(numberValue.toString())
      setOption(draft => {
        draft.autoSuspend = numberValue
      })
    }
  }

  const handleChangeAutoResume = (checked: boolean) =>
    setOption(draft => {
      draft.autoResume = checked
    })

  const handleChangeEnableQueryAcceleration = (checked: boolean) =>
    setOption(draft => {
      draft.enableQueryAcceleration = checked
    })

  const handleChangeQueryAccelerationMaxScaleFactor = (e: ChangeEvent<HTMLInputElement>) => {
    const strValue = (e.target.value as string).replace(/[^0-9]/, '')
    if ('' === strValue) {
      setNewQueryAccelerationMaxScaleFactorStr('')
      setOption(draft => {
        draft.queryAccelerationMaxScaleFactor = undefined
      })
      return
    }

    const numberValue = parseInt(strValue)
    if (!isNaN(numberValue) && numberValue > 0) {
      setNewQueryAccelerationMaxScaleFactorStr(numberValue.toString())
      setOption(draft => {
        draft.queryAccelerationMaxScaleFactor = numberValue
      })
    }
  }

  const handleChangeType = (e: SelectChangeEvent) =>
    setOption(draft => {
      draft.type = e.target.value as VirtualWarehouseType
    })

  const handleChangeStatementTimeout = (e: ChangeEvent<HTMLInputElement>) => {
    const strValue = (e.target.value as string).replace(/[^0-9]/, '')
    if ('' === strValue) {
      setNewStatementTimeoutStr('')
      setOption(draft => {
        draft.statementTimeoutInSeconds = undefined
      })
      return
    }

    const numberValue = parseInt(strValue)
    if (!isNaN(numberValue)) {
      setNewStatementTimeoutStr(numberValue.toString())
      setOption(draft => {
        draft.statementTimeoutInSeconds = numberValue
      })
    }
  }

  const handleChangeResourceMonitor = (e: ChangeEvent<HTMLInputElement>) => {
    const strValue = e.target.value
    if ('' === strValue) {
      setNewResourceMonitorStr('')
      setOption(draft => {
        draft.resourceMonitor = undefined
      })
      return
    }

    setNewResourceMonitorStr(strValue)
    setOption(draft => {
      draft.resourceMonitor = strValue
    })
  }

  const handleChangeInitiallySuspended = (checked: boolean) =>
    setOption(draft => {
      draft.initiallySuspended = checked
    })

  return (
    <Grid container gap={1}>
      <Grid item>
        <FormControl size="small" fullWidth sx={{minWidth: '14ch'}}>
          <InputLabel>Size</InputLabel>
          <Select value={options.size} label="Size" onChange={handleChangeSize}>
            {Object.values(VirtualWarehouseSize).map(size =>
              <MenuItem key={size} value={size}>{size}</MenuItem>
            )}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl size="small" fullWidth>
          <InputLabel>Type</InputLabel>
          <Select value={options.type} label="Type" onChange={handleChangeType}>
            <MenuItem value={'STANDARD'}>Standard</MenuItem>
            <MenuItem value={'SNOWPARK-OPTIMIZED'}>Snowpark Optimized</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl size="small" fullWidth sx={{minWidth: '6rem'}} error={!!multiClusterError}>
          <InputLabel>Min Clusters</InputLabel>
          <Select value={options.minClusterCount.toString()} label="Min Clusters" onChange={handleChangeMinClusters}>
            {range(1, 11).map(i =>
              <MenuItem key={i} value={i}>{i}</MenuItem>
            )}
          </Select>
          <FormHelperText>{multiClusterError}</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl size="small" fullWidth sx={{minWidth: '6rem'}} error={!!multiClusterError}>
          <InputLabel>Max Clusters</InputLabel>
          <Select value={options.maxClusterCount.toString()} label="Max Clusters" onChange={handleChangeMaxClusters}>
            {range(1, 11).map(i =>
              <MenuItem key={i} value={i}>{i}</MenuItem>
            )}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl size="small" fullWidth>
          <InputLabel>Scaling Policy</InputLabel>
          <Select value={options.scalingPolicy} label="Scaling Policy" onChange={handleChangeScalingPolicy}>
            <MenuItem value={'STANDARD'}>Standard</MenuItem>
            <MenuItem value={'ECONOMY'}>Economy</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <TextField size="small" value={newAutoSuspendStr} label={'Auto Suspend'}
          sx={{width: '14ch'}}
          InputProps={newAutoSuspendStr ? {
            endAdornment: <InputAdornment position="end">min(s)</InputAdornment>,
          } : {}}
          onChange={handleChangeAutoSuspend}
        />
      </Grid>
      <Grid item>
        <LabelledCheckbox label="Auto Resume" checked={options.autoResume} handleChange={handleChangeAutoResume}/>
      </Grid>
      <Grid item>
        <LabelledCheckbox label="Query Acceleration" checked={options.enableQueryAcceleration}
          handleChange={handleChangeEnableQueryAcceleration}/>
      </Grid>
      <Grid item>
        <TextField size="small" value={newQueryAccelerationMaxScaleFactorStr} label={'QA Max Scale Factor'}
          sx={{width: '17ch'}}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChangeQueryAccelerationMaxScaleFactor}
        />
      </Grid>
      <Grid item>
        <TextField size="small" value={newStatementTimeoutStr} label={'Statement Timeout'}
          sx={{width: '16ch'}}
          InputProps={newStatementTimeoutStr ? {
            endAdornment: <InputAdornment position="end">sec(s)</InputAdornment>,
          } : {}}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChangeStatementTimeout}
        />
      </Grid>
      <Grid item>
        <TextField size="small" value={newResourceMonitorStr} label={'Resource Monitor'}
          sx={{width: '17ch'}}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChangeResourceMonitor}
        />
      </Grid>
      <Grid item>
        <LabelledCheckbox label="Initially Suspended" checked={options.initiallySuspended}
          handleChange={handleChangeInitiallySuspended}/>
      </Grid>
    </Grid>
  )
}
export default VirtualWarehouseOptionsFormBlock

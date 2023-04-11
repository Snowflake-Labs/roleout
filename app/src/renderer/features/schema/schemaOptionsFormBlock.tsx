import React, {FunctionComponent, useEffect, useState} from 'react'
import {SetOptionsPayloadAction} from '../options/options'
import {Grid, Tooltip} from '@mui/material'
import {SchemaOptions} from 'roleout-lib/build/objects/schema'
import {produce} from 'immer'
import {Draft} from '@reduxjs/toolkit'
import {useAppDispatch} from '../../app/hooks'
import {SelectChangeEvent} from '@mui/material/Select'
import DataRetentionPicker from '../forms/DataRetentionPicker'
import LabelledCheckbox from '../forms/LabelledCheckbox'
import {DatabaseOptions} from 'roleout-lib/build/objects/database'

export interface Props {
  options: SchemaOptions
  setOptions: (options: SchemaOptions) => SetOptionsPayloadAction<SchemaOptions>
  parentOptions?: DatabaseOptions
}

const SchemaOptionsFormBlock: FunctionComponent<Props> = ({
  setOptions,
  options,
  parentOptions,
}) => {
  const dispatch = useAppDispatch()

  const [dataRetentionError, setDataRetentionError] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (options.transient && options.dataRetentionTimeInDays !== undefined && options.dataRetentionTimeInDays > 1) {
      setDataRetentionError('Max data retention days is 1 if schema is transient')
    } else {
      setDataRetentionError(undefined)
    }
  }, [options])

  useEffect(() => {
    if (parentOptions?.transient && !options.transient) {
      setOption(draft => {
        draft.transient = true
      })
    }
  }, [options, parentOptions])

  const setOption = (recipe: (draft: Draft<SchemaOptions>) => void) => {
    dispatch(setOptions(produce(options, recipe)))
  }

  const handleChangeTransient = (checked: boolean) =>
    setOption(draft => {
      draft.transient = checked
    })

  const handleChangeManagedAccess = (checked: boolean) =>
    setOption(draft => {
      draft.managedAccess = checked
    })

  const handleChangeDataRetention = (e: SelectChangeEvent) => {
    const strValue = e.target.value as string
    if ('' === strValue || 'default' === strValue) {
      setOption(draft => {
        draft.dataRetentionTimeInDays = undefined
      })
      return
    }

    const numberValue = parseInt(strValue)
    if (!isNaN(numberValue)) {
      setOption(draft => {
        draft.dataRetentionTimeInDays = numberValue
      })
    }
  }

  return (
    <Grid container gap={3}>
      <Grid item>
        <DataRetentionPicker handleChange={handleChangeDataRetention}
          dataRetentionTimeInDays={options.dataRetentionTimeInDays}
          error={dataRetentionError}/>
      </Grid>
      <Grid item>
        <Tooltip title={parentOptions?.transient ? 'Database is transient, so schema must be transient' : ''}>
          <LabelledCheckbox label="Transient" checked={options.transient} disabled={parentOptions?.transient}
            handleChange={handleChangeTransient}/>
        </Tooltip>
      </Grid>
      <Grid item>
        <LabelledCheckbox label="Managed Access" checked={options.managedAccess}
          handleChange={handleChangeManagedAccess}/>
      </Grid>
    </Grid>
  )
}
export default SchemaOptionsFormBlock

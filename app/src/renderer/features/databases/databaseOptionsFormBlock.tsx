import React, {FunctionComponent, useEffect, useState} from 'react'
import {AdvancedOptionsProps} from '../options/options'
import {Grid} from '@mui/material'
import {DatabaseOptions} from 'roleout-lib/build/objects/database'
import {produce} from 'immer'
import {Draft} from '@reduxjs/toolkit'
import {useAppDispatch} from '../../app/hooks'
import {SelectChangeEvent} from '@mui/material/Select'
import DataRetentionPicker from '../forms/DataRetentionPicker'
import LabelledCheckbox from '../forms/LabelledCheckbox'

type Props = Pick<AdvancedOptionsProps<DatabaseOptions>, 'setOptions' | 'options'>

const DatabaseOptionsFormBlock: FunctionComponent<Props> = ({setOptions, options}) => {
  const dispatch = useAppDispatch()
  const [dataRetentionError, setDataRetentionError] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (options.transient && options.dataRetentionTimeInDays !== undefined && options.dataRetentionTimeInDays > 1) {
      setDataRetentionError('Max data retention days is 1 if database is transient')
    } else {
      setDataRetentionError(undefined)
    }
  }, [options])

  const setOption = (recipe: (draft: Draft<DatabaseOptions>) => void) => {
    dispatch(setOptions(produce(options, recipe)))
  }

  const handleChangeTransient = (checked: boolean) =>
    setOption(draft => {
      draft.transient = checked
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
        <LabelledCheckbox label="Transient" checked={options.transient} handleChange={handleChangeTransient}/>
      </Grid>
    </Grid>
  )
}
export default DatabaseOptionsFormBlock

import React, {FunctionComponent} from 'react'
import {Box, TextField} from '@mui/material'
import {startCase} from 'lodash'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {NamingConvention} from 'roleout-lib/namingConvention'
import {setTemplate} from './namingConventionSlice'

type Props = Record<string, never>

const items = {
  database: 'database',
  schema: 'schema',
  functionalRole: 'functional role',
  virtualWarehouse: 'virtual warehouse',
  databaseAccessRole: 'database access role',
  schemaAccessRole: 'schema access role',
  virtualWarehouseAccessRole: 'virtual warehouse access role',
  environmentManagerRole: 'environment manager role',
  terraformGrantResourceName: 'terraform grant resource name',
  terraformGrantVirtualWarehouseResourceName: 'terraform grant virtual warehouse resource name',
  terraformGrantRoleResourceName: 'terraform grant role resource name'
}

const namingConventionForm: FunctionComponent<Props> = () => {
  const dispatch = useAppDispatch()
  const namingConvention = useAppSelector(state => state.namingConvention)

  const handleChange = (item: keyof NamingConvention, e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTemplate({template: item, value: e.target.value}))
  }

  return (
    <Box>
      {Object.entries(items).map(([key, value]) => (
        <TextField
          sx={{m: 1}}
          key={key}
          fullWidth
          id={`${value.replace(' ', '-')}-template`}
          label={startCase(`${value} Template`)}
          defaultValue={namingConvention[key as keyof NamingConvention]}
          onChange={(e) => handleChange(key as keyof NamingConvention, e as React.ChangeEvent<HTMLInputElement>)}
        />
      ))}
    </Box>
  )
}

export default namingConventionForm

import React, {ChangeEvent, FunctionComponent, useEffect, useState} from 'react'
import {FormControlLabel, FormGroup, FormLabel, Stack, Switch, TextField} from '@mui/material'
import {useAppDispatch, useAppSelector} from '../../hooks'
import {
  setEnforceUnquotedIdentifiers,
  setEnvironmentsEnabled,
  setName,
  setSchemaObjectGroupsEnabled
} from '../../../features/project/projectSlice'
import Divider from '@mui/material/Divider'
import styled from '@emotion/styled'

const ProjectIndex: FunctionComponent<Record<string, unknown>> = () => {
  const dispatch = useAppDispatch()

  const projectName = useAppSelector(state => state.project.name)
  const environmentsEnabled = useAppSelector(state => state.project.environmentsEnabled)
  const schemaObjectGroupsEnabled = useAppSelector(state => state.project.schemaObjectGroupsEnabled)
  const enforceUnquotedIdentifiers = useAppSelector(state => state.project.enforceUnquotedIdentifiers)

  const [newName, setNewName] = useState<string>(projectName || '')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (newName.trim() === '') {
      setError('Project name can\'t be empty')
    } else {
      setError('')
      dispatch(setName(newName))
    }
  }, [newName])

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value)
  }

  const handleEnvironmentsEnabledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEnvironmentsEnabled(e.target.checked))
  }

  const handleSchemaObjectGroupsEnabledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSchemaObjectGroupsEnabled(e.target.checked))
  }

  const handleEnforceUnquotedIdentifiersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEnforceUnquotedIdentifiers(e.target.checked))
  }

  const shouldAutoFocus = projectName === ''

  const StyledDivider = styled(Divider)`
    margin-bottom: 1rem;
  `


  return (
    <Stack
      margin="0 auto"
      sx={{
        '& .MuiTextField-root': {m: 1, width: '64ch'},
      }}
      gap={4}
    >
      <TextField
        id="outlined"
        label="Project Name"
        onChange={handleNameChange}
        error={!!error}
        helperText={error ? error : 'A name to identify this project, which will also be the default project file name.'}
        value={newName}
        autoFocus={shouldAutoFocus}
      />
      <FormGroup>
        <FormLabel>When enabled, your specified databases, virtual warehouses, functional roles, and access controls will be replicated for every environment you specify.</FormLabel>
        <FormControlLabel label="Enable Environments" sx={{mb: 2}}
          control={<Switch checked={environmentsEnabled}
            onChange={handleEnvironmentsEnabledChange}/>}

        />

        <StyledDivider />

        <FormLabel>Although not generally recommended, sometimes you might have a hard requirement to control access to individual tables and views, rather than at the schema level.
        Enable Schema Object Groups to create groups of tables and views across schemas and databases that should share an access level, and manage that access from the Access page.</FormLabel>
        <FormControlLabel label="Enable Schema Object Groups" sx={{mb: 2}}
          control={<Switch checked={schemaObjectGroupsEnabled}
            onChange={handleSchemaObjectGroupsEnabledChange}/>}

        />

        <StyledDivider />

        <FormLabel>When enabled, Roleout will force identifiers to be all upper case with no special characters. When disabled, Roleout will allow case-sensitive text with certain special characters (&apos; &apos;, &apos;$&apos;, &apos;-&apos;) for identifiers which will then be double-quoted by the deployment backend.</FormLabel>
        <FormControlLabel label="Enforce Unquoted Identifiers"
          control={<Switch checked={enforceUnquotedIdentifiers}
            onChange={handleEnforceUnquotedIdentifiersChange}/>}

        />
      </FormGroup>
    </Stack>
  )
}

export default ProjectIndex

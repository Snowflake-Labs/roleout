import React, {FunctionComponent, useMemo, useState} from 'react'
import { Button, FormHelperText, Select} from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import {SelectChangeEvent} from '@mui/material/Select'
import {useAppSelector} from '../../app/hooks'
import {capitalize} from 'lodash'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import {useDispatch} from 'react-redux'
import {
  addTableToSchemaObjectGroup,
  addViewToSchemaObjectGroup, schemaObjectGroupDataObjectExists,
  SchemaObjectGroupObjectPayload,
  selectSchemaObjectGroup,
} from './schemaObjectGroupsSlice'
import NewSnowflakeIdentifierTextField from '../forms/NewSnowflakeIdentifierTextField'

export interface Props {
  schemaObjectGroupName: string
}

export const AddDataObject: FunctionComponent<Props> = ({schemaObjectGroupName}) => {
  const enforceUnquotedIdentifiers = useAppSelector(state => state.project.enforceUnquotedIdentifiers)

  const [nameError, setNameError] = useState('')
  const [databaseError, setDatabaseError] = useState('')
  const [schemaError, setSchemaError] = useState('')
  const [objectType, setObjectType] = useState<'table' | 'view'>('table')
  const [objectName, setObjectName] = useState('')
  const [database, setDatabase] = useState<string>('')
  const [schema, setSchema] = useState<string>('')

  const dispatch = useDispatch()

  const schemaObjectGroup = useAppSelector(state => selectSchemaObjectGroup(state, schemaObjectGroupName))
  const objectExists = useMemo(() => {
    return !!schemaObjectGroup &&
      schemaObjectGroupDataObjectExists(schemaObjectGroup, {database, schema, objectName})
  }, [database, schema, objectName, objectType, schemaObjectGroup])

  const databases = useAppSelector(state => state.databases)
  const schemata = useMemo(() => {
    const db = databases.find(db => db.name === database)
    if (!db) return [] as string[]
    return db.schemata.map(s => s.name)
  }, [database, databases])

  const handleChangeObjectType = (e: SelectChangeEvent) => {
    setObjectType(e.target.value as 'table' | 'view')
    if (!objectExists) setNameError('')
  }

  const handleChangeDatabase = (e: SelectChangeEvent) => {
    setDatabase(e.target.value)
    setSchema('')
    if (!objectExists) setNameError('')
    setDatabaseError('')
  }

  const handleChangeSchema = (e: SelectChangeEvent) => {
    setSchema(e.target.value)
    if (!objectExists) setNameError('')
    setSchemaError('')
  }

  const handleChangeObjectName = (identifier: string) => {
    setObjectName(identifier)
    if (!objectExists) setNameError('')
  }

  const handleAddObject = () => {
    const payload: SchemaObjectGroupObjectPayload = {
      schemaObjectGroupName,
      name: objectName,
      databaseName: database,
      schemaName: schema
    }

    let valid = true
    if ('' === objectName) {
      setNameError('Name cannot be empty')
      valid = false
    }
    if (objectExists) {
      setNameError('Object already exists in this Schema Object Group')
      valid = false
    }
    if ('' === schema) {
      setSchemaError('Schema must be selected')
      valid = false
    }
    if ('' === database) {
      setDatabaseError('Database must be selected')
      valid = false
    }

    if (!valid) return

    switch (objectType) {
    case 'table':
      dispatch(addTableToSchemaObjectGroup(payload))
      break
    case 'view':
      dispatch(addViewToSchemaObjectGroup(payload))
      break
    }
    setObjectName('')
    setNameError('')
  }

  return (
    <>

      <FormControl sx={{m: 1, minWidth: 100}}>
        <InputLabel id="type-select-label">Object Type</InputLabel>
        <Select
          labelId="type-select-label"
          id="type-select"
          value={objectType}
          label="Object Type"
          onChange={handleChangeObjectType}
        >
          <MenuItem value={'table'}>Table</MenuItem>
          <MenuItem value={'view'}>View</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{m: 1, minWidth: 160}} error={!!databaseError}>
        <InputLabel id="database-select-label">Database</InputLabel>
        <Select
          labelId="database-select-label"
          id="database-select"
          value={database}
          label="Database"
          onChange={handleChangeDatabase}
        >
          {databases.map(db => {
            return <MenuItem key={db.name} value={db.name}>{db.name}</MenuItem>
          })}
        </Select>
        <FormHelperText>{databaseError}</FormHelperText>
      </FormControl>

      <FormControl sx={{m: 1, minWidth: 160}} error={!!schemaError}>
        <InputLabel id="schema-select-label">Schema</InputLabel>
        <Select
          labelId="schema-select-label"
          id="schema-select"
          value={schema}
          label="Schema"
          onChange={handleChangeSchema}
        >
          {schemata.map(s => {
            return <MenuItem key={s} value={s}>{s}</MenuItem>
          })}
        </Select>
        <FormHelperText>{schemaError}</FormHelperText>
      </FormControl>

      <NewSnowflakeIdentifierTextField value={objectName} onChange={handleChangeObjectName}
        onSubmit={handleAddObject} error={!!nameError} helperText={nameError}
        enforceUnquotedIdentifiers={enforceUnquotedIdentifiers}
        label={`${capitalize(objectType)} Name`} variant="filled" fullWidth={false}
        sx={{m: 1, minWidth: 300}}
      />
      <Button sx={{m: 2}} variant="contained" onClick={handleAddObject} endIcon={<AddCircleIcon/>}>
        Add
      </Button>
    </>
  )
}

export default AddDataObject
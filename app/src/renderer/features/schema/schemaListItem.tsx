import React, {FunctionComponent, memo, useEffect, useState} from 'react'
import {Box, IconButton, ListItem, ListItemIcon, ListItemText, Stack, useTheme} from '@mui/material'
import SchemaIcon from '@mui/icons-material/Schema'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/CheckCircle'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {
  addSchema,
  removeSchema,
  renameSchema,
  selectDatabaseSchemaExists,
  setSchemaEnvironmentOptions,
  setSchemaOptions
} from '../databases/databasesSlice'
import {Schema} from './schema'
import {EnvironmentOptions} from '../options/options'
import {SchemaOptions} from 'roleout-lib/build/objects/schema'
import optionsForm from '../options/optionsForm'
import SchemaOptionsFormBlock from './schemaOptionsFormBlock'
import EditableSnowflakeIdentifierTextField from '../forms/EditableSnowflakeIdentifierTextField'
import {DatabaseOptions} from 'roleout-lib/build/objects/database'
import ErrorCaption from '../errorCaption'
import {INVALID_UNQUOTED_IDENTIFIER_REGEX} from '../../identifiers'

interface Props {
  databaseName: string
  databaseOptions: DatabaseOptions
  databaseEnvironmentOptions: EnvironmentOptions<DatabaseOptions>
  schema: Schema
  onSubmit?: () => void
}

const SchemaListItem: FunctionComponent<Props> = ({
  databaseName,
  databaseOptions,
  databaseEnvironmentOptions,
  schema,
  onSubmit
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(schema.name === '')
  const [newName, setNewName] = useState<string>(schema.name)
  const [error, setError] = useState<string>('')

  const environments = useAppSelector(state => state.environments)
  const existingSchema = useAppSelector(state => selectDatabaseSchemaExists(state, {
    database: databaseName,
    schema: newName
  }))
  const showAdvancedOptions = useAppSelector(state => state.options.showAdvancedOptions)
  const enforceUnquotedIdentifiers = useAppSelector(state => state.project.enforceUnquotedIdentifiers)

  const dispatch = useAppDispatch()
  const theme = useTheme()

  useEffect(() => {
    if (enforceUnquotedIdentifiers && schema.name.match(INVALID_UNQUOTED_IDENTIFIER_REGEX)) {
      setError('Name contains invalid characters for an unquoted identifier, but "Enforce Unquoted Identifiers" is enabled.')
    } else {
      setError('')
    }
  }, [enforceUnquotedIdentifiers, schema.name])

  const handleNameChange = (identifier: string) => setNewName(identifier)

  const handleNameSubmit = () => {
    if (newName !== '' && newName !== schema.name) {
      if (existingSchema) {
        setError('Schema with that name already exists')
        return
      }
      if (schema.name === '') {
        dispatch(addSchema({
          database: databaseName,
          schema: newName,
          environments,
          optionsSet: {options: schema.options, environmentOptions: schema.environmentOptions}
        }))
      } else {
        dispatch(renameSchema({database: databaseName, schema: schema.name, newName: newName}))
      }
    }
    setIsEditing(false)
    onSubmit && onSubmit()
  }

  const handleDelete = () => dispatch(removeSchema({database: databaseName, schema: schema.name}))

  const setOptions = (options: SchemaOptions) => setSchemaOptions({
    database: databaseName,
    schema: schema.name,
    options
  })

  const setEnvironmentOptions = (environmentOptions: EnvironmentOptions<SchemaOptions>) => setSchemaEnvironmentOptions({
    database: databaseName,
    schema: schema.name,
    environmentOptions
  })

  const SchemaOptionsForm = optionsForm<SchemaOptions, DatabaseOptions>({
    setOptions,
    setEnvironmentOptions,
    OptionsFormBlock: SchemaOptionsFormBlock,
  })

  return (
    <ListItem sx={{pl: 6, pt: 0, mb: showAdvancedOptions ? 3 : 0, ':hover': {backgroundColor: theme.palette.divider}}}>
      <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
        <Box sx={{width: '100%', display: 'flex', alignItems: 'center', mb: 1}}>
          <ListItemIcon><SchemaIcon/></ListItemIcon>
          {isEditing ?
            <React.Fragment>
              <EditableSnowflakeIdentifierTextField value={newName} error={!!error}
                enforceUnquotedIdentifiers={enforceUnquotedIdentifiers}
                helperText={error}
                onChange={handleNameChange} onSubmit={handleNameSubmit}
                fullWidth={true}/>
              <IconButton color="primary" aria-label="save" onClick={handleNameSubmit}>
                <SaveIcon/>
              </IconButton>
            </React.Fragment>
            :
            <React.Fragment>
              <Stack sx={{width: '100%'}}>
                <ListItemText primary={schema.name} secondary={schema.name ? null : 'Schema Name'}/>
                {error &&
                  <ErrorCaption text={error}/>
                }
              </Stack>
              <IconButton color="primary" aria-label="edit schema" onClick={() => setIsEditing(true)}>
                <EditIcon/>
              </IconButton>
              <IconButton color="primary" aria-label="delete schema" onClick={handleDelete}>
                <DeleteIcon/>
              </IconButton>
            </React.Fragment>
          }
        </Box>
        {showAdvancedOptions && schema.name !== '' &&
          <Box>
            <SchemaOptionsForm options={schema.options} environmentOptions={schema.environmentOptions}
              parentOptions={databaseOptions} parentEnvironmentOptions={databaseEnvironmentOptions}/>
          </Box>
        }
      </Box>
    </ListItem>
  )
}

export default memo(SchemaListItem)

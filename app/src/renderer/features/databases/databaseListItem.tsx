import React, {FunctionComponent, useCallback, useEffect, useMemo, useState} from 'react'
import {Box, Button, IconButton, List, ListItem, ListItemIcon, ListItemText, Stack} from '@mui/material'
import StorageIcon from '@mui/icons-material/Storage'
import DeleteIcon from '@mui/icons-material/Delete'
import {Database} from './database'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import SchemaListItem from '../schema/schemaListItem'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {removeDatabase, renameDatabase, schemaFactory, selectDatabases} from './databasesSlice'
import {find} from 'lodash'
import SaveIcon from '@mui/icons-material/CheckCircle'
import EditIcon from '@mui/icons-material/Edit'
import DatabaseOptionsForm from './databaseOptionsForm'
import EditableSnowflakeIdentifierTextField from '../forms/EditableSnowflakeIdentifierTextField'
import ErrorCaption from '../errorCaption'
import {INVALID_UNQUOTED_IDENTIFIER_REGEX} from '../../identifiers'

interface Props {
  database: Database
}

const DatabaseListItem: FunctionComponent<Props> = ({database}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [newName, setNewName] = useState<string>(database.name)
  const [error, setError] = useState<string>('')
  const [isAddingSchema, setIsAddingSchema] = useState(false)

  const dispatch = useAppDispatch()

  const databases = useAppSelector(selectDatabases)
  const environments = useAppSelector(state => state.environments)
  const showAdvancedOptions: boolean = useAppSelector(state => state.options.showAdvancedOptions)
  const enforceUnquotedIdentifiers = useAppSelector(state => state.project.enforceUnquotedIdentifiers)

  const schemaContent = useMemo(() => {
    return database.schemata.map(schema => (
      <SchemaListItem key={schema.name} databaseName={database.name} databaseOptions={database.options}
        databaseEnvironmentOptions={database.environmentOptions} schema={schema}/>
    ))
  }, [database.schemata, database.options, database.environmentOptions])

  useEffect(() => {
    if (enforceUnquotedIdentifiers && database.name.match(INVALID_UNQUOTED_IDENTIFIER_REGEX)) {
      setError('Name contains invalid characters for an unquoted identifier, but "Enforce Unquoted Identifiers" is enabled.')
    } else {
      setError('')
    }
  }, [enforceUnquotedIdentifiers, database.name])

  const onSchemaSubmit = useCallback(() => {
    setIsAddingSchema(false)
  }, [])

  const handleDelete = () => dispatch(removeDatabase(database.name))

  const handleAddSchema = () => setIsAddingSchema(true)

  const handleChangeName = (identifier: string) => setNewName(identifier)

  const handleSubmitName = () => {
    if (newName !== '' && newName !== database.name) {
      if (find(databases, db => db.name === newName)) {
        setError('Database with that name already exists')
        return
      }
      dispatch(renameDatabase({name: database.name, newName: newName}))
    }
    setIsEditing(false)
  }

  return (
    <React.Fragment>
      <ListItem sx={{pb: showAdvancedOptions ? 4 : 0}}>
        <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
          <Box sx={{width: '100%', display: 'flex', alignItems: 'center', mb: 1}}>
            <ListItemIcon><StorageIcon/></ListItemIcon>
            {isEditing ?
              <>
                <EditableSnowflakeIdentifierTextField variant="standard" value={newName} error={!!error}
                  enforceUnquotedIdentifiers={enforceUnquotedIdentifiers}
                  helperText={error}
                  onChange={handleChangeName}
                  onSubmit={handleSubmitName} fullWidth={true}/>
                <IconButton color="primary" aria-label="save" onClick={handleSubmitName}>
                  <SaveIcon/>
                </IconButton>
              </>
              :
              <>
                <Stack sx={{width: '100%'}}>
                  <ListItemText primary={database.name} secondary={database.name ? null : 'Database Name'}/>
                  {error &&
                    <ErrorCaption text={error} />
                  }
                </Stack>
                <IconButton color="primary" aria-label="edit database" onClick={() => setIsEditing(true)}>
                  <EditIcon/>
                </IconButton>
                <IconButton color="primary" aria-label="delete database" onClick={handleDelete}>
                  <DeleteIcon/>
                </IconButton>
              </>
            }
          </Box>
          {showAdvancedOptions &&
            <Box>
              <DatabaseOptionsForm database={database}/>
            </Box>
          }
        </Box>
      </ListItem>
      <List>
        {schemaContent}
        {
          isAddingSchema &&
          <SchemaListItem key="adding-schema" databaseName={database.name}
            databaseOptions={database.options} databaseEnvironmentOptions={database.environmentOptions}
            schema={schemaFactory('', environments)}
            onSubmit={onSchemaSubmit}/>
        }
        <ListItem sx={{pl: 6}}>
          <Button variant="contained" onClick={handleAddSchema} endIcon={<AddCircleIcon/>}>
            Add Schema
          </Button>
        </ListItem>
      </List>
    </React.Fragment>
  )

}

export default DatabaseListItem

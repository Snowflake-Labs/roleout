import React, {FunctionComponent, useEffect, useState} from 'react'
import {
  Box,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  SvgIconTypeMap,
  useTheme
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {find} from 'lodash'
import SaveIcon from '@mui/icons-material/CheckCircle'
import EditIcon from '@mui/icons-material/Edit'
import {ActionCreator, PayloadAction} from '@reduxjs/toolkit'
import {AddAction, HasName} from '../../app/slices'
import {RootState} from '../../app/store'
import {OverridableComponent} from '@mui/material/OverridableComponent'
import {AdvancedOptionable, isAdvancedOptionable} from '../options/options'
import EditableSnowflakeIdentifierTextField from '../forms/EditableSnowflakeIdentifierTextField'
import ErrorCaption from '../errorCaption'
import {INVALID_UNQUOTED_IDENTIFIER_REGEX} from '../../identifiers'

interface Props<A, B extends Record<string, any>> {
  item: A
  itemType: string
  Icon: OverridableComponent<SvgIconTypeMap> & { muiName: string }
  selectorFn: (state: RootState) => A[]
  addAction: ActionCreator<AddAction<B>>
  removeAction: ActionCreator<PayloadAction<string>>
  updateAction: ActionCreator<PayloadAction<{ name: string, newName: string }>>
  AdvancedOptionsForm?: FunctionComponent<AdvancedOptionable<B>>
}

const EditableListItem = <A extends HasName, B extends Record<string, any>>({
  item,
  itemType,
  Icon,
  selectorFn,
  addAction,
  removeAction,
  updateAction,
  AdvancedOptionsForm
}: Props<A, B>) => {
  const dispatch = useAppDispatch()

  const theme = useTheme()

  const showAdvancedOptions: boolean = useAppSelector(state => state.options.showAdvancedOptions)
  const items = useAppSelector(selectorFn)
  const enforceUnquotedIdentifiers = useAppSelector(state => state.project.enforceUnquotedIdentifiers)

  const [isEditing, setIsEditing] = useState<boolean>(item.name === '')
  const [newName, setNewName] = useState<string>(item.name)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (enforceUnquotedIdentifiers && item.name?.match(INVALID_UNQUOTED_IDENTIFIER_REGEX)) {
      setError('Name contains invalid characters for an unquoted identifier, but "Enforce Unquoted Identifiers" is enabled.')
    } else {
      setError('')
    }
  }, [enforceUnquotedIdentifiers, item.name])

  const handleNameChange = (identifier: string) => setNewName(identifier)

  const handleNameSubmit = () => {
    if (newName !== '' && newName !== item.name) {
      if (find(items, i => i.name === newName)) {
        setError(`${itemType} with that name already exists`)
        return
      }
      if (item.name === '') {
        dispatch(addAction(newName))
      } else {
        dispatch(updateAction({name: item.name, newName: newName}))
      }
    }
    setIsEditing(false)
  }

  const handleDelete = () => dispatch(removeAction(item.name))

  return (
    <ListItem>
      <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
        <Box sx={{width: '100%', display: 'flex', alignItems: 'center', mb: 1}}>
          <ListItemIcon><Icon/></ListItemIcon>
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
                <ListItemText primary={item.name} secondary={item.name ? null : `${itemType} Name`}/>
                {error &&
                  <ErrorCaption text={error}/>
                }
              </Stack>
              <IconButton color="primary" aria-label={`edit ${itemType.toLowerCase()} name`}
                onClick={() => setIsEditing(true)}>
                <EditIcon/>
              </IconButton>
              <IconButton color="primary" aria-label={`delete ${itemType.toLowerCase()}`}
                onClick={handleDelete}>
                <DeleteIcon/>
              </IconButton>
            </React.Fragment>
          }
        </Box>
        {showAdvancedOptions && AdvancedOptionsForm && isAdvancedOptionable<B>(item) &&
          <AdvancedOptionsForm name={item.name} options={item.options} environmentOptions={item.environmentOptions}/>
        }
      </Box>
    </ListItem>
  )
}

export default EditableListItem
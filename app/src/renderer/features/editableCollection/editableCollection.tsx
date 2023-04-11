import React, {FunctionComponent, useMemo, useState} from 'react'
import {Box, Button, Grid, List, ListItem, ListItemText, Paper, SvgIconTypeMap} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {OverridableComponent} from '@mui/material/OverridableComponent'
import {RootState} from '../../app/store'
import {ActionCreator, PayloadAction} from '@reduxjs/toolkit'
import EditableCollectionListItem from './editableCollectionListItem'
import {AddAction, HasName} from '../../app/slices'
import {AvsAnSimple} from '../../util'
import Divider from '@mui/material/Divider'
import {AdvancedOptionable} from '../options/options'
import AdvancedOptionsSlider from '../options/advancedOptionsSlider'
import NewSnowflakeIdentifierTextField from '../forms/NewSnowflakeIdentifierTextField'

interface Props<A, B extends Record<string, any>> {
  itemType: string
  Icon: OverridableComponent<SvgIconTypeMap> & { muiName: string }
  selectorFn: (state: RootState) => A[]
  addAction: ActionCreator<AddAction<B>>
  removeAction: ActionCreator<PayloadAction<string>>
  updateAction: ActionCreator<PayloadAction<{ name: string, newName: string }>>
  AdvancedOptionsForm?: FunctionComponent<AdvancedOptionable<B>>
}

const EditableCollection = <A extends HasName, B extends Record<string, any>>(props: Props<A, B>) => {
  const {
    itemType,
    selectorFn,
    addAction,
  } = props

  const items = useAppSelector(selectorFn)
  const environments = useAppSelector(state => state.environments)
  const enforceUnquotedIdentifiers = useAppSelector(state => state.project.enforceUnquotedIdentifiers)

  const dispatch = useAppDispatch()

  const [newName, setNewName] = useState<string>('')

  const itemsContent = useMemo(() => {
    if (items.length > 0) {
      return items.map(item => <EditableCollectionListItem key={item.name} item={item} {...props} />).flatMap(e => [
        <Divider key={e.key + '-divider'}/>, e]).slice(1)
    }
    return <ListItem><ListItemText secondary={`Add ${AvsAnSimple.query(itemType)} ${itemType} above`}/></ListItem>
  }, [items])

  const handleNewItemChange = (identifier: string) => {
    setNewName(identifier)
  }

  const handleNewItemSubmit = () => {
    if(newName === '') return
    dispatch(addAction({name: newName, props: undefined, environments}))
    setNewName('')
  }

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      margin="0 auto"
    >
      <Grid container gap={2} alignItems="center">
        <Grid item xs={6}>
          <NewSnowflakeIdentifierTextField value={newName}
            enforceUnquotedIdentifiers={enforceUnquotedIdentifiers}
            onChange={handleNewItemChange} onSubmit={handleNewItemSubmit}
            label={`${itemType} Name`} variant="filled"
            fullWidth={true}/>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" onClick={handleNewItemSubmit} endIcon={<AddCircleIcon/>}>
            Add
          </Button>
        </Grid>
        {!!props.AdvancedOptionsForm &&
          <Grid item>
            <AdvancedOptionsSlider/>
          </Grid>
        }
        <Grid item xs={12}>
          <Paper variant="outlined">
            <List>
              {itemsContent}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default EditableCollection
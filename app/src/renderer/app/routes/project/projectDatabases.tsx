import React, {FunctionComponent, useMemo, useState} from 'react'
import {Box, Button, Grid, List, ListItem, ListItemText, Paper} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import {useAppDispatch, useAppSelector} from '../../hooks'
import DatabaseListItem from '../../../features/databases/databaseListItem'
import {addDatabase, selectDatabases} from '../../../features/databases/databasesSlice'
import Divider from '@mui/material/Divider'
import AdvancedOptionsSlider from '../../../features/options/advancedOptionsSlider'
import NewSnowflakeIdentifierTextField from '../../../features/forms/NewSnowflakeIdentifierTextField'

const ProjectDatabases: FunctionComponent<Record<string, unknown>> = () => {
  const databases = useAppSelector(selectDatabases)
  const environments = useAppSelector(state => state.environments)
  const enforceUnquotedIdentifiers = useAppSelector(state => state.project.enforceUnquotedIdentifiers)
  const dispatch = useAppDispatch()
  const [newDatabaseName, setNewDatabaseName] = useState('')

  const databasesContent = useMemo(() => {
    if (databases.length > 0) {
      return databases.map(db => <DatabaseListItem key={db.name} database={db}/>).flatMap(e => [<Divider
        key={e.key + '-divider'}/>, e]).slice(1)
    }
    return <ListItem><ListItemText secondary="Add a database above"/></ListItem>
  }, [databases])

  const handleNewDatabaseSubmit = () => {
    if(newDatabaseName === '') return
    dispatch(addDatabase({name: newDatabaseName, environments}))
    setNewDatabaseName('')
  }

  const handleNewDatabaseChange = (identifier: string) => {
    setNewDatabaseName(identifier)
  }

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      margin="0 auto"
    >
      <Grid container gap={2} alignItems="center">
        <Grid item xs={6}>
          <NewSnowflakeIdentifierTextField value={newDatabaseName} onChange={handleNewDatabaseChange}
            onSubmit={handleNewDatabaseSubmit} enforceUnquotedIdentifiers={enforceUnquotedIdentifiers}
            label="Database Name" variant="filled" fullWidth={true}
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" onClick={handleNewDatabaseSubmit} endIcon={<AddCircleIcon/>}>
            Add
          </Button>
        </Grid>
        <Grid item>
          <AdvancedOptionsSlider/>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <List>
              {databasesContent}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProjectDatabases

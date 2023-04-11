import React, {FunctionComponent, useMemo, useState} from 'react'
import {Box, Button, Card, Grid, List, Paper, Typography} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import {useAppDispatch, useAppSelector} from '../../hooks'
import {
  addSchemaObjectGroup,
  selectSchemaObjectGroups
} from '../../../features/schemaObjectGroups/schemaObjectGroupsSlice'
import SchemaObjectGroupListItem from '../../../features/schemaObjectGroups/schemaObjectGroupListItem'
import NewSnowflakeIdentifierTextField from '../../../features/forms/NewSnowflakeIdentifierTextField'

export const ProjectSchemaObjectGroups: FunctionComponent<Record<string, unknown>> = () => {
  const environments = useAppSelector(state => state.environments)
  const schemaObjectGroups = useAppSelector(selectSchemaObjectGroups)
  const dispatch = useAppDispatch()
  const [newSchemaObjectGroupName, setNewSchemaObjectGroupName] = useState('')

  const schemaObjectGroupsContent = useMemo(() => {
    if (schemaObjectGroups.length > 0) {
      return schemaObjectGroups.map(sog => <SchemaObjectGroupListItem key={sog.name} schemaObjectGroup={sog}/>)
    }
    return (
      <Card><Typography>Add a schemaObjectGroup above</Typography></Card>
    )
  }, [schemaObjectGroups])

  const handleNewSchemaObjectGroupSubmit = () => {
    if (newSchemaObjectGroupName === '') return
    dispatch(addSchemaObjectGroup({name: newSchemaObjectGroupName, environments}))
    setNewSchemaObjectGroupName('')
  }

  const handleNewSchemaObjectGroupChange = (identifier: string) => {
    setNewSchemaObjectGroupName(identifier)
  }

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      margin="0 auto"
    >
      <Grid container gap={2} alignItems="center">
        <Grid item xs={6}>
          <NewSnowflakeIdentifierTextField value={newSchemaObjectGroupName} onChange={handleNewSchemaObjectGroupChange}
            onSubmit={handleNewSchemaObjectGroupSubmit}
            enforceUnquotedIdentifiers={false}
            label="Group Name" variant="filled" fullWidth={true}
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" onClick={handleNewSchemaObjectGroupSubmit} endIcon={<AddCircleIcon/>}>
            Add
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
              {schemaObjectGroupsContent}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProjectSchemaObjectGroups
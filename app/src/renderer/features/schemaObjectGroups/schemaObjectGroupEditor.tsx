import React, {FunctionComponent, useState} from 'react'
import DataObjectGroupEditor from './dataObjectGroupEditor'
import {Link as RouterLink, useNavigate, useParams} from 'react-router-dom'
import {removeSchemaObjectGroup, selectSchemaObjectGroup, updateSchemaObjectGroup} from './schemaObjectGroupsSlice'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack
} from '@mui/material'
import AddDataObject from './addDataObject'
import EditableHeader from '../editableHeader/editableHeader'

export const SchemaObjectGroupEditor: FunctionComponent<Record<string, unknown>> = () => {
  const {name} = useParams()
  if (name === undefined) throw new Error('Invalid name')
  const schemaObjectGroup = useAppSelector(state => selectSchemaObjectGroup(state, name))
  if (!schemaObjectGroup) throw new Error(`No schema object group exists with name '${name}'`)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleClickDelete = () => {
    setDeleteDialogOpen(true)
  }

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false)
  }

  const handleDelete = () => {
    dispatch(removeSchemaObjectGroup(schemaObjectGroup.name))
    navigate('/project/schema-object-groups')
  }

  const handleNameChange = (newName: string) => {
    if (newName !== '' && newName !== schemaObjectGroup.name) {
      dispatch(updateSchemaObjectGroup({name: schemaObjectGroup.name, newName}))
      navigate(`/project/schema-object-groups/${encodeURI(newName)}`)
    }
  }

  return (
    <>
      <Box width="100%">
        <Button component={RouterLink} to="/project/schema-object-groups">&lt;&lt; Back</Button>
        <Stack direction="row" justifyContent="space-between">
          <EditableHeader text={schemaObjectGroup.name} onTextUpdate={handleNameChange} />
          <Button onClick={handleClickDelete} sx={{height: 36}} variant="contained" color="error">Delete</Button>
        </Stack>
        <AddDataObject schemaObjectGroupName={schemaObjectGroup.name}/>
        <Grid container spacing={2}>
          <DataObjectGroupEditor schemaObjectGroup={schemaObjectGroup} dataObjectType="tables"/>
          <DataObjectGroupEditor schemaObjectGroup={schemaObjectGroup} dataObjectType="views"/>
        </Grid>
      </Box>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle id="delete-dialog-title">
          {'Delete this schema object group?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete the schema object group &apos;{schemaObjectGroup.name}&apos;?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SchemaObjectGroupEditor
import React, {FunctionComponent, useMemo} from 'react'
import {SchemaObjectGroup} from './schemaObjectGroup'
import {Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography} from '@mui/material'
import {capitalize, sortBy} from 'lodash'
import Paper from '@mui/material/Paper'
import DeleteIcon from '@mui/icons-material/Delete'
import {useAppDispatch} from '../../app/hooks'
import {removeTableFromSchemaObjectGroup, removeViewFromSchemaObjectGroup} from './schemaObjectGroupsSlice'
import StorageIcon from '@mui/icons-material/Storage'
import SchemaIcon from '@mui/icons-material/Schema'
import TableChartIcon from '@mui/icons-material/TableChart'

export interface Props {
  schemaObjectGroup: SchemaObjectGroup
  dataObjectType: 'tables' | 'views'
}

export const DataObjectGroupEditor: FunctionComponent<Props> = ({schemaObjectGroup, dataObjectType}) => {
  const dispatch = useAppDispatch()
  const title = capitalize(dataObjectType)

  const handleDelete = (databaseName: string, schemaName: string, objectName: string) => {
    switch(dataObjectType) {
    case 'tables':
      dispatch(removeTableFromSchemaObjectGroup({schemaObjectGroupName: schemaObjectGroup.name, databaseName, schemaName, name: objectName}))
      break
    case 'views':
      dispatch(removeViewFromSchemaObjectGroup({schemaObjectGroupName: schemaObjectGroup.name, databaseName, schemaName, name: objectName}))
      break
    }
  }

  const objectsContent = useMemo(() => {
    const elems: any[] = []
    for(const [database, schemata] of sortBy(Object.entries(schemaObjectGroup.objects), ([db, s]) => db)) {
      let databaseHasObjects = false
      elems.push(<ListItem key={`database-${database}`}><ListItemIcon><StorageIcon/></ListItemIcon><ListItemText>{database}</ListItemText></ListItem>)
      for(const schema of Object.keys(schemata).sort()) {
        const objects = schemata[schema][dataObjectType]
        if(objects.length > 0) {
          databaseHasObjects = true
          elems.push(<ListItem key={`database-${database}-schema-${schema}`} sx={{pl: 4}}><ListItemIcon><SchemaIcon/></ListItemIcon><ListItemText>{schema}</ListItemText></ListItem>)
          elems.push(objects.map(obj => {
            return (
              <ListItem key={`${dataObjectType}-${obj}`} sx={{pl: 8}}>
                <ListItemIcon><TableChartIcon/></ListItemIcon>
                <ListItemText>{obj}</ListItemText>
                <IconButton color="primary" aria-label={`delete ${dataObjectType.toLowerCase()}`}
                  onClick={_ => handleDelete(database, schema, obj)}>
                  <DeleteIcon/>
                </IconButton>
              </ListItem>
            )
          }))
        }
      }

      if(!databaseHasObjects) elems.pop() // remove database from list if it had no objects
    }
    return elems
  }, [schemaObjectGroup.objects])

  return (
    <Grid item md={6} xs={12} style={{marginTop: 20}}>
      <Typography variant="h5">{title}</Typography>
      <Paper>
        <List>
          {objectsContent}
        </List>
      </Paper>
    </Grid>
  )
}

export default DataObjectGroupEditor
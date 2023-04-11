import React, {FunctionComponent} from 'react'
import { Link, ListItem, ListItemIcon, ListItemText} from '@mui/material'
import {SchemaObjectGroup} from './schemaObjectGroup'
import {Link as RouterLink} from 'react-router-dom'
import TableViewIcon from '@mui/icons-material/TableView'

export interface Props {
  schemaObjectGroup: SchemaObjectGroup
}

export const SchemaObjectGroupListItem: FunctionComponent<Props> = ({schemaObjectGroup}) => {
  return (
    <ListItem>
      <ListItemIcon>
        <TableViewIcon/>
      </ListItemIcon>
      <ListItemText primary={<Link component={RouterLink}
        to={`/project/schema-object-groups/${encodeURI(schemaObjectGroup.name)}`}>{schemaObjectGroup.name}</Link>}
      />
    </ListItem>
  )
}

export default SchemaObjectGroupListItem
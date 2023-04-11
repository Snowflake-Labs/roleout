import React, {FunctionComponent, memo} from 'react'
import {SchemaObjectGroupAccessLevel} from 'roleout-lib/access/schemaObjectGroupAccessLevel'
import {useTheme} from '@mui/material'
import {styled} from '@mui/material/styles'
import UnstyledTableCell, {tableCellClasses} from '@mui/material/TableCell'
import {useAppDispatch} from '../../app/hooks'
import {setSchemaObjectGroupAccess} from './schemaObjectGroupsSlice'

type Props = {
  schemaObjectGroupName: string
  functionalRoleName: string
  state?: SchemaObjectGroupAccessLevel
  environmentName?: string
}

const TableCell = styled(UnstyledTableCell)(({theme}) => ({
  [`&.${tableCellClasses.body}`]: {
    borderRight: '1px solid',
    borderColor: theme.palette.divider,
    textAlign: 'center',
    cursor: 'pointer',
    minWidth: '8.25em',
    height: '3em',
    userSelect: 'none',
    padding: '4px'
  },
}))

const SchemaObjectGroupAccessPicker: FunctionComponent<Props> = ({
  schemaObjectGroupName,
  functionalRoleName,
  environmentName,
  state
}) => {
  const dispatch = useAppDispatch()

  const theme = useTheme()

  const setState = (newState: SchemaObjectGroupAccessLevel | null) => {
    dispatch(setSchemaObjectGroupAccess({
      name: schemaObjectGroupName,
      role: functionalRoleName,
      level: newState,
      environment: environmentName
    }))
  }

  const handleClick = () => {
    if (state === SchemaObjectGroupAccessLevel.ReadWrite) {
      setState(null)
    } else if (state === undefined) {
      setState(SchemaObjectGroupAccessLevel.Read)
    } else {
      setState(state + 1)
    }
  }

  const cell = (text?: string, color?: string) => {
    if (text) {
      return (
        <TableCell onClick={handleClick} sx={{p: 0, backgroundColor: color}}>
          {text}
        </TableCell>
      )
    } else {
      return (
        <TableCell onClick={handleClick} sx={{p: 0}}>
          &nbsp;
        </TableCell>
      )
    }
  }

  switch (state) {
  case undefined:
    return cell()
  case SchemaObjectGroupAccessLevel.Read:
    return cell('Read', theme.palette.primary.main)
  case SchemaObjectGroupAccessLevel.ReadWrite:
    return cell('ReadWrite', theme.palette.secondary.main)
  }
}

export default memo(SchemaObjectGroupAccessPicker)

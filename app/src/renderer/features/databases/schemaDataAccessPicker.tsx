import React, {FunctionComponent, memo, useMemo} from 'react'
import {DataAccessLevel} from 'roleout-lib/access/dataAccessLevel'
import {useTheme} from '@mui/material'
import {styled} from '@mui/material/styles'
import UnstyledTableCell, {tableCellClasses} from '@mui/material/TableCell'
import {useAppDispatch} from '../../app/hooks'
import {setSchemaAccess} from './databasesSlice'

type Props = {
  databaseName: string
  schemaName: string
  functionalRoleName: string
  state?: DataAccessLevel
  databaseState?: DataAccessLevel
  environmentName?: string
}

const TableCell = styled(UnstyledTableCell)(({theme}) => ({
  [`&.${tableCellClasses.body}`]: {
    borderRight: '1px solid',
    borderColor: theme.palette.divider,
    textAlign: 'center',
    cursor: 'pointer',
    minWidth: '5.5em',
    height: '3em',
    userSelect: 'none',
    padding: '4px'
  },
}))


const SchemaDataAccessPicker: FunctionComponent<Props> = ({
  databaseName,
  schemaName,
  functionalRoleName,
  environmentName,
  state,
  databaseState
}) => {
  const dispatch = useAppDispatch()
  const theme = useTheme()

  const setState = (newState: DataAccessLevel | null) => {
    dispatch(setSchemaAccess({
      database: databaseName,
      schema: schemaName,
      role: functionalRoleName,
      level: newState,
      environment: environmentName
    }))
  }

  const handleClick = () => {
    if (state === DataAccessLevel.Full) {
      setState(null)
    } else if (state === undefined) {
      setState(DataAccessLevel.Read)
    } else {
      setState(state + 1)
    }
  }

  const grayedOut = useMemo(() => {
    return databaseState !== null && databaseState !== undefined && state !== null && state !== undefined && state <= databaseState
  }, [state, databaseState])

  switch (state) {
  case undefined:
    return (
      <TableCell onClick={handleClick}>
        &nbsp;
      </TableCell>
    )
  case DataAccessLevel.Read:
    return (
      <TableCell onClick={handleClick}
        sx={{backgroundColor: grayedOut ? theme.palette.grey.A400 : theme.palette.primary.main, textDecoration: grayedOut ? 'line-through' : 'none'}}>
        Read
      </TableCell>
    )
  case DataAccessLevel.ReadWrite:
    return (
      <TableCell onClick={handleClick}
        sx={{backgroundColor: grayedOut ? theme.palette.grey.A400 : theme.palette.secondary.main, textDecoration: grayedOut ? 'line-through' : 'none'}}>
        ReadWrite
      </TableCell>
    )
  case DataAccessLevel.Full:
    return (
      <TableCell onClick={handleClick}
        sx={{backgroundColor: grayedOut ? theme.palette.grey.A400 : theme.palette.warning.main, textDecoration: grayedOut ? 'line-through' : 'none'}}>
        Full
      </TableCell>
    )
  }
}

export default memo(SchemaDataAccessPicker)

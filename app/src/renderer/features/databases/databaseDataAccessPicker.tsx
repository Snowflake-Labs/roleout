import React, {FunctionComponent, memo} from 'react'
import {DataAccessLevel} from 'roleout-lib/access/dataAccessLevel'
import {useTheme} from '@mui/material'
import {styled} from '@mui/material/styles'
import UnstyledTableCell, {tableCellClasses} from '@mui/material/TableCell'
import {useAppDispatch} from '../../app/hooks'
import {setDatabaseAccess} from './databasesSlice'

type Props = {
  databaseName: string
  functionalRoleName: string
  state?: DataAccessLevel
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


const DatabaseDataAccessPicker: FunctionComponent<Props> = ({
  databaseName,
  functionalRoleName,
  environmentName,
  state
}) => {
  const dispatch = useAppDispatch()
  const theme = useTheme()

  const setState = (newState: DataAccessLevel | null) => {
    dispatch(setDatabaseAccess({
      database: databaseName,
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

  switch (state) {
  case undefined:
    return (
      <TableCell onClick={handleClick}>
        &nbsp;
      </TableCell>
    )
  case DataAccessLevel.Read:
    return (
      <TableCell onClick={handleClick} sx={{backgroundColor: theme.palette.primary.main}}>
        Read
      </TableCell>
    )
  case DataAccessLevel.ReadWrite:
    return (
      <TableCell onClick={handleClick} sx={{backgroundColor: theme.palette.secondary.main}}>
        ReadWrite
      </TableCell>
    )
  case DataAccessLevel.Full:
    return (
      <TableCell onClick={handleClick} sx={{backgroundColor: theme.palette.warning.main}}>
        Full
      </TableCell>
    )
  }
}

export default memo(DatabaseDataAccessPicker)

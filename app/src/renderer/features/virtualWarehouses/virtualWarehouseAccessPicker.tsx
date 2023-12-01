import React, {FunctionComponent, memo} from 'react'
import {VirtualWarehouseAccessLevel} from 'roleout-lib/access/virtualWarehouseAccessLevel'
import {useTheme} from '@mui/material'
import {styled} from '@mui/material/styles'
import UnstyledTableCell, {tableCellClasses} from '@mui/material/TableCell'
import {useAppDispatch} from '../../app/hooks'
import {setVirtualWarehouseAccess} from './virtualWarehousesSlice'

type Props = {
  virtualWarehouseName: string
  functionalRoleName: string
  state?: VirtualWarehouseAccessLevel
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

const VirtualWarehouseAccessPicker: FunctionComponent<Props> = ({
  virtualWarehouseName,
  functionalRoleName,
  environmentName,
  state
}) => {
  const dispatch = useAppDispatch()

  const theme = useTheme()

  const setState = (newState: VirtualWarehouseAccessLevel | null) => {
    dispatch(setVirtualWarehouseAccess({
      name: virtualWarehouseName,
      role: functionalRoleName,
      level: newState,
      environment: environmentName
    }))
  }

  const handleClick = () => {
    if (state === VirtualWarehouseAccessLevel.Full) {
      setState(null)
    } else if (state === undefined) {
      setState(VirtualWarehouseAccessLevel.Usage)
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
  case VirtualWarehouseAccessLevel.Usage:
    return cell('Usage', theme.palette.success.main)
  case VirtualWarehouseAccessLevel.UsageMonitor:
    return cell('Usage + Monitor', theme.palette.secondary.main)
  case VirtualWarehouseAccessLevel.Monitor:
    return cell('Monitor', theme.palette.info.main)
  case VirtualWarehouseAccessLevel.Full:
    return cell('Full', theme.palette.warning.main)
  }
}

export default memo(VirtualWarehouseAccessPicker)

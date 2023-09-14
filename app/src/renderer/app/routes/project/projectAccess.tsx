import React, {FunctionComponent, useEffect, useMemo, useState} from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import UnstyledTableCell, {tableCellClasses} from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {styled} from '@mui/material/styles'
import SchemaDataAccessPicker from '../../../features/databases/SchemaDataAccessPicker'
import {useAppSelector} from '../../hooks'
import {max} from 'lodash'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import {Box, Select, Typography, useTheme} from '@mui/material'
import VirtualWarehouseAccessPicker from '../../../features/virtualWarehouses/virtualWarehouseAccessPicker'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import {SelectChangeEvent} from '@mui/material/Select'
import SchemaObjectGroupAccessPicker from '../../../features/schemaObjectGroups/schemaObjectGroupAccessPicker'
import {selectSchemaObjectGroups} from '../../../features/schemaObjectGroups/schemaObjectGroupsSlice'
import DatabaseDataAccessPicker from '../../../features/databases/databaseDataAccessPicker'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const TabPanel: FunctionComponent<TabPanelProps> = (props: TabPanelProps) => {
  const {children, value, index, ...other} = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <React.Fragment>{children}</React.Fragment>
      )}
    </div>
  )
}

const ProjectAccess = () => {
  const databases = useAppSelector(state => state.databases)
  const schemaObjectGroups = useAppSelector(selectSchemaObjectGroups)
  const virtualWarehouses = useAppSelector(state => state.virtualWarehouses)
  const functionalRoles = useAppSelector(state => state.functionalRoles)
  const environmentsEnabled = useAppSelector(state => state.project.environmentsEnabled)
  const schemaObjectGroupsEnabled = useAppSelector(state => state.project.schemaObjectGroupsEnabled)
  const environments = useAppSelector(state => state.environments)

  const calculateMaxTableHeight = (windowHeight: number) => windowHeight - 180
  const calculateMaxTableWidth = (windowWidth: number) => windowWidth - 300
  const [environment, setEnvironment] = useState(environmentsEnabled && environments.length > 0 ? environments[0] : undefined)
  const [index, setIndex] = useState(0)
  const [maxTableHeight, setMaxTableHeight] = useState(calculateMaxTableHeight(window.innerHeight))
  const [maxTableWidth, setMaxTableWidth] = useState(calculateMaxTableWidth(window.innerWidth))

  const theme = useTheme()

  const TableCell = styled(UnstyledTableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.background.paper,
      position: 'sticky',
      top: 0
    },
    [`&.${tableCellClasses.head} span.nowrap`]: {
      whiteSpace: 'nowrap'
    },
    [`&.${tableCellClasses.head}.header`]: {
      verticalAlign: 'bottom'
    },
    [`&.${tableCellClasses.head}.rotated`]: {
      height: rotatedHeaderHeightInCh + 'ch',
      paddingBottom: '2px',
      verticalAlign: 'bottom',
    },
    [`&.${tableCellClasses.head}.rotated > div`]: {
      width: 30,
      transformOrigin: 'bottom left',
      transform: 'translateX(25px) rotate(-45deg)',
    },
    [`&.${tableCellClasses.body}`]: {
      borderRight: '1px solid',
      borderRightColor: theme.palette.divider
    },
  }))

  useEffect(() => {
    const handleResize = () => {
      setMaxTableHeight(calculateMaxTableHeight(window.innerHeight))
      setMaxTableWidth(calculateMaxTableWidth(window.innerWidth))
    }
    window.addEventListener('resize', handleResize)
  })

  const dataAccessChildren = useMemo(() => {
    return databases.map(database => (
      <React.Fragment key={database.name}>
        <TableRow>
          <TableCell>{database.name}</TableCell>
          <TableCell></TableCell>
          {functionalRoles.map((functionalRole, i) => (
            <DatabaseDataAccessPicker key={functionalRole.name} databaseName={database.name}
              functionalRoleName={functionalRole.name} environmentName={environment?.name}
              state={database.access[functionalRole.name]?.find(a => a.environment === environment?.name)?.level}/>
          ))}
        </TableRow>
        {database.schemata.map((schema, i) => (
          <React.Fragment key={database.name + '.' + schema.name}>
            <TableRow>
              {i === 0 && <TableCell rowSpan={database.schemata.length}></TableCell>}
              <TableCell colSpan={1}>{schema.name}</TableCell>
              {functionalRoles.map(functionalRole => (
                <SchemaDataAccessPicker key={functionalRole.name} databaseName={database.name} schemaName={schema.name}
                  functionalRoleName={functionalRole.name} environmentName={environment?.name}
                  databaseState={database.access[functionalRole.name]?.find(a => a.environment === environment?.name)?.level}
                  state={schema.access[functionalRole.name]?.find(a => a.environment === environment?.name)?.level}/>
              ))}
            </TableRow>
          </React.Fragment>
        ))}
      </React.Fragment>
    ))
  }, [databases, functionalRoles, environments, environment])

  const schemaObjectGroupAccessChildren = useMemo(() => {
    return schemaObjectGroups.map(schemaObjectGroup => (
      <React.Fragment key={schemaObjectGroup.name}>
        <TableRow>
          <TableCell>{schemaObjectGroup.name}</TableCell>

          {functionalRoles.map(functionalRole => (
            <SchemaObjectGroupAccessPicker key={functionalRole.name} schemaObjectGroupName={schemaObjectGroup.name}
              functionalRoleName={functionalRole.name} environmentName={environment?.name}
              state={schemaObjectGroup.access[functionalRole.name]?.find(a => a.environment === environment?.name)?.level}/>
          ))}
        </TableRow>
      </React.Fragment>
    ))
  }, [schemaObjectGroups, functionalRoles, environments, environment])

  const virtualWarehouseAccessChildren = useMemo(() => {
    return virtualWarehouses.map(virtualWarehouse => (
      <React.Fragment key={virtualWarehouse.name}>
        <TableRow>
          <TableCell>{virtualWarehouse.name}</TableCell>

          {functionalRoles.map(functionalRole => (
            <VirtualWarehouseAccessPicker key={functionalRole.name} virtualWarehouseName={virtualWarehouse.name}
              functionalRoleName={functionalRole.name} environmentName={environment?.name}
              state={virtualWarehouse.access[functionalRole.name]?.find(a => a.environment === environment?.name)?.level}/>
          ))}
        </TableRow>
      </React.Fragment>
    ))
  }, [virtualWarehouses, functionalRoles, environments, environment])

  const rotatedHeaderHeightInCh = useMemo(() => {
    return (6 + Math.ceil(.707 * (max(functionalRoles.map(fr => fr.name.length)) ?? 140)))
  }, [functionalRoles])
  const rotatedHeaderRightPaddingInCh = useMemo(() => {
    return Math.ceil(rotatedHeaderHeightInCh / 2)
  }, [rotatedHeaderHeightInCh])

  const showSchemaObjectGroups = useMemo(() => {
    return schemaObjectGroupsEnabled && schemaObjectGroups.length > 0
  }, [schemaObjectGroups, schemaObjectGroupsEnabled])

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setIndex(newValue)
  }

  const handleEnvironmentChange = (event: SelectChangeEvent) => {
    const newEnvironment = environments.find(env => env.name === event.target.value as string)
    setEnvironment(newEnvironment)
  }

  if (environmentsEnabled && environments.length === 0) {
    return (
      <Box sx={{width: '100%'}}>
        <Typography>You must add at least one environment before designing access.</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{minWidth: maxTableWidth, maxWidth: maxTableWidth}}>
      {environmentsEnabled && environments.length > 0 && (
        <Box display="flex" flexDirection="row-reverse">
          <FormControl sx={{maxWidth: 300, minWidth: 200}}>
            <InputLabel id="env-select-label">Environment</InputLabel>
            <Select
              labelId="env-select-label"
              id="env-select"
              value={environment?.name}
              label="Environment"
              onChange={handleEnvironmentChange}
            >
              {environments.map(env => (
                <MenuItem key={env.name} value={env.name}>{env.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={index} onChange={handleTabChange} aria-label="access tabs">
          <Tab label="Databases"/>
          {showSchemaObjectGroups &&
            <Tab label="Schema Object Groups"/>
          }
          <Tab label="Virtual Warehouses"/>
        </Tabs>
      </Box>
      <TabPanel value={index} index={0}>
        <TableContainer sx={{
          backgroundColor: theme.palette.background.paper,
          minHeight: maxTableHeight,
          maxHeight: maxTableHeight,
          pr: rotatedHeaderRightPaddingInCh + 'ch'
        }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="header"><h3>Database</h3></TableCell>
                <TableCell className="header"><h3>Schema</h3></TableCell>
                {functionalRoles.map((fr, i) => (
                  <TableCell sx={{zIndex: functionalRoles.length - i}} key={fr.name} className="rotated">
                    <div><span className="nowrap">{fr.name}</span></div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody component={Paper}>
              {dataAccessChildren}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      {showSchemaObjectGroups &&
        <TabPanel value={index} index={1}>
          <TableContainer sx={{
            backgroundColor: theme.palette.background.paper,
            minHeight: maxTableHeight,
            maxHeight: maxTableHeight,
            pr: rotatedHeaderRightPaddingInCh + 'ch'
          }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="header"><h3>Schema Object Group</h3></TableCell>
                  {functionalRoles.map((fr, i) => (
                    <TableCell sx={{zIndex: functionalRoles.length - i}} key={fr.name} className="rotated">
                      <div><span className="nowrap">{fr.name}</span></div>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody component={Paper}>
                {schemaObjectGroupAccessChildren}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      }
      <TabPanel value={index} index={showSchemaObjectGroups ? 2 : 1}>
        <TableContainer sx={{
          backgroundColor: theme.palette.background.paper,
          minHeight: maxTableHeight,
          maxHeight: maxTableHeight,
          pr: rotatedHeaderRightPaddingInCh + 'ch'
        }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="header"><h3>Virtual Warehouse</h3></TableCell>
                {functionalRoles.map((fr, i) => (
                  <TableCell sx={{zIndex: functionalRoles.length - i}} key={fr.name} className="rotated">
                    <div><span className="nowrap">{fr.name}</span></div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody component={Paper}>
              {virtualWarehouseAccessChildren}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </Box>
  )
}

export default ProjectAccess

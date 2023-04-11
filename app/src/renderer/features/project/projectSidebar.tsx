import React, {FunctionComponent} from 'react'
import DatabaseIcon from '@mui/icons-material/Storage'
import VirtualWarehouseIcon from '@mui/icons-material/Computer'
import FunctionalRoleIcon from '@mui/icons-material/People'
import AccessIcon from '@mui/icons-material/SettingsAccessibility'
import ProjectIcon from '@mui/icons-material/Folder'
import SaveIcon from '@mui/icons-material/SaveAlt'
import NavItem from '../navItem'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import {Box, Button, Stack} from '@mui/material'
import styled from '@emotion/styled'
import {identity} from 'lodash'
import {stateToRoleoutYAML} from './project'
import {useSelector} from 'react-redux'
import {RootState} from '../../app/store'
import DeployButton from './deployButton'
import EnvironmentsIcon from '@mui/icons-material/Widgets'
import NamingIcon from '@mui/icons-material/Abc'
import FileSaver from 'file-saver'
import TableViewIcon from '@mui/icons-material/TableView'

const items = [
  {
    href: '/project/index',
    icon: (<ProjectIcon/>),
    title: 'Project'
  },
  {
    href: '/project/environments',
    icon: (<EnvironmentsIcon/>),
    title: 'Environments',
    enabled: (state: RootState) => {return state.project.environmentsEnabled}
  },
  {
    href: '/project/databases',
    icon: (<DatabaseIcon/>),
    title: 'Databases'
  },
  {
    href: '/project/schema-object-groups',
    icon: (<TableViewIcon/>),
    title: 'Schema Object Groups',
    enabled: (state: RootState) => {return state.project.schemaObjectGroupsEnabled}
  },
  {
    href: '/project/virtual-warehouses',
    icon: (<VirtualWarehouseIcon/>),
    title: 'Virtual Warehouses'
  },
  {
    href: '/project/functional-roles',
    icon: (<FunctionalRoleIcon/>),
    title: 'Functional Roles'
  },
  {
    href: '/project/access',
    icon: (<AccessIcon/>),
    title: 'Access'
  },
  {
    href: '/project/naming-convention',
    icon: (<NamingIcon/>),
    title: 'Naming Convention'
  },
]

const drawerWidth = 230

const ProjectNav = styled(List)<{ component?: React.ElementType }>({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
})

const ProjectSidebar: FunctionComponent<Record<string, unknown>> = () => {
  const rootState = useSelector<RootState, RootState>(identity)

  const handleSaveProjectFile = async () => {
    const blob = new Blob([stateToRoleoutYAML(rootState)], {type: 'text/plain;charset=utf-8'})
    FileSaver.saveAs(blob, rootState.project.name + '.yml')
  }

  const canDeploy = (rootState.databases.length > 0 || rootState.virtualWarehouses.length > 0) && rootState.functionalRoles.length > 0

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{overflow: 'auto'}}>
        <Stack gap={1} sx={{margin: 2}}>
          <Button variant="contained" startIcon={<SaveIcon/>} onClick={handleSaveProjectFile}>
            Save Project
          </Button>
          <DeployButton enabled={canDeploy}/>
        </Stack>
        <Divider/>
        <ProjectNav>
          {items.filter(item => !item.enabled || item.enabled(rootState)).map(item => (
            <NavItem key={item.href} href={item.href} icon={item.icon} title={item.title}/>
          ))}
        </ProjectNav>
      </Box>
    </Drawer>
  )
}

export default ProjectSidebar

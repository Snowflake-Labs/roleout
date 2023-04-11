import React, {FunctionComponent, ReactNode} from 'react'
import {ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme} from '@mui/material'
import {NavLink} from 'react-router-dom'

interface Props {
  href: string
  icon: ReactNode
  title: string
}

export const NavItem: FunctionComponent<Props> = ({href, icon, title}) => {
  const theme = useTheme()

  return (
    <ListItem key={href} disablePadding>
      <NavLink to={href} title={title} style={{width: '100%', textDecoration: 'none'}}>
        {({isActive}) => (
          <ListItemButton
            sx={{
              color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
              '& .MuiListItemIcon-root': {
                color: isActive ? theme.palette.primary.main : theme.palette.text.primary
              },
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={title} primaryTypographyProps={{ fontWeight: 'bold' }}/>
          </ListItemButton>
        )}
      </NavLink>
    </ListItem>
  )
}

export default NavItem
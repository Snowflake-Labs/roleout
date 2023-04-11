import React, {FunctionComponent, ReactNode} from 'react'
import {AppBar, Box, Typography} from '@mui/material'
import Toolbar from '@mui/material/Toolbar'

interface Props {
  children: ReactNode | ReactNode[]
}

export const HomeLayout: FunctionComponent<Props> = ({children}) => {
  return (
    <Box sx={{display: 'flex'}}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h1" noWrap component="div">
            Roleout
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3
        }}
      >
        <Toolbar/>
        <Box sx={{pt: 2, display: 'flex'}}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default HomeLayout

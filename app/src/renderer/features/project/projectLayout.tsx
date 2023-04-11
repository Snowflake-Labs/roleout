import React, {FunctionComponent, ReactNode} from 'react'
import {Box} from '@mui/material'
import ProjectSidebar from './projectSidebar'

interface Props {
  children: ReactNode | ReactNode[]
}

export const ProjectLayout: FunctionComponent<Props> = ({children}) => {
  return (
    <Box sx={{display: 'flex'}}>
      <ProjectSidebar/>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3
        }}
      >
        <Box sx={{pt: 2, display: 'flex'}}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default ProjectLayout

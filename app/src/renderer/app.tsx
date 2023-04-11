import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import CssBaseline from '@mui/material/CssBaseline'
import {store} from './app/store'
import {Provider} from 'react-redux'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/economica/700.css'
import {MemoryRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './app/routes/home'
import Project from './app/routes/project'
import ProjectDatabases from './app/routes/project/projectDatabases'
import ProjectFunctionalRoles from './app/routes/project/projectFunctionalRoles'
import ProjectVirtualWarehouses from './app/routes/project/projectVirtualWarehouses'
import ProjectAccess from './app/routes/project/projectAccess'
import ProjectDeploy from './app/routes/project/projectDeploy'
import ProjectIndex from './app/routes/project/projectIndex'
import ProjectEnvironments from './app/routes/project/projectEnvironments'
import ProjectNamingConvention from './app/routes/project/projectNamingConvention'
import ProjectSchemaObjectGroups from './app/routes/project/projectSchemaObjectGroups'
import SchemaObjectGroupEditor from './features/schemaObjectGroups/schemaObjectGroupEditor'

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          neutral: {
            main: '#64748B',
            contrastText: '#fff',
          }
        },
        typography: {
          h1: {
            fontSize: '3rem',
            fontFamily: 'Economica',
            background:
              'linear-gradient( 170deg,rgb(207, 253, 255) 0%, rgb(181, 251, 255) 50%, rgb(66, 192, 199) 100%)',
            backgroundClip: 'text',
            color: 'transparent'

          },
          h2: {
            fontSize: '2rem',
          },
          h6: {
            fontSize: '1rem',
          }
        }
      }),
    [prefersDarkMode],
  )

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/project" element={<Project/>}>
              <Route path="environments" element={<ProjectEnvironments/>}/>
              <Route path="databases" element={<ProjectDatabases/>}/>
              <Route path="virtual-warehouses" element={<ProjectVirtualWarehouses/>}/>
              <Route path="functional-roles" element={<ProjectFunctionalRoles/>}/>
              <Route path="access" element={<ProjectAccess/>}/>
              <Route path="naming-convention" element={<ProjectNamingConvention/>}/>
              <Route path="deploy" element={<ProjectDeploy/>}/>
              <Route path="schema-object-groups">
                <Route index element={<ProjectSchemaObjectGroups/>}/>
                <Route path=":name" element={<SchemaObjectGroupEditor/>}/>
              </Route>
              <Route path="index" element={<ProjectIndex/>}/>
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  )
}

export default App

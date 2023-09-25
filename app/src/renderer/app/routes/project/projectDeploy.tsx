import React, {FunctionComponent, useEffect, useState} from 'react'
import {Project} from 'roleout-lib/project'
import {identity} from 'lodash'
import {RootState} from '../../store'
import {useSelector} from 'react-redux'
import {Backend} from 'roleout-lib/backends/backend'
import {SQLBackend} from 'roleout-lib/backends/sqlBackend'
import {TerraformBackend} from 'roleout-lib/backends/terraformBackend'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, {SelectChangeEvent} from '@mui/material/Select'
import {Box, Button, Grid, Paper, Stack, TextareaAutosize, Typography} from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import FileSaver from 'file-saver'
import {stateToRoleoutYAML} from '../../../features/project/project'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import JSZip from 'jszip'

enum BackendType {
  Terraform = 'Terraform',
  SQL = 'SQL'
}

const ProjectDeploy: FunctionComponent<Record<string, unknown>> = () => {
  const state: RootState = useSelector<RootState, RootState>(identity)

  const [selectedBackend, setSelectedBackend] = useState<BackendType>(BackendType.SQL)
  const [deploymentPreview, setDeploymentPreview] = useState(new Map<string, string>())
  const [tabIndex, setTabIndex] = useState(0)

  useEffect(() => {
    setDeploymentPreview(getDeployment())
  }, [selectedBackend])

  const getDeployment = (): Map<string, string> => {
    const project: Project = Project.fromYAML(stateToRoleoutYAML(state))

    let backend: Backend
    switch (selectedBackend) {
    case BackendType.SQL:
      backend = new SQLBackend
      break
    case BackendType.Terraform:
      backend = new TerraformBackend
      break
    }

    return backend.deploy(project)
  }

  const handleDeploy = async () => {
    const filename = state.project.name + '.zip'
    const zip = new JSZip()
    getDeployment().forEach((contents, filename) => {
      zip.file(filename, contents)
    })
    const blob = await zip.generateAsync({type: 'blob'})
    FileSaver.saveAs(blob, filename)
  }

  const handleBackendChange = (event: SelectChangeEvent) => {
    setSelectedBackend(BackendType[event.target.value as keyof typeof BackendType])
    setTabIndex(0)
  }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
  }

  interface TabPanelProps {
    children?: React.ReactNode
    index: number
    currentIndex: number
  }

  function TabPanel(props: TabPanelProps) {
    const {children, currentIndex, index, ...other} = props

    return (
      <div
        role="tabpanel"
        hidden={currentIndex !== index}
        {...other}
      >
        {currentIndex === index && (
          <Box sx={{p: 3}}>
            {children}
          </Box>
        )}
      </div>
    )
  }

  return (
    <Grid
      container
      justifyContent="center"
      spacing={4}
      alignItems="center"
    >
      <Grid item>
        <FormControl fullWidth sx={{minWidth: 240}}>
          <InputLabel id="backend-select-label">Deployment Backend</InputLabel>
          <Select
            labelId="backend-select-label"
            id="backend-select"
            value={selectedBackend.toString()}
            label="Deployment Backend"
            onChange={handleBackendChange}
          >
            {[BackendType.Terraform, BackendType.SQL].map(b => (
              <MenuItem key={b} value={b}>{b}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <Button
          color="success"
          onClick={handleDeploy}
          startIcon={<DownloadIcon/>}
          variant="contained"
        >
          Download Deployment Files
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={1}>
          <Typography variant="h5">Deployment Preview</Typography>
          <Paper variant="outlined" sx={{p: 3, maxWidth: {xs: 320, sm: 500, md: 780, lg: 960, xl: '100%'}}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
              <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="deployment preview tabs"
              >
                {Array.from(deploymentPreview.entries()).map(([filename,]) => (
                  <Tab key={filename} label={filename}/>
                ))}
              </Tabs>
            </Box>
            {Array.from(deploymentPreview.entries()).map(([, contents], i) => (
              <TabPanel key={i} currentIndex={tabIndex} index={i}>
                <TextareaAutosize
                  aria-label="deployment preview"
                  maxRows={24}
                  minRows={10}
                  style={{width: '100%'}}
                  placeholder=""
                  value={contents}
                  disabled
                />
              </TabPanel>
            ))}
          </Paper>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default ProjectDeploy

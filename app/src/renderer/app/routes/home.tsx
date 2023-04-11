import React, {FunctionComponent} from 'react'
import {Button, Grid, Paper, Typography} from '@mui/material'
import HomeLayout from '../../features/home/homeLayout'
import AddIcon from '@mui/icons-material/AddCircle'
import OpenIcon from '@mui/icons-material/Folder'
import {useAppDispatch} from '../hooks'
import {setIsLoaded, setName} from '../../features/project/projectSlice'
import {useNavigate} from 'react-router-dom'
import {loadRoleoutYAML} from '../store'

const Home: FunctionComponent<Record<string, unknown>> = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleNewProject = () => {
    dispatch(setName('My New Project'))
    dispatch(setIsLoaded(true))
    navigate('/project/index')
  }

  const handleOpenProject = async () => {
    const contents = await window.electronAPI.openFile()
    if(contents) {
      loadRoleoutYAML(contents, dispatch)
      dispatch(setIsLoaded(true))
      navigate('/project/index')
    }
  }

  return (
    <HomeLayout>
      <Paper sx={{m: '0 auto'}}>
        <Grid container p={10} gap={4}>
          <Grid item xs={12}>
            <Typography textAlign="center" variant="h2">Welcome! Let&apos;s get started.</Typography>
          </Grid>
          <Grid container gap={2} justifyContent="center">
            <Grid item>
              <Button variant="contained" startIcon={<AddIcon/>} onClick={handleNewProject}>Create New Project</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" startIcon={<OpenIcon/>} onClick={handleOpenProject}>Open Existing Project</Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </HomeLayout>
  )
}

export default Home
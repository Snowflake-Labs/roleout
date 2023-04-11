import React, {FunctionComponent, useEffect} from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import ProjectLayout from '../../features/project/projectLayout'
import {useAppSelector} from '../hooks'

const Project: FunctionComponent<Record<string, unknown>> = () => {
  const navigate = useNavigate()

  const isLoaded = useAppSelector(state => state.project.isLoaded)

  useEffect(() => {
    if(!isLoaded) navigate('/')
  }, [isLoaded])

  if(!isLoaded) return <></>

  return (
    <ProjectLayout>
      <Outlet/>
    </ProjectLayout>
  )
}

export default Project

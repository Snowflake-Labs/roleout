import React, {FunctionComponent} from 'react'
import {Box, Button, Tooltip} from '@mui/material'
import DeployIcon from '@mui/icons-material/DataObject'
import {useNavigate} from 'react-router-dom'

interface Props {
  enabled: boolean
}

const deployButton: FunctionComponent<Props> = ({enabled}) => {
  const navigate = useNavigate()

  if (enabled) {
    return (
      <Button color="success" variant="contained" startIcon={<DeployIcon/>} onClick={() => navigate('deploy')}>
        Deploy
      </Button>
    )
  }

  return (
    <Tooltip title="Add databases/virtual warehouses and functional roles before deploying">
      <Box>
        <Button disabled variant="contained" startIcon={<DeployIcon/>} sx={{width: '100%'}}>
          Deploy
        </Button>
      </Box>
    </Tooltip>
  )
}

export default deployButton
import React, {FunctionComponent} from 'react'
import {Typography, useTheme} from '@mui/material'

export interface Props {
  text: string
}

export const ErrorCaption: FunctionComponent<Props> = ({text}) => {
  const theme = useTheme()

  return (
    <Typography variant="caption" color={theme.palette.error.main}>{text}</Typography>
  )
}

export default ErrorCaption
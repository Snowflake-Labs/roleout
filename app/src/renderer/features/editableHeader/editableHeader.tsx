import React, {useState} from 'react'
import {Typography, TextField, Box} from '@mui/material'
import styled from '@emotion/styled'

interface EditableHeaderProps {
  text: string
  onTextUpdate: (newText: string) => void
}

const StyledTextField = styled(TextField)`
  .MuiInputBase-input {
    font-size: 1.8rem;
    font-weight: normal;
  }
`

const StyledHeader = styled(Typography)`
  font-size: 1.8rem;
  padding-bottom: 1rem;
`

const EditableHeader: React.FC<EditableHeaderProps> = ({text, onTextUpdate}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [headerText, setHeaderText] = useState(text)

  const handleClick = () => {
    setIsEditing(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeaderText(e.target.value)
  }

  const handleBlur = () => {
    setIsEditing(false)
    onTextUpdate(headerText)
  }

  const handleKeyUp = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      setIsEditing(false)
      onTextUpdate(headerText)
    }
  }

  return (
    <Box onClick={!isEditing ? handleClick : undefined} mb={2}>
      {isEditing ? (
        <StyledTextField
          value={headerText}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyUp={handleKeyUp}
          autoFocus
          fullWidth
          variant="standard"
        />
      ) : (
        <StyledHeader variant="h2">{headerText}</StyledHeader>
      )}
    </Box>
  )
}

export default EditableHeader

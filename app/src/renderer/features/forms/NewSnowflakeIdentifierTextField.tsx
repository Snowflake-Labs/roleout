import {TextField} from '@mui/material'
import React, {ChangeEvent, FunctionComponent, useEffect, useRef, useState} from 'react'
import {IdentifierType, stripInvalidCharacters} from '../../identifiers'

interface Props {
  value: string
  onChange: (identifier: string) => any
  onSubmit: () => any
  enforceUnquotedIdentifiers: boolean

  [childProps: string]: unknown
}

const NewSnowflakeIdentifierTextField: FunctionComponent<Props> = ({
  value,
  onChange,
  onSubmit,
  enforceUnquotedIdentifiers,
  ...childProps
}) => {
  const [cursorPos, setCursorPos] = useState<number | null>(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const ele = inputRef.current
    if (ele) ele.setSelectionRange(cursorPos, cursorPos)
  }, [inputRef, cursorPos, value])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCursorPos(e.target.selectionStart)
    const newIdentifier = stripInvalidCharacters(e.target.value, enforceUnquotedIdentifiers ? IdentifierType.Unquoted : IdentifierType.DoubleQuoted)
    onChange(newIdentifier)
    if (newIdentifier !== '') setError('')
  }

  const handleKeyUp = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    if (value !== '') {
      const success = onSubmit()
      if(success) onChange('')
    } else {
      setError('Name cannot be empty')
    }
  }

  return (
    <TextField inputRef={inputRef} value={value} error={!!error} helperText={error}
      onChange={handleChange} onSubmit={handleSubmit}
      onKeyUp={handleKeyUp}
      {...childProps}
    />
  )
}

export default NewSnowflakeIdentifierTextField
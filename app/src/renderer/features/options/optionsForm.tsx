import React, {FunctionComponent} from 'react'
import {EnvironmentOptions} from './options'
import {Paper, Stack, Typography, useTheme} from '@mui/material'
import {useAppSelector} from '../../app/hooks'
import {Environment} from '../environments/environment'
import produce, {castDraft} from 'immer'

export interface OptionsFormProps<Options, ParentOptions> {
  options: Options
  setOptions: (options: Options) => any
  parentOptions?: ParentOptions
}

export interface CurriedProps<Options, ParentOptions> {
  setOptions: (options: Options) => any
  setEnvironmentOptions: (environmentOptions: EnvironmentOptions<Options>) => unknown
  OptionsFormBlock: FunctionComponent<OptionsFormProps<Options, ParentOptions>>
}

export interface Props<Options, ParentOptions> {
  options: Options
  environmentOptions: EnvironmentOptions<Options>
  parentOptions?: ParentOptions
  parentEnvironmentOptions?: EnvironmentOptions<ParentOptions>
}

export const optionsForm = <Options, ParentOptions = never>({
  setOptions,
  setEnvironmentOptions,
  OptionsFormBlock
}: CurriedProps<Options, ParentOptions>) => {
  // eslint-disable-next-line react/display-name
  return ({options, environmentOptions, parentOptions, parentEnvironmentOptions}: Props<Options, ParentOptions>) => {
    const environmentsEnabled = useAppSelector(state => state.project.environmentsEnabled)
    const environments = useAppSelector(state => state.environments)
    const theme = useTheme()

    const handleSetEnvironmentOptions = (environment: Environment, options: Options) =>
      setEnvironmentOptions(produce(environmentOptions, draft => {
        draft[environment.name] = castDraft(options)
      }))

    if (environmentsEnabled) {
      return (
        <Stack spacing={1}>
          {environments.map(environment => (
            <Paper key={environment.name} sx={{p: 1}}>
              <Stack spacing={1}>
                <Typography color={theme.palette.text.secondary}
                  variant="body2">{environment.name} Options</Typography>
                <OptionsFormBlock options={environmentOptions[environment.name]}
                  setOptions={opts => handleSetEnvironmentOptions(environment, opts)}
                  parentOptions={parentEnvironmentOptions ? parentEnvironmentOptions[environment.name] : undefined}
                />
              </Stack>
            </Paper>
          ))}
        </Stack>
      )
    }

    return (
      <Paper>
        <OptionsFormBlock options={options} setOptions={setOptions} parentOptions={parentOptions}/>
      </Paper>
    )
  }
}

export default optionsForm

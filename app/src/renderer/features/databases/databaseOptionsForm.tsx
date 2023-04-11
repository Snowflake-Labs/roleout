import {FunctionComponent} from 'react'
import {optionsForm} from '../options/optionsForm'
import {EnvironmentOptions} from '../options/options'
import {DatabaseOptions} from 'roleout-lib/build/objects/database'
import {setDatabaseEnvironmentOptions, setDatabaseOptions} from './databasesSlice'
import DatabaseOptionsFormBlock from './databaseOptionsFormBlock'
import {Database} from './database'

interface Props {
  database: Database
}

const DatabaseOptionsForm: FunctionComponent<Props> = ({database}) => {
  const setOptions = (options: DatabaseOptions) => setDatabaseOptions({name: database.name, options})
  const setEnvironmentOptions = (environmentOptions: EnvironmentOptions<DatabaseOptions>) => setDatabaseEnvironmentOptions({
    name: database.name,
    environmentOptions
  })

  return optionsForm<DatabaseOptions>({
    setOptions,
    setEnvironmentOptions,
    OptionsFormBlock: DatabaseOptionsFormBlock
  })({options: database.options, environmentOptions: database.environmentOptions})
}

export default DatabaseOptionsForm

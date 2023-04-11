import {FunctionComponent} from 'react'
import {optionsForm} from '../options/optionsForm'
import {setVirtualWarehouseEnvironmentOptions, setVirtualWarehouseOptions} from './virtualWarehousesSlice'
import {VirtualWarehouseOptions} from 'roleout-lib/build/objects/virtualWarehouse'
import {EnvironmentOptions} from '../options/options'
import VirtualWarehouseOptionsFormBlock from './virtualWarehouseOptionsFormBlock'

interface Props {
  name: string,
  options: VirtualWarehouseOptions,
  environmentOptions: EnvironmentOptions<VirtualWarehouseOptions>
}

const VirtualWarehouseOptionsForm: FunctionComponent<Props> = ({name, options, environmentOptions}) => {
  const setOptions = (options: VirtualWarehouseOptions) => setVirtualWarehouseOptions({
    name,
    options
  })
  const setEnvironmentOptions = (environmentOptions: EnvironmentOptions<VirtualWarehouseOptions>) => setVirtualWarehouseEnvironmentOptions({
    name,
    environmentOptions
  })

  return optionsForm<VirtualWarehouseOptions>({
    setOptions,
    setEnvironmentOptions,
    OptionsFormBlock: VirtualWarehouseOptionsFormBlock
  })({options, environmentOptions})
}

export default VirtualWarehouseOptionsForm

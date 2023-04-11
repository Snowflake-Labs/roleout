import React, {FunctionComponent} from 'react'
import {
  addVirtualWarehouse,
  removeVirtualWarehouse,
  updateVirtualWarehouse
} from '../../../features/virtualWarehouses/virtualWarehousesSlice'
import ComputerIcon from '@mui/icons-material/Computer'
import EditableCollection from '../../../features/editableCollection/editableCollection'
import VirtualWarehouseOptionsForm from '../../../features/virtualWarehouses/virtualWarehouseOptionsForm'
import {VirtualWarehouse} from '../../../features/virtualWarehouses/virtualWarehouse'
import {VirtualWarehouseOptions} from 'roleout-lib/build/objects/virtualWarehouse'

const ProjectVirtualWarehouses: FunctionComponent<Record<string, unknown>> = () => {
  return <EditableCollection<VirtualWarehouse, VirtualWarehouseOptions> itemType="Virtual Warehouse"
    Icon={ComputerIcon}
    selectorFn={(state) => state.virtualWarehouses}
    addAction={addVirtualWarehouse}
    removeAction={removeVirtualWarehouse}
    updateAction={updateVirtualWarehouse}
    AdvancedOptionsForm={VirtualWarehouseOptionsForm}/>
}

export default ProjectVirtualWarehouses

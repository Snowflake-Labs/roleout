import React, {FunctionComponent} from 'react'
import {addEnvironment, removeEnvironment, updateEnvironment} from '../../../features/environments/environmentsSlice'
import EditableCollection from '../../../features/editableCollection/editableCollection'
import EnvironmentIcon from '@mui/icons-material/Widgets'

const ProjectEnvironments: FunctionComponent<Record<string, unknown>> = () => {
  return <EditableCollection itemType="Environment" Icon={EnvironmentIcon}
    selectorFn={(state) => state.environments} addAction={addEnvironment}
    removeAction={removeEnvironment} updateAction={updateEnvironment}/>
}

export default ProjectEnvironments

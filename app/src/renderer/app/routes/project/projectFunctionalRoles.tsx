import React, {FunctionComponent} from 'react'
import {
  addFunctionalRole,
  removeFunctionalRole,
  updateFunctionalRole
} from '../../../features/functionalRoles/functionalRolesSlice'
import EditableCollection from '../../../features/editableCollection/editableCollection'
import GroupIcon from '@mui/icons-material/PeopleAlt'

const ProjectFunctionalRoles: FunctionComponent<Record<string, unknown>> = () => {
  return <EditableCollection itemType="Functional Role" Icon={GroupIcon}
    selectorFn={(state) => state.functionalRoles} addAction={addFunctionalRole}
    removeAction={removeFunctionalRole} updateAction={updateFunctionalRole}/>
}

export default ProjectFunctionalRoles

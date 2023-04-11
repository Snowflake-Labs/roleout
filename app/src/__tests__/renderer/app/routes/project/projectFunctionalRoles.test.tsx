import React from 'react'
import '@testing-library/jest-dom'
import {renderWithProviders} from '../../../../testUtils'
import {screen} from '@testing-library/react'
import ProjectFunctionalRoles from '../../../../../renderer/app/routes/project/projectFunctionalRoles'

describe('ProjectFunctionalRoles', () => {
  const testRoles = ['ANALYST', 'ELT', 'DEVOPS']
  it('should render correctly', () => {
    const preloadedState = {functionalRoles: testRoles.map(role => ({name: role}))}
    expect(renderWithProviders(<ProjectFunctionalRoles/>, {preloadedState})).toMatchSnapshot()
    testRoles.forEach(role =>
      expect(screen.getByText(role)).toBeInTheDocument()
    )
  })
})
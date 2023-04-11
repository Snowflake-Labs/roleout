import React from 'react'
import '@testing-library/jest-dom'
import {renderWithProviders} from '../../../../testUtils'
import {screen} from '@testing-library/react'
import ProjectEnvironments from '../../../../../renderer/app/routes/project/projectEnvironments'

describe('ProjectEnvironments', () => {
  const testEnvironments = ['PROD', 'DEV', 'TEST']
  it('should render correctly', () => {
    const preloadedState = {environments: testEnvironments.map(env => ({name: env}))}
    expect(renderWithProviders(<ProjectEnvironments/>, {preloadedState})).toMatchSnapshot()
    testEnvironments.forEach(env =>
      expect(screen.getByText(env)).toBeInTheDocument()
    )
  })
})
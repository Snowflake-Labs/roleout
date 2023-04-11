import React from 'react'
import '@testing-library/jest-dom'
import {renderWithProviders} from '../../../../testUtils'
import ProjectNamingConvention from '../../../../../renderer/app/routes/project/projectNamingConvention'

describe('ProjectNamingConvention', () => {
  it('should render correctly', () => {
    expect(renderWithProviders(<ProjectNamingConvention/>)).toMatchSnapshot()
  })
})
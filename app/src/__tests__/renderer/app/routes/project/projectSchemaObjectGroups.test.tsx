import React from 'react'
import '@testing-library/jest-dom'
import {renderWithProviders} from '../../../../testUtils'
import {screen} from '@testing-library/react'
import ProjectSchemaObjectGroups from '../../../../../renderer/app/routes/project/projectSchemaObjectGroups'

describe('ProjectSchemaObjectGroups', () => {
  const testGroups = ['Restricted', 'Special', 'More Objects']
  it('should render correctly', () => {
    const preloadedState = {
      schemaObjectGroups: testGroups.map(group => ({
        name: group,
        objects: {
          'SOME_DATABASE': {
            'SOME_SCHEMA': {
              tables: [] as string[],
              views: [] as string[]
            }
          }
        },
        access: {}
      }))
    }
    expect(renderWithProviders(<ProjectSchemaObjectGroups/>, {preloadedState})).toMatchSnapshot()
    testGroups.forEach(group =>
      expect(screen.getByText(group)).toBeInTheDocument()
    )
  })
})
import React from 'react'
import '@testing-library/jest-dom'
import {renderWithProviders} from '../../../../testUtils'
import {screen} from '@testing-library/react'
import ProjectDatabases from '../../../../../renderer/app/routes/project/projectDatabases'
import {defaultDatabaseOptions} from 'roleout-lib/build/objects/database'
import {defaultSchemaOptions} from 'roleout-lib/build/objects/schema'

describe('ProjectDatabases', () => {
  it('should render correctly', () => {
    const testDatabases = [
      {
        name: 'MY_DB',
        schemata: [
          {
            name: 'MY_SCHEMA',
            access: {},
            options: defaultSchemaOptions,
            environmentOptions: {}
          }
        ],
        options: defaultDatabaseOptions,
        environmentOptions: {}
      }
    ]

    const preloadedState = {databases: testDatabases}
    expect(renderWithProviders(<ProjectDatabases/>, {preloadedState})).toMatchSnapshot()
    testDatabases.forEach(db => {
      expect(screen.getByText(db.name)).toBeInTheDocument()
      db.schemata.forEach(schema =>
        expect(screen.getByText(schema.name)).toBeInTheDocument()
      )
    }
    )
  })
})
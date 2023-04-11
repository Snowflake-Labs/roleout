import React from 'react'
import '@testing-library/jest-dom'
import {renderWithProviders} from '../../../../testUtils'
import ProjectAccess from '../../../../../renderer/app/routes/project/projectAccess'
import {defaultVirtualWarehouseOptions} from 'roleout-lib/build/objects/virtualWarehouse'
import {fireEvent, screen} from '@testing-library/react'
import {defaultDatabaseOptions} from 'roleout-lib/build/objects/database'
import {defaultSchemaOptions} from 'roleout-lib/build/objects/schema'
import {defaultProjectOptions} from 'roleout-lib/build/project'

describe('ProjectAccess', () => {
  it('should render correctly', async () => {
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
    const testEnvironments = ['PROD', 'DEV', 'TEST']
    const testRoles = ['ANALYST', 'ELT', 'DEVOPS']
    const testWarehouses = ['ANALYSIS', 'ELT', 'DEVOPS']

    const preloadedState = {
      databases: testDatabases,
      environments: testEnvironments.map(name => ({name})),
      functionalRoles: testRoles.map(name => ({name})),
      virtualWarehouses: testWarehouses.map(name => {
        return {
          name,
          access: {},
          options: defaultVirtualWarehouseOptions,
          environmentOptions: {}
        }
      }),
      project: {
        name: 'Test Project',
        isLoaded: true,
        environmentsEnabled: true,
        schemaObjectGroupsEnabled: true,
        enforceUnquotedIdentifiers: defaultProjectOptions.enforceUnquotedIdentifiers
      }
    }

    expect(renderWithProviders(<ProjectAccess/>, {preloadedState})).toMatchSnapshot()
    testDatabases.forEach(db => {
      expect(screen.getByText(db.name)).toBeInTheDocument()
      db.schemata.forEach(schema =>
        expect(screen.getByText(schema.name)).toBeInTheDocument()
      )
    }
    )
    testRoles.forEach(name => expect(screen.getByText(name)).toBeInTheDocument())
    expect(screen.getByText('PROD')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Virtual Warehouses'))
    await screen.findAllByText('Virtual Warehouse')
    testWarehouses.forEach(name => expect(screen.getAllByText(name).length).toBeGreaterThan(0))
    testRoles.forEach(name => expect(screen.getAllByText(name).length).toBeGreaterThan(0))
  })
})
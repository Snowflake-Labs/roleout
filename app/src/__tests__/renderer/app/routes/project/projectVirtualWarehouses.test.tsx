import React from 'react'
import '@testing-library/jest-dom'
import {renderWithProviders} from '../../../../testUtils'
import {screen} from '@testing-library/react'
import ProjectVirtualWarehouses from '../../../../../renderer/app/routes/project/projectVirtualWarehouses'
import {defaultVirtualWarehouseOptions} from 'roleout-lib/build/objects/virtualWarehouse'

describe('ProjectVirtualWarehouses', () => {
  const testWarehouses = ['ANALYSIS', 'ELT', 'DEVOPS']
  it('should render correctly', () => {
    const preloadedState = {
      virtualWarehouses: testWarehouses.map(wh => ({
        name: wh,
        access: {},
        options: defaultVirtualWarehouseOptions,
        environmentOptions: {}
      }))
    }
    expect(renderWithProviders(<ProjectVirtualWarehouses/>, {preloadedState})).toMatchSnapshot()
    testWarehouses.forEach(wh =>
      expect(screen.getByText(wh)).toBeInTheDocument()
    )
  })
})
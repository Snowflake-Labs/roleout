import {describe, expect, test} from '@jest/globals'
import {Project} from '../project'
import {readFileSync} from 'fs'
import path from 'path'
import {FunctionalRole} from '../roles/functionalRole'
import {DataAccessLevel} from '../access/dataAccessLevel'
import {VirtualWarehouseAccessLevel} from '../access/virtualWarehouseAccessLevel'
import {zip} from 'lodash'
import {defaultVirtualWarehouseOptions, VirtualWarehouse, VirtualWarehouseOptions} from '../objects/virtualWarehouse'

describe('Project', () => {
  describe('when no environments defined', () => {
    test('loads valid project YAML files', () => {
      const yml = readFileSync(path.join(__dirname, 'test-project.yml')).toString()
      const project = Project.fromYAML(yml)

      // Metadata
      expect(project.name).toBe('MySnowflakeProject')

      // Environments
      expect(project.environments).toEqual([])

      // Databases and schemata
      expect(project.databases.map(db => db.name)).toEqual(['PROD_DB', 'SANDBOX_DB'])
      expect(project.databases[0].schemata.map(s => s.name)).toEqual(['COMMON', 'RAW'])
      expect(Array(...project.databases[0].schemata[0].access.entries())).toEqual([
        [new FunctionalRole('DATA_ANALYST'), DataAccessLevel.Read],
        [new FunctionalRole('DATA_SCIENTIST'), DataAccessLevel.ReadWrite],
        [new FunctionalRole('ELT_TOOL'), DataAccessLevel.Full],
      ]
      )
      expect(Array(...project.databases[0].schemata[1].access.entries())).toEqual([
        [new FunctionalRole('DATA_ANALYST'), DataAccessLevel.Read],
        [new FunctionalRole('DATA_SCIENTIST'), DataAccessLevel.Read],
        [new FunctionalRole('ELT_TOOL'), DataAccessLevel.Full],
      ]
      )

      // Virtual Warehouses
      expect(project.virtualWarehouses.map(vwh => vwh.name)).toEqual(['PROD_BI', 'PROD_DSCI', 'PROD_ELT'])
      const accesses = [
        [new FunctionalRole('DATA_ANALYST'), VirtualWarehouseAccessLevel.Usage],
        [new FunctionalRole('DATA_SCIENTIST'), VirtualWarehouseAccessLevel.Usage],
        [new FunctionalRole('ELT_TOOL'), VirtualWarehouseAccessLevel.Usage]
      ]
      for (const [virtualWarehouse, expectedAccess] of zip(project.virtualWarehouses, accesses)) {
        expect(Array(...virtualWarehouse!.access.entries())).toEqual([expectedAccess])
      }
      const biWarehouse = project.virtualWarehouses.find(vwh => vwh.name === 'PROD_BI')!
      expect(biWarehouse.size).toEqual('X-Small')
      expect(biWarehouse.minClusterCount).toEqual(2)
      expect(biWarehouse.maxClusterCount).toEqual(10)
      expect(biWarehouse.scalingPolicy).toEqual('ECONOMY')
      expect(biWarehouse.autoSuspend).toEqual(309)
      expect(biWarehouse.autoResume).toEqual(false)
      expect(biWarehouse.statementTimeoutInSeconds).toEqual(3600)
      expect(biWarehouse.type).toEqual('STANDARD')

      // warehouses with no specified options should hae the default options
      for(const warehouseName of ['PROD_DSCI', 'PROD_ELT']) {
        const warehouse = project.virtualWarehouses.find(vwh => vwh.name === warehouseName)!
        for (const k of Object.keys(defaultVirtualWarehouseOptions)) {
          expect(warehouse[k as keyof VirtualWarehouse]).toEqual(defaultVirtualWarehouseOptions[k as keyof VirtualWarehouseOptions])
        }
      }

      // Functional Roles
      expect(project.functionalRoles.map(fr => fr.name)).toEqual(['DATA_ANALYST', 'DATA_SCIENTIST', 'ELT_TOOL', 'AUDITOR'])

      // Naming Convention
      expect(project.namingConvention.functionalRole).toEqual('{{env}}_{{name}}_ROLE')
    })
  })
  describe('when environments are defined', () => {
    test('loads valid project YAML files', () => {
      const yml = readFileSync(path.join(__dirname, 'test-envs-project.yml')).toString()
      const project = Project.fromYAML(yml)
      const expectedEnvironments = ['PROD', 'DEV', 'TEST']

      // Metadata
      expect(project.name).toBe('MySnowflakeProjectWithEnvs')

      // Environments
      expect(project.environments.map(env => env.name)).toEqual(expectedEnvironments)

      // Databases and schemata
      const expectedAccessMatrix = {
        'COMMON': {
          'PROD': [
            ['PROD_DATA_ANALYST_ROLE', DataAccessLevel.Read],
            ['PROD_DATA_SCIENTIST_ROLE', DataAccessLevel.ReadWrite],
            ['PROD_ELT_TOOL_ROLE', DataAccessLevel.Full],
            ['PROD_DEVOPS_ROLE', DataAccessLevel.Full]
          ],
          'TEST': [
            ['TEST_DATA_ANALYST_ROLE', DataAccessLevel.Read],
            ['TEST_DATA_SCIENTIST_ROLE', DataAccessLevel.ReadWrite],
            ['TEST_ELT_TOOL_ROLE', DataAccessLevel.Full],
            ['TEST_DEVOPS_ROLE', DataAccessLevel.Full]
          ],
          'DEV': [
            ['DEV_DATA_ANALYST_ROLE', DataAccessLevel.ReadWrite],
            ['DEV_DATA_SCIENTIST_ROLE', DataAccessLevel.ReadWrite],
            ['DEV_ELT_TOOL_ROLE', DataAccessLevel.Full],
            ['DEV_DEVOPS_ROLE', DataAccessLevel.Full]
          ]
        },
        'RAW': {
          'PROD': [
            ['PROD_DATA_ANALYST_ROLE', DataAccessLevel.Read],
            ['PROD_DATA_SCIENTIST_ROLE', DataAccessLevel.Read],
            ['PROD_ELT_TOOL_ROLE', DataAccessLevel.Full],
            ['PROD_DEVOPS_ROLE', DataAccessLevel.Full]
          ],
          'TEST': [
            ['TEST_DATA_ANALYST_ROLE', DataAccessLevel.Read],
            ['TEST_DATA_SCIENTIST_ROLE', DataAccessLevel.Read],
            ['TEST_ELT_TOOL_ROLE', DataAccessLevel.Full],
            ['TEST_DEVOPS_ROLE', DataAccessLevel.Full]
          ],
          'DEV': [
            ['DEV_DATA_ANALYST_ROLE', DataAccessLevel.ReadWrite],
            ['DEV_DATA_SCIENTIST_ROLE', DataAccessLevel.ReadWrite],
            ['DEV_ELT_TOOL_ROLE', DataAccessLevel.Full],
            ['DEV_DEVOPS_ROLE', DataAccessLevel.Full]
          ]
        }
      }

      function accessEntries(environment: 'PROD' | 'DEV' | 'TEST', schemaIndex: 0 | 1) {
        return Array(...project.environments.find(env => env.name === environment)!.databases[0]!.schemata[schemaIndex]!.access.entries()).map(([role, access]) => [role.name, access])
      }

      const actualAccessMatrix = {
        'COMMON': {
          'PROD': accessEntries('PROD', 0),
          'DEV': accessEntries('DEV', 0),
          'TEST': accessEntries('TEST', 0),
        },
        'RAW': {
          'PROD': accessEntries('PROD', 1),
          'DEV': accessEntries('DEV', 1),
          'TEST': accessEntries('TEST', 1),
        },
      }

      expect(project.environments.map(env => env.databases).map(dbs => dbs[0].name)).toEqual(['PROD_EXAMPLE_DB', 'DEV_EXAMPLE_DB', 'TEST_EXAMPLE_DB'])
      expect(actualAccessMatrix).toEqual(expectedAccessMatrix)

      // Virtual Warehouses
      const expectedBIOptionsMatrix = {
        'PROD': {
          size: 'X-Small',
          minClusterCount: 2,
          maxClusterCount: 10,
          scalingPolicy: 'ECONOMY',
          autoSuspend: 309,
          autoResume: false,
          type: 'STANDARD',
          initiallySuspended: false,
          statementTimeoutInSeconds: 3600,
          enableQueryAcceleration: false
        },
        'DEV': {
          size: 'Small',
          minClusterCount: 3,
          maxClusterCount: 9,
          scalingPolicy: 'ECONOMY',
          autoSuspend: 300,
          autoResume: true,
          type: 'STANDARD',
          initiallySuspended: false,
          statementTimeoutInSeconds: 60,
          enableQueryAcceleration: false
        },
        'TEST': defaultVirtualWarehouseOptions
      }
      const environmentsVirtualWarehouses: VirtualWarehouse[] = project.environments.map(env => env.virtualWarehouses).flat()
      for (const virtualWarehouseName of ['BI', 'DSCI', 'ELT', 'DEVOPS']) {
        for (const env of expectedEnvironments) {
          const name = `${env}_${virtualWarehouseName}_WH`
          expect(environmentsVirtualWarehouses.map(vwh => vwh.name)).toContain(name)

          const virtualWarehouse = environmentsVirtualWarehouses.find(vwh => vwh.name === name)
          const accessEntries = Array(...virtualWarehouse!.access.entries())
          expect(virtualWarehouse).not.toBeFalsy()

          switch (virtualWarehouseName) {
          case 'BI':
            if (env === 'DEV') {
              expect(accessEntries).toEqual([
                [new FunctionalRole('DEV_DATA_ANALYST_ROLE'), VirtualWarehouseAccessLevel.Usage],
                [new FunctionalRole('DEV_ELT_TOOL_ROLE'), VirtualWarehouseAccessLevel.Usage],
                [new FunctionalRole('DEV_DEVOPS_ROLE'), VirtualWarehouseAccessLevel.Full],
              ])
            } else {
              expect(accessEntries).toEqual([
                [new FunctionalRole(`${env}_DATA_ANALYST_ROLE`), VirtualWarehouseAccessLevel.Usage],
                [new FunctionalRole(`${env}_DEVOPS_ROLE`), VirtualWarehouseAccessLevel.Full],
              ])
            }

            for(const k of Object.keys(defaultVirtualWarehouseOptions)) {
              // @ts-ignore
              expect(virtualWarehouse![k as keyof VirtualWarehouse]).toEqual(expectedBIOptionsMatrix[env][k as keyof VirtualWarehouseOptions])
            }
            break
          case 'DSCI':
            expect(accessEntries).toEqual([
              [new FunctionalRole(`${env}_DATA_SCIENTIST_ROLE`), VirtualWarehouseAccessLevel.Usage],
              [new FunctionalRole(`${env}_DEVOPS_ROLE`), VirtualWarehouseAccessLevel.Full],
            ])
            for(const k of Object.keys(defaultVirtualWarehouseOptions)) {
              // @ts-ignore
              expect(virtualWarehouse![k as keyof VirtualWarehouse]).toEqual(defaultVirtualWarehouseOptions[k as keyof VirtualWarehouseOptions])
            }
            break
          case 'ELT':
            expect(accessEntries).toEqual([
              [new FunctionalRole(`${env}_ELT_TOOL_ROLE`), VirtualWarehouseAccessLevel.Usage],
              [new FunctionalRole(`${env}_DEVOPS_ROLE`), VirtualWarehouseAccessLevel.Full],
            ])
            for(const k of Object.keys(defaultVirtualWarehouseOptions)) {
              // @ts-ignore
              expect(virtualWarehouse![k as keyof VirtualWarehouse]).toEqual(defaultVirtualWarehouseOptions[k as keyof VirtualWarehouseOptions])
            }
            break
          case 'DEVOPS':
            expect(Array(...virtualWarehouse!.access.entries())).toEqual([
              [new FunctionalRole(`${env}_DEVOPS_ROLE`), VirtualWarehouseAccessLevel.Full],
            ])
            for(const k of Object.keys(defaultVirtualWarehouseOptions)) {
              // @ts-ignore
              expect(virtualWarehouse![k as keyof VirtualWarehouse]).toEqual(defaultVirtualWarehouseOptions[k as keyof VirtualWarehouseOptions])
            }
            break
          }
        }
      }
      expect(environmentsVirtualWarehouses.length).toBe(12)

      // Functional Roles
      const environmentsFunctionalRoles = project.environments.map(env => env.functionalRoles).flat().map(fr => fr.name)
      for (const role of ['DATA_ANALYST', 'DATA_SCIENTIST', 'ELT_TOOL', 'DEVOPS']) {
        for (const env of expectedEnvironments) {
          expect(environmentsFunctionalRoles).toContain(`${env}_${role}_ROLE`)
        }
      }
      expect(environmentsFunctionalRoles.length).toBe(12)

      // Naming Convention
      expect(project.namingConvention.functionalRole).toEqual('{{env}}_{{name}}_ROLE')
    })
  })
})
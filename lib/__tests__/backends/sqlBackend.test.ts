import {expect, describe, test} from '@jest/globals'
import path from 'path'
import {SQLBackend} from '../../backends/sqlBackend'
import {testAgainstGoldenFiles} from './helpers'
import {Project} from '../../project'
import {defaultNamingConvention} from '../../namingConvention'
import {readFileFixLineEndings} from '../helpers'

describe('SQLBackend', () => {
  describe('when deploying a project with no environments', () => {
    test('generates correct .sql files', () => {
      const goldenFilesDir = path.join(__dirname, 'sqlGoldenFiles', 'noEnvs')
      const backend = new SQLBackend()
      const projectFile = path.join(__dirname, '..', 'test-project.yml')
      testAgainstGoldenFiles(backend, projectFile, goldenFilesDir)
    })
  })

  describe('when deploying a project with environments', () => {
    test('generates correct .sql files', () => {
      const goldenFilesDir = path.join(__dirname, 'sqlGoldenFiles', 'envs')
      const backend = new SQLBackend()
      const projectFile = path.join(__dirname, '..', 'test-envs-project.yml')
      testAgainstGoldenFiles(backend, projectFile, goldenFilesDir)
    })
    test('follows naming convention for access roles', () => {
      const testARName = 'TEST_AR_NAME'
      const backend = new SQLBackend()
      const projectFile = path.join(__dirname, '..', 'test-envs-project.yml')
      const projectYAMLLines = readFileFixLineEndings(projectFile).split('\n')
      const modifiedYAML = projectYAMLLines.slice(0, 3).concat([`    schemaAccessRole: ${testARName}`, `    virtualWarehouseAccessRole: ${testARName}`]).concat(projectYAMLLines.slice(3)).join('\n')
      const project = Project.fromYAML(modifiedYAML)
      const rbacFile = backend.deploy(project).get('04 - RBAC.sql')
      rbacFile!.split('\n').filter(line => line.startsWith('CREATE ROLE') && !line.includes('SOG')).forEach(line => {
        expect(line).toContain(testARName)
      })
    })
  })
})

import {describe, expect, test} from '@jest/globals'
import path from 'path'
import {TerraformBackend} from '../../backends/terraformBackend'
import {testAgainstGoldenFiles} from './helpers'
import {SQLBackend} from '../../backends/sqlBackend'
import {readFileFixLineEndings} from '../helpers'
import {Project} from '../../project'

describe('TerraformBackend', () => {
  describe('when deploying a project with no environments', () => {
    test('generates correct Terraform resource files', () => {
      const goldenFilesDir = path.join(__dirname, 'terraformGoldenFiles', 'noEnvs')
      const backend = new TerraformBackend()
      const projectFile = path.join(__dirname, '..', 'test-project.yml')
      testAgainstGoldenFiles(backend, projectFile, goldenFilesDir)
    })
  })

  describe('when deploying a project with environments', () => {
    test('generates correct Terraform resource files', () => {
      const goldenFilesDir = path.join(__dirname, 'terraformGoldenFiles', 'envs')
      const backend = new TerraformBackend()
      const projectFile = path.join(__dirname, '..', 'test-envs-project.yml')
      testAgainstGoldenFiles(backend, projectFile, goldenFilesDir)
    })
    test('follows naming convention for access roles', () => {
      const testARName = 'TEST_AR_NAME'
      const backend = new TerraformBackend()
      const projectFile = path.join(__dirname, '..', 'test-envs-project.yml')
      const projectYAMLLines = readFileFixLineEndings(projectFile).split('\n')
      const modifiedYAML = projectYAMLLines.slice(0, 3).concat([`    schemaAccessRole: ${testARName}`, `    virtualWarehouseAccessRole: ${testARName}`]).concat(projectYAMLLines.slice(3)).join('\n')
      const project = Project.fromYAML(modifiedYAML)
      const rbacFile = backend.deploy(project).get('rbac.tf')
      rbacFile!.split('\n').filter(line => line.startsWith('resource snowflake_role ') && !line.includes('SYSADMIN') && !line.includes('SOG')).forEach(line => {
        expect(line).toContain(testARName)
      })
    })
  })
})

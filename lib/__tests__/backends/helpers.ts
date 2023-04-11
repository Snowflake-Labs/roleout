import {expect} from '@jest/globals'
import {Backend} from '../../backends/backend'
import {Project} from '../../project'
import path from 'path'
import {readFileFixLineEndings} from '../helpers'
import glob from 'glob'
import fs from 'fs'

export const testAgainstGoldenFiles = (backend: Backend, projectFile: string, goldenFilesDir: string) => {
  const project = Project.fromYAML(readFileFixLineEndings(projectFile))
  const actualFiles: Map<string, string> = backend.deploy(project)
  const expectedFilenames: string[] = []

  // recursively list golden files and test against them
  glob.sync(path.join(goldenFilesDir, '**/*')).forEach(file => {
    const stat = fs.statSync(file)
    if (stat && stat.isDirectory()) return
    const filename = path.relative(goldenFilesDir, file).replace(/\\/g, '/')
    expectedFilenames.push(filename)
    expect(actualFiles.get(filename)).toEqual(readFileFixLineEndings(file))
  })

  expect(new Set(actualFiles.keys())).toEqual(new Set(expectedFilenames))
}


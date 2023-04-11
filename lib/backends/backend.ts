import {Project} from '../project'
import {Deployable} from '../deployable'
import {renderName} from '../namingConvention'
import {DeploymentOptions} from './deploymentOptions'
import {Environment} from '../environment'

export abstract class Backend {
  environmentOptions(project: Project): { environment: Environment; options: DeploymentOptions }[] {
    return project.environments.map(environment => {
      const environmentManagerRole = renderName('environmentManagerRole', project.namingConvention, {env: environment.name})
      const options = {
        ...project.deploymentOptions,
        environmentName: environment.name,
        environmentManagerRole
      }
      return {environment, options}
    })
  }

  deploy(project: Project): Map<string, string> {
    if (project.environments.length > 0) {
      const dynamicFiles = this.environmentOptions(project).map(obj => {
        const {environment, options} = obj
        return this._deploy(environment, options)
      }).reduce((prev, curr) => {
        const newMap = new Map<string, string>()
        for (const [filename, contents] of prev.entries()) {
          if (curr.has(filename)) newMap.set(filename, contents + '\n\n' + curr.get(filename))
        }
        return newMap
      })
      return new Map([...dynamicFiles, ...this.staticFiles()])
    }
    return new Map([...this._deploy(project), ...this.staticFiles()])
  }

  abstract staticFiles(): Map<string, string>

  protected abstract _deploy(deployable: Deployable, options?: DeploymentOptions): Map<string, string>
}

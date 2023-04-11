export interface DeploymentOptions {
  create?: {
    databases?: boolean
    virtualWarehouses?: boolean
    functionalRoles?: boolean
  }
  environmentName?: string
  environmentManagerRole?: string
}

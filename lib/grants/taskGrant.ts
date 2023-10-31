import {Task} from '../objects/task'
import {Schema} from '../objects/schema'
import {Role} from '../roles/role'
import {Privilege} from '../privilege'
import {SchemaObjectGrant} from './schemaObjectGrant'
import {Grant} from './grant'
import {SchemaObjectType} from '../objects/objects'

export class TaskGrant extends SchemaObjectGrant {
  schema: Schema
  task?: Task
  future: boolean
  privileges: Privilege[]
  role: Role
  dependsOn?: Grant[]
  objectType = SchemaObjectType.TASK

  constructor(
    schema: Schema,
    future: boolean,
    privileges: Privilege[],
    role: Role,
    task?: Task,
    dependsOn?: Grant[]
  ) {
    super()
    this.schema = schema
    this.task = task
    this.future = future
    this.privileges = privileges
    this.role = role
    this.dependsOn = dependsOn
  }

  objectName(): string | undefined {
    return this.task?.name
  }
}

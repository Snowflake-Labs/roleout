import {Table} from './objects/table'
import {View} from './objects/view'
import {NamingConvention} from './namingConvention'
import {SchemaAccessRole} from './roles/schemaAccessRole'
import {DataAccessLevel} from './access/dataAccessLevel'
import {SchemaObjectGroupAccessRole} from './roles/schemaObjectGroupAccessRole'
import {SchemaObjectGroupAccessLevel} from './access/schemaObjectGroupAccessLevel'
import {SchemaObjectGroupAccess} from './access/schemaObjectGroupAccess'
import {FunctionalRole} from './roles/functionalRole'

export class SchemaObjectGroup {
  name: string
  identifier: string
  tables: Table[]
  views: View[]
  access: SchemaObjectGroupAccess

  constructor(name: string, identifier: string, tables: Table[], views: View[]) {
    this.name = name
    this.identifier = identifier
    this.tables = tables
    this.views = views
    this.access = new Map<FunctionalRole, SchemaObjectGroupAccessLevel>()
  }

  accessRoles(namingConvention: NamingConvention,): SchemaObjectGroupAccessRole[] {
    return [SchemaObjectGroupAccessLevel.Read, SchemaObjectGroupAccessLevel.ReadWrite].map(
      (level) => new SchemaObjectGroupAccessRole(this, this.identifier, level, namingConvention)
    )
  }

  static identifierSafeName(name: string): string {
    return name.toUpperCase().replace(/[^A-Z0-9_]/g, '_')
  }
}
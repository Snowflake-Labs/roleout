import {Table} from './objects/table'
import {View} from './objects/view'
import {NamingConvention} from './namingConvention'
import {SchemaAccessRole} from './roles/schemaAccessRole'
import {DataAccessLevel} from './access/dataAccessLevel'
import {SchemaObjectGroupAccessRole} from './roles/schemaObjectGroupAccessRole'
import {SchemaObjectGroupAccessLevel} from './access/schemaObjectGroupAccessLevel'
import {SchemaObjectGroupAccess} from './access/schemaObjectGroupAccess'
import {FunctionalRole} from './roles/functionalRole'
import {VirtualWarehouseAccessLevel} from './access/virtualWarehouseAccessLevel'

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

  toRecord() {
    const accessRecords = Array(...this.access.entries()).map(([role, level]) => {
      return {role: role.name, level: SchemaObjectGroupAccessLevel[level]}
    })
    return {
      name: this.name,
      tables: this.tables.map(t => t.toRecord()),
      views: this.views.map(v => v.toRecord()),
      access: accessRecords
    }
  }

  static identifierSafeName(name: string): string {
    return name.toUpperCase().replace(/[^A-Z0-9_]/g, '_')
  }
}
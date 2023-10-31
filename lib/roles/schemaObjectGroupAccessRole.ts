import {AccessRole} from './accessRole'
import {
  SchemaObjectGroupAccessLevel,
  schemaObjectGroupAccessLevelShortName
} from '../access/schemaObjectGroupAccessLevel'
import {Grant} from '../grants/grant'
import {Privilege} from '../privilege'
import {NamingConvention} from '../namingConvention'
import Mustache from 'mustache'
import {SchemaGrant} from '../grants/schemaGrant'
import {DatabaseGrant} from '../grants/databaseGrant'
import {SchemaObjectGroup} from '../schemaObjectGroup'
import {flatten, uniq} from 'lodash'
import {TableGrant} from '../grants/tableGrant'
import {ViewGrant} from '../grants/viewGrant'
import compact from 'lodash/compact'

export class SchemaObjectGroupAccessRole implements AccessRole {
  schemaObjectGroup: SchemaObjectGroup
  schemaObjectGroupIdentifier: string
  name: string
  accessLevel: SchemaObjectGroupAccessLevel
  grants: Grant[]

  constructor(
    schemaObjectGroup: SchemaObjectGroup,
    schemaObjectGroupIdentifier: string,
    level: SchemaObjectGroupAccessLevel,
    namingConvention: NamingConvention,
  ) {
    this.schemaObjectGroup = schemaObjectGroup
    this.schemaObjectGroupIdentifier = schemaObjectGroupIdentifier
    this.accessLevel = level
    this.grants = this.buildGrants(namingConvention)
    this.name = this.generateName(namingConvention)
  }

  private generateName(namingConvention: NamingConvention): string {
    return Mustache.render(namingConvention.schemaObjectGroupAccessRole, {
      identifier: this.schemaObjectGroupIdentifier,
      levelShort: schemaObjectGroupAccessLevelShortName(this.accessLevel),
    })
  }

  private buildGrants(namingConvention: NamingConvention): Grant[] {
    const schemaUsageGrants: SchemaGrant[] = uniq(
      this.schemaObjectGroup.tables.map(t => t.schema).concat(this.schemaObjectGroup.views.map(v => v.schema))
    ).map(schema =>
      new SchemaGrant(schema, [Privilege.USAGE], this),
    )
    const databaseUsageGrants: Grant[] = uniq(compact(schemaUsageGrants.map(g => g.schema?.database))).map(db =>
      new DatabaseGrant(db, [Privilege.USAGE], this),
    )
    const tableReadGrants = this.schemaObjectGroup.tables.map(table =>
      new TableGrant(table.schema, false, [Privilege.SELECT], this, table)
    )
    const tableWriteGrants = flatten(this.schemaObjectGroup.tables.map(table =>
      new TableGrant(table.schema, false, [Privilege.INSERT, Privilege.UPDATE, Privilege.DELETE], this, table),
    ))
    const viewReadGrants = this.schemaObjectGroup.views.map(view =>
      new ViewGrant(view.schema, false, [Privilege.SELECT], this, view)
    )

    const readGrants = () => flatten(
      [
        databaseUsageGrants,
        schemaUsageGrants,
        tableReadGrants,
        viewReadGrants
      ])

    const readWriteGrants = () =>
      readGrants().concat(tableWriteGrants)

    switch (this.accessLevel) {
    case SchemaObjectGroupAccessLevel.Read:
      return readGrants()

    case SchemaObjectGroupAccessLevel.ReadWrite:
      return readWriteGrants()
    }
  }
}

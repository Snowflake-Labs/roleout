import {AccessRole} from './accessRole'
import {DataAccessLevel, dataAccessLevelShortName} from '../access/dataAccessLevel'
import {Schema} from '../objects/schema'
import {TableGrant} from '../grants/tableGrant'
import {Grant} from '../grants/grant'
import {Privilege} from '../privilege'
import {NamingConvention} from '../namingConvention'
import Mustache from 'mustache'
import {SchemaGrant} from '../grants/schemaGrant'
import {DatabaseGrant} from '../grants/databaseGrant'
import {ViewGrant} from '../grants/viewGrant'
import {StageGrant} from '../grants/stageGrant'
import {FileFormatGrant} from '../grants/fileFormatGrant'
import {StreamGrant} from '../grants/streamGrant'
import {ProcedureGrant} from '../grants/procedureGrant'
import {UserDefinedFunctionGrant} from '../grants/userDefinedFunctionGrant'
import {TaskGrant} from '../grants/taskGrant'
import {SequenceGrant} from '../grants/sequenceGrant'
import {MaterializedViewGrant} from '../grants/materializedViewGrant'

export class SchemaAccessRole implements AccessRole {
  schema: Schema
  name: string
  accessLevel: DataAccessLevel
  grants: Grant[]

  constructor(
    schema: Schema,
    level: DataAccessLevel,
    namingConvention: NamingConvention,
  ) {
    this.schema = schema
    this.accessLevel = level
    this.grants = this.buildGrants(namingConvention)
    this.name = this.generateName(namingConvention)
  }

  private generateName(namingConvention: NamingConvention): string {
    return Mustache.render(namingConvention.schemaAccessRole, {
      database: this.schema.database.name,
      schema: this.schema.name,
      levelShort: dataAccessLevelShortName(this.accessLevel),
    })
  }

  private buildGrants(namingConvention: NamingConvention): Grant[] {
    // all other grants depend on the schema ownership being set
    let schemaOwnerGrant: SchemaGrant
    if (this.accessLevel === DataAccessLevel.Full) {
      schemaOwnerGrant = new SchemaGrant(this.schema, [Privilege.OWNERSHIP], this)
    } else {
      schemaOwnerGrant = new SchemaGrant(this.schema, [Privilege.OWNERSHIP], new SchemaAccessRole(this.schema, DataAccessLevel.Full, namingConvention))
    }

    const readGrants = () => [
      new DatabaseGrant(this.schema.database, [Privilege.USAGE], this),
      new SchemaGrant(this.schema, [Privilege.USAGE], this, [schemaOwnerGrant]),
      new TableGrant(this.schema, false, [Privilege.SELECT], this, undefined, [schemaOwnerGrant]),
      new TableGrant(this.schema, true, [Privilege.SELECT], this, undefined, [schemaOwnerGrant]),
      new ViewGrant(this.schema, false, [Privilege.SELECT], this, undefined, [schemaOwnerGrant]),
      new ViewGrant(this.schema, true, [Privilege.SELECT], this, undefined, [schemaOwnerGrant]),
      new SequenceGrant(this.schema, false, [Privilege.USAGE], this, undefined, [schemaOwnerGrant]),
      new SequenceGrant(this.schema, true, [Privilege.USAGE], this, undefined, [schemaOwnerGrant]),
      new StageGrant(this.schema, false, [Privilege.USAGE, Privilege.READ], this, undefined, [schemaOwnerGrant]),
      new StageGrant(this.schema, true, [Privilege.USAGE, Privilege.READ], this, undefined, [schemaOwnerGrant]),
      new FileFormatGrant(this.schema, false, [Privilege.USAGE], this, undefined, [schemaOwnerGrant]),
      new FileFormatGrant(this.schema, true, [Privilege.USAGE], this, undefined, [schemaOwnerGrant]),
      new StreamGrant(this.schema, false, [Privilege.SELECT], this, undefined, [schemaOwnerGrant]),
      new StreamGrant(this.schema, true, [Privilege.SELECT], this, undefined, [schemaOwnerGrant]),
      new ProcedureGrant(this.schema, false, [Privilege.USAGE], this, undefined, [schemaOwnerGrant]),
      new ProcedureGrant(this.schema, true, [Privilege.USAGE], this, undefined, [schemaOwnerGrant]),
      new UserDefinedFunctionGrant(this.schema, false, [Privilege.USAGE], this, undefined, [schemaOwnerGrant]),
      new UserDefinedFunctionGrant(this.schema, true, [Privilege.USAGE], this, undefined, [schemaOwnerGrant]),
      new MaterializedViewGrant(this.schema, false, [Privilege.SELECT], this, undefined, [schemaOwnerGrant]),
      new MaterializedViewGrant(this.schema, true, [Privilege.SELECT], this, undefined, [schemaOwnerGrant]),
    ]

    const readWriteGrants = () =>
      [
        new DatabaseGrant(this.schema.database, [Privilege.USAGE], this),
        new SchemaGrant(this.schema, [Privilege.USAGE], this, [schemaOwnerGrant]),
        new TableGrant(this.schema, false, [Privilege.SELECT, Privilege.INSERT, Privilege.UPDATE, Privilege.DELETE, Privilege.REFERENCES], this, undefined, [schemaOwnerGrant]),
        new TableGrant(this.schema, true, [Privilege.SELECT, Privilege.INSERT, Privilege.UPDATE, Privilege.DELETE, Privilege.REFERENCES], this, undefined, [schemaOwnerGrant]),
        new ViewGrant(this.schema, false, [Privilege.SELECT], this, undefined, [schemaOwnerGrant]),
        new ViewGrant(this.schema, true, [Privilege.SELECT], this, undefined, [schemaOwnerGrant]),
        new SequenceGrant(this.schema, false, [Privilege.USAGE], this, undefined, [schemaOwnerGrant]),
        new SequenceGrant(this.schema, true, [Privilege.USAGE], this, undefined, [schemaOwnerGrant]),
        new StageGrant(this.schema, false, [Privilege.USAGE, Privilege.READ, Privilege.WRITE], this, undefined, [schemaOwnerGrant]),
        new StageGrant(this.schema, true, [Privilege.USAGE, Privilege.READ, Privilege.WRITE], this, undefined, [schemaOwnerGrant]),
        new FileFormatGrant(this.schema, false, [Privilege.USAGE], this, undefined, [schemaOwnerGrant]),
        new FileFormatGrant(this.schema, true, [Privilege.USAGE], this, undefined, [schemaOwnerGrant]),
        new StreamGrant(this.schema, false, [Privilege.SELECT], this, undefined, [schemaOwnerGrant]),
        new StreamGrant(this.schema, true, [Privilege.SELECT], this, undefined, [schemaOwnerGrant]),
        new ProcedureGrant(this.schema, false, [Privilege.USAGE], this, undefined, [schemaOwnerGrant]),
        new ProcedureGrant(this.schema, true, [Privilege.USAGE], this, undefined, [schemaOwnerGrant]),
        new UserDefinedFunctionGrant(this.schema, false, [Privilege.USAGE], this, undefined, [schemaOwnerGrant]),
        new UserDefinedFunctionGrant(this.schema, true, [Privilege.USAGE], this, undefined, [schemaOwnerGrant]),
        new MaterializedViewGrant(this.schema, false, [Privilege.SELECT], this, undefined, [schemaOwnerGrant]),
        new MaterializedViewGrant(this.schema, true, [Privilege.SELECT], this, undefined, [schemaOwnerGrant]),
        new TaskGrant(this.schema, false, [Privilege.MONITOR, Privilege.OPERATE], this, undefined, [schemaOwnerGrant]),
        new TaskGrant(this.schema, true, [Privilege.MONITOR, Privilege.OPERATE], this, undefined, [schemaOwnerGrant]),
      ]

    const fullGrants = () =>
      [
        schemaOwnerGrant,
        new DatabaseGrant(this.schema.database, [Privilege.USAGE], this),
        new TableGrant(this.schema, false, [Privilege.OWNERSHIP], this, undefined, [schemaOwnerGrant]),
        new TableGrant(this.schema, true, [Privilege.OWNERSHIP], this, undefined, [schemaOwnerGrant]),
        new ViewGrant(this.schema, false, [Privilege.OWNERSHIP], this, undefined, [schemaOwnerGrant]),
        new ViewGrant(this.schema, true, [Privilege.OWNERSHIP], this, undefined, [schemaOwnerGrant]),
        new SequenceGrant(this.schema, false, [Privilege.OWNERSHIP], this, undefined, [schemaOwnerGrant]),
        new SequenceGrant(this.schema, true, [Privilege.OWNERSHIP], this, undefined, [schemaOwnerGrant]),
        new StageGrant(this.schema, false, [Privilege.OWNERSHIP], this, undefined, [schemaOwnerGrant]),
        new StageGrant(this.schema, true, [Privilege.OWNERSHIP], this, undefined, [schemaOwnerGrant]),
        new FileFormatGrant(this.schema, false, [Privilege.OWNERSHIP], this, undefined, [schemaOwnerGrant]),
        new FileFormatGrant(this.schema, true, [Privilege.OWNERSHIP], this, undefined, [schemaOwnerGrant]),
        new StreamGrant(this.schema, false, [Privilege.OWNERSHIP], this, undefined, [schemaOwnerGrant]),
        new StreamGrant(this.schema, true, [Privilege.OWNERSHIP], this, undefined, [schemaOwnerGrant]),
        new ProcedureGrant(this.schema, false, [Privilege.OWNERSHIP], this, undefined, [schemaOwnerGrant]),
        new ProcedureGrant(this.schema, true, [Privilege.OWNERSHIP], this, undefined, [schemaOwnerGrant]),
        new UserDefinedFunctionGrant(this.schema, false, [Privilege.OWNERSHIP], this, undefined, [schemaOwnerGrant]),
        new UserDefinedFunctionGrant(this.schema, true, [Privilege.OWNERSHIP], this, undefined, [schemaOwnerGrant]),
        new MaterializedViewGrant(this.schema, false, [Privilege.OWNERSHIP], this, undefined, [schemaOwnerGrant]),
        new MaterializedViewGrant(this.schema, true, [Privilege.OWNERSHIP], this, undefined, [schemaOwnerGrant]),
        new TaskGrant(this.schema, false, [Privilege.OWNERSHIP], this, undefined, [schemaOwnerGrant]),
        new TaskGrant(this.schema, true, [Privilege.OWNERSHIP], this, undefined, [schemaOwnerGrant]),
      ]

    switch (this.accessLevel) {
    case DataAccessLevel.Read:
      return readGrants()
    case DataAccessLevel.ReadWrite:
      return readWriteGrants()
    case DataAccessLevel.Full:
      return fullGrants()
    }
  }
}

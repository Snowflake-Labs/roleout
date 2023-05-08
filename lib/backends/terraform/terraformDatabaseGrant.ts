import {TerraformGrant} from './terraformGrant'
import {immerable} from 'immer'
import {GrantKind} from '../../grants/grant'
import {NamingConvention} from '../../namingConvention'
import {TerraformBackend} from '../terraformBackend'
import {TerraformDatabase} from './terraformDatabase'
import {DatabaseGrant} from '../../grants/databaseGrant'
import Mustache from 'mustache'
import {Database} from '../../objects/database'
import standardizeIdentifierForResource from './standardizeIdentifierForResource'
import {TerraformRole} from './terraformRole'
import {Role} from '../../roles/role'
import compact from 'lodash/compact'
import {TerraformResource} from './terraformResource'

export class TerraformDatabaseGrant extends TerraformGrant {
  [immerable] = true

  kind: GrantKind = 'database'
  database: Database
  privilege: string
  toRoles: Role[]
  toTerraformRoles: TerraformRole[]
  dependsOn: TerraformResource[]

  constructor(database: Database, privilege: string, toRoles: Role[], toTerraformRoles: TerraformRole[], dependsOn: TerraformResource[] = []) {
    super()
    this.database = database
    this.privilege = privilege
    this.toRoles = toRoles
    this.toTerraformRoles = toTerraformRoles
    this.dependsOn = dependsOn
  }

  uniqueKey(): string {
    return [
      this.kind,
      this.database.name,
      this.privilege,
    ].join('|')
  }

  resourceType(): string {
    return 'snowflake_database_grant'
  }

  resourceName(namingConvention: NamingConvention): string {
    const standardDatabaseName = standardizeIdentifierForResource(this.database.name)
    return Mustache.render(namingConvention.terraformGrantResourceName, {
      database: standardDatabaseName,
      databaseLower: standardDatabaseName.toLowerCase(),
      schema: false,
      privilege: this.privilege,
      privilegeLower: this.privilege.toLowerCase(),
      kind: 'database',
      kindLower: 'database',
      future: false,
    })
  }

  resourceID(): string {
    // database_name|privilege|with_grant_option|roles|shares
    return `${this.database.name}|${this.privilege}|false|${this.toRoles.map(r => r.name).concat(this.toTerraformRoles.map(tr => tr.name)).join(',')}|`
  }

  resourceBlock(namingConvention: NamingConvention): string {
    const spacing = TerraformBackend.SPACING
    return compact([
      `resource ${this.resourceType()} ${this.resourceName(namingConvention)} {`,
      spacing + `database_name = snowflake_database.${TerraformDatabase.fromDatabase(this.database).resourceName()}.name`,
      spacing + `privilege = "${this.privilege}"`,
      spacing + `roles = [${this.roleAndRoleResourceStrings().join(', ')}]\n`,
      spacing + 'with_grant_option = false',
      spacing + 'enable_multiple_grants = true',
      this.dependsOn.length > 0 ? spacing + 'depends_on = [' + this.dependsOn.map(r => `${r.resourceType()}.${r.resourceName(namingConvention)}`).join(', ') + ']' : null,
      '}',
    ]).join('\n')
  }

  static fromDatabaseGrant(grant: DatabaseGrant, dependsOn: TerraformResource[] = []): TerraformDatabaseGrant {
    return new TerraformDatabaseGrant(grant.database, grant.privilege, [grant.role], [], dependsOn)
  }
}

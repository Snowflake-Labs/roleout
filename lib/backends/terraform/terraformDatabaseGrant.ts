import {OnAccountObject} from './terraformPrivilegesGrant'
import {NamingConvention} from '../../namingConvention'
import {TerraformDatabase} from './terraformDatabase'
import {DatabaseGrant} from '../../grants/databaseGrant'
import Mustache from 'mustache'
import standardizeIdentifierForResource from './standardizeIdentifierForResource'
import {TerraformRole} from './terraformRole'
import {Role} from '../../roles/role'
import {TerraformResource} from './terraformResource'
import {AccountObjectType} from '../../objects/objects'
import {OnAccountObjectProps, TerraformAccountObjectGrant} from './terraformAccountObjectGrant'

export class TerraformDatabaseGrant extends TerraformAccountObjectGrant {
  database: TerraformDatabase

  constructor(role: Role | TerraformRole, database: TerraformDatabase, props: OnAccountObjectProps) {
    super(role, props)
    this.database = database
  }

  resourceID(): string {
    return ''
  }

  resourceName(namingConvention: NamingConvention): string {
    const standardDatabaseName = standardizeIdentifierForResource(this.database.name)
    const standardRoleName = standardizeIdentifierForResource(this.role.name)
    return Mustache.render(namingConvention.terraformGrantResourceName, {
      database: standardDatabaseName,
      databaseLower: standardDatabaseName.toLowerCase(),
      role: standardRoleName,
      roleLower: standardRoleName.toLowerCase(),
      schema: false,
      kind: 'DATABASE',
      kindLower: 'database',
      future: false,
      allPrivileges: false
    })
  }

  onAccountObject(): OnAccountObject  {
    return {
      object: this.database,
      objectType: AccountObjectType.DATABASE
    }
  }

  static fromDatabaseGrant(grant: DatabaseGrant, dependsOn: TerraformResource[]): TerraformDatabaseGrant {
    return new TerraformDatabaseGrant(grant.role, TerraformDatabase.fromDatabase(grant.database), {
      privileges: grant.privileges,
      dependsOn
    })
  }
}

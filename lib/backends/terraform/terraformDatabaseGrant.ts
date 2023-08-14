import {OnAccountObject, TerraformPrivilegesGrant} from './terraformPrivilegesGrant'
import {immerable} from 'immer'
import {NamingConvention} from '../../namingConvention'
import {TerraformDatabase} from './terraformDatabase'
import {DatabaseGrant} from '../../grants/databaseGrant'
import Mustache from 'mustache'
import {Database} from '../../objects/database'
import standardizeIdentifierForResource from './standardizeIdentifierForResource'
import {TerraformRole} from './terraformRole'
import {Role} from '../../roles/role'
import {TerraformResource} from './terraformResource'
import {Privilege} from '../../privilege'
import {AccountObjectType} from '../../objects/objects'

export type Props = {
  allPrivileges?: boolean
  privileges?: Privilege[]
  withGrantOption?: boolean
}

export class TerraformDatabaseGrant extends TerraformPrivilegesGrant {
  [immerable] = true

  database: Database
  props: Props

  constructor(role: TerraformRole | Role, database: Database, props: Props) {
    const onAccountObject: OnAccountObject = {
      object: TerraformDatabase.fromDatabase(database),
      objectType: AccountObjectType.DATABASE
    }

    super(role, {onAccountObject: onAccountObject, ...props})
    this.database = database
    this.props = props
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
      kind: 'database',
      kindLower: 'database',
      future: false,
    })
  }


  static fromDatabaseGrant(grant: DatabaseGrant, dependsOn: TerraformResource[] = []): TerraformDatabaseGrant {
    return new TerraformDatabaseGrant(grant.database, grant.privilege, [grant.role], [], dependsOn)
  }
}

import {parseVirtualWarehouseSize, VirtualWarehouse, VirtualWarehouseOptions} from './objects/virtualWarehouse'
import {Database, defaultDatabaseOptions} from './objects/database'
import {FunctionalRole} from './roles/functionalRole'
import {Connection, ConnectionOptions, createConnection} from 'snowflake-sdk'
import {Schema} from './objects/schema'
import {round} from 'lodash'

export function getConnectionOptionsFromEnv(): ConnectionOptions {
  if (!process.env.SNOWFLAKE_ACCOUNT || !process.env.SNOWFLAKE_USER) throw new Error('Account and username must be specified')

  const authenticator = process.env.SNOWFLAKE_PRIVATE_KEY_PATH ? 'SNOWFLAKE_JWT' : process.env.SNOWFLAKE_AUTHENTICATOR
  return {
    account: process.env.SNOWFLAKE_ACCOUNT,
    username: process.env.SNOWFLAKE_USER,
    application: 'Roleout',
    authenticator,
    password: process.env.SNOWFLAKE_PASSWORD,
    token: process.env.SNOWFLAKE_TOKEN,
    privateKey: process.env.SNOWFLAKE_PRIVATE_KEY,
    privateKeyPath: process.env.SNOWFLAKE_PRIVATE_KEY_PATH,
    privateKeyPass: process.env.SNOWFLAKE_PRIVATE_KEY_PASS,
    clientSessionKeepAlive: process.env.SNOWFLAKE_CLIENT_SESSION_KEEP_ALIVE === 'true',
    database: process.env.SNOWFLAKE_DATABASE,
    role: process.env.SNOWFLAKE_ROLE,
    schema: process.env.SNOWFLAKE_SCHEMA,
    timeout: parseInt(process.env.SNOWFLAKE_TIMEOUT || ''),
    warehouse: process.env.SNOWFLAKE_WAREHOUSE,
  }
}

export async function createSnowflakeConnection(connectionOptions: ConnectionOptions): Promise<Connection> {
  const connection = createConnection(connectionOptions)
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject(err)
      } else {
        resolve(connection)
      }
    })
  })
}

export class SnowflakeConnector {
  conn: Connection
  protected static SYSTEM_ROLES = ['ORGADMIN', 'ACCOUNTADMIN', 'SECURITYADMIN', 'USERADMIN', 'SYSADMIN', 'PUBLIC']
  protected static SYSTEM_SCHEMATA = ['INFORMATION_SCHEMA', 'PUBLIC']
  protected static SYSTEM_DATABASES = ['SNOWFLAKE', 'SNOWFLAKE_SAMPLE_DATA']

  constructor(conn: Connection) {
    this.conn = conn
  }

  async getVirtualWarehouses(): Promise<VirtualWarehouse[]> {
    const warehouses = await this._virtualWarehousesQuery()
    return warehouses.map((vwh: any) => {
      const virtualWarehouseOptions: VirtualWarehouseOptions = {
        size: parseVirtualWarehouseSize(vwh['size']),
        minClusterCount: parseInt(vwh['min_cluster_count']),
        maxClusterCount: parseInt(vwh['max_cluster_count']),
        autoSuspend: round(parseInt(vwh['auto_suspend']) / 60),
        autoResume: vwh['auto_resume'] === 'true',
        scalingPolicy: vwh['scaling_policy'],
        enableQueryAcceleration: vwh['enable_query_acceleration'] === 'true',
        queryAccelerationMaxScaleFactor: parseInt(vwh['query_acceleration_max_scale_factor']),
        type: vwh['type']
      }
      return new VirtualWarehouse(vwh['name'], virtualWarehouseOptions)
    })
  }

  async getRoles(): Promise<FunctionalRole[]> {
    const roles = await this._rolesQuery()
    return roles.filter((r: any) => !SnowflakeConnector.SYSTEM_ROLES.includes(r['name'])).map((r: any) => new FunctionalRole(r['name']))
  }

  async getDatabases(): Promise<Database[]> {
    const parseRetentionTime = (retentionTimeStr: string | undefined): number | undefined => {
      // if retention_time is 1, assume the reason is that's the default value and so leave it undefined on the new db
      return retentionTimeStr !== undefined && retentionTimeStr != '1' ? parseInt(retentionTimeStr) : undefined
    }
    const roleoutDatabases: Database[] = []

    const databases = await this._databasesQuery()
    for (const database of databases.filter((db: any) => !SnowflakeConnector.SYSTEM_DATABASES.includes(db.name))) {
      const databaseName = database['name']
      const databaseTransient = (database['options'] as string).includes('TRANSIENT')
      const roleoutDatabase = new Database(databaseName, {
        transient: databaseTransient,
        dataRetentionTimeInDays: parseRetentionTime(database['retention_time'])
      })

      const schemas = await this._schemasQuery(databaseName)
      for (const schema of schemas.filter((s: any) => !SnowflakeConnector.SYSTEM_SCHEMATA.includes(s['name']))) {
        const schemaName = schema['name']
        const schemaTransient = (schema['options'] as string).includes('TRANSIENT')
        const schemaManagedAccess = (schema['options'] as string).includes('MANAGED ACCESS')
        const roleoutSchema = new Schema(schemaName, roleoutDatabase, {
          transient: schemaTransient,
          dataRetentionTimeInDays: parseRetentionTime(schema['retention_time']),
          managedAccess: schemaManagedAccess
        })
        roleoutDatabase.schemata.push(roleoutSchema)
      }

      roleoutDatabases.push(roleoutDatabase)
    }
    return roleoutDatabases
  }


  protected async _virtualWarehousesQuery() {
    return await this._executeQuery('SHOW WAREHOUSES')
  }

  protected async _rolesQuery() {
    return await this._executeQuery('SHOW ROLES')
  }

  protected async _databasesQuery() {
    return await this._executeQuery('SHOW DATABASES')
  }

  protected async _schemasQuery(databaseName: string) {
    return await this._executeQuery(`SHOW SCHEMAS IN DATABASE "${databaseName}"`)
  }

  protected async _executeQuery(sql: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.conn.execute({
        sqlText: sql,
        complete: (err, stmt, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
        }
      })
    })
  }
}
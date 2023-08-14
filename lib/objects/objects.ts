export type SnowflakeObjectType = AccountObjectType | SchemaObjectType

export enum AccountObjectType {
  USER = 'USER',
  RESOURCE_MONITOR = 'RESOURCE MONITOR',
  WAREHOUSE = 'WAREHOUSE',
  DATABASE = 'DATABASE',
  INTEGRATION = 'INTEGRATION',
  FAILOVER_GROUP = 'FAILOVER GROUP',
  REPLICATION_GROUP = 'REPLICATION GROUP'
}

export enum SchemaObjectType {
  ALERT = 'ALERT',
  EVENT_TABLE = 'EVENT TABLE',
  FILE_FORMAT = 'FILE FORMAT',
  FUNCTION = 'FUNCTION',
  PROCEDURE = 'PROCEDURE',
  SECRET = 'SECRET',
  SEQUENCE = 'SEQUENCE',
  PIPE = 'PIPE',
  MASKING_POLICY = 'MASKING POLICY',
  PASSWORD_POLICY = 'PASSWORD POLICY',
  ROW_ACCESS_POLICY = 'ROW ACCESS POLICY',
  SESSION_POLICY = 'SESSION POLICY',
  TAG = 'TAG',
  STAGE = 'STAGE',
  STREAM = 'STREAM',
  TABLE = 'TABLE',
  EXTERNAL_TABLE = 'EXTERNAL TABLE',
  TASK = 'TASK',
  VIEW = 'VIEW',
  MATERIALIZED_VIEW = 'MATERIALIZED VIEW'
}

export function pluralize(objectType: SnowflakeObjectType): string {
  if(objectType.includes('POLICY')) {
    return objectType.replace('POLICY', 'POLICIES')
  }
  return objectType + 'S'
}
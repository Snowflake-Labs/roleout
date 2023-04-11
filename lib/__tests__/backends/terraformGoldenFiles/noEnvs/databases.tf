resource snowflake_database PROD_DB {
  name = "PROD_DB"
  is_transient = false
  data_retention_time_in_days = 90
}

resource snowflake_schema PROD_DB__COMMON {
  database = snowflake_database.PROD_DB.name
  name = "COMMON"
  is_managed = true
  is_transient = false
}

resource snowflake_schema PROD_DB__RAW {
  database = snowflake_database.PROD_DB.name
  name = "RAW"
  is_managed = false
  is_transient = true
  data_retention_days = 10
}

resource snowflake_database SANDBOX_DB {
  name = "SANDBOX_DB"
  is_transient = true
  data_retention_time_in_days = 0
}
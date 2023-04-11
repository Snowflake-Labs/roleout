resource snowflake_database PROD_EXAMPLE_DB {
  name = "PROD_EXAMPLE_DB"
  is_transient = false
}

resource snowflake_schema PROD_EXAMPLE_DB__COMMON {
  database = snowflake_database.PROD_EXAMPLE_DB.name
  name = "COMMON"
  is_managed = true
  is_transient = false
}

resource snowflake_schema PROD_EXAMPLE_DB__RAW {
  database = snowflake_database.PROD_EXAMPLE_DB.name
  name = "RAW"
  is_managed = false
  is_transient = true
  data_retention_days = 10
}

resource snowflake_database PROD_SANDBOX_DB {
  name = "PROD_SANDBOX_DB"
  is_transient = false
  data_retention_time_in_days = 10
}

resource snowflake_database DEV_EXAMPLE_DB {
  name = "DEV_EXAMPLE_DB"
  is_transient = false
}

resource snowflake_schema DEV_EXAMPLE_DB__COMMON {
  database = snowflake_database.DEV_EXAMPLE_DB.name
  name = "COMMON"
  is_managed = true
  is_transient = false
}

resource snowflake_schema DEV_EXAMPLE_DB__RAW {
  database = snowflake_database.DEV_EXAMPLE_DB.name
  name = "RAW"
  is_managed = true
  is_transient = true
  data_retention_days = 0
}

resource snowflake_database DEV_SANDBOX_DB {
  name = "DEV_SANDBOX_DB"
  is_transient = true
  data_retention_time_in_days = 0
}

resource snowflake_database TEST_EXAMPLE_DB {
  name = "TEST_EXAMPLE_DB"
  is_transient = false
}

resource snowflake_schema TEST_EXAMPLE_DB__COMMON {
  database = snowflake_database.TEST_EXAMPLE_DB.name
  name = "COMMON"
  is_managed = true
  is_transient = false
}

resource snowflake_schema TEST_EXAMPLE_DB__RAW {
  database = snowflake_database.TEST_EXAMPLE_DB.name
  name = "RAW"
  is_managed = true
  is_transient = false
}

resource snowflake_database TEST_SANDBOX_DB {
  name = "TEST_SANDBOX_DB"
  is_transient = false
}
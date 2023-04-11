resource snowflake_role PROD_EXAMPLE_DB_COMMON_R_AR {
  name = "PROD_EXAMPLE_DB_COMMON_R_AR"
}

resource snowflake_role PROD_EXAMPLE_DB_COMMON_RW_AR {
  name = "PROD_EXAMPLE_DB_COMMON_RW_AR"
}

resource snowflake_role PROD_EXAMPLE_DB_COMMON_FULL_AR {
  name = "PROD_EXAMPLE_DB_COMMON_FULL_AR"
}

resource snowflake_role PROD_EXAMPLE_DB_RAW_R_AR {
  name = "PROD_EXAMPLE_DB_RAW_R_AR"
}

resource snowflake_role PROD_EXAMPLE_DB_RAW_RW_AR {
  name = "PROD_EXAMPLE_DB_RAW_RW_AR"
}

resource snowflake_role PROD_EXAMPLE_DB_RAW_FULL_AR {
  name = "PROD_EXAMPLE_DB_RAW_FULL_AR"
}

resource snowflake_role PROD_SOG_SOME_OBJECTS_R_AR {
  name = "PROD_SOG_SOME_OBJECTS_R_AR"
}

resource snowflake_role PROD_SOG_SOME_OBJECTS_RW_AR {
  name = "PROD_SOG_SOME_OBJECTS_RW_AR"
}

resource snowflake_role PROD_BI_WH_U_AR {
  name = "PROD_BI_WH_U_AR"
}

resource snowflake_role PROD_BI_WH_UM_AR {
  name = "PROD_BI_WH_UM_AR"
}

resource snowflake_role PROD_BI_WH_FULL_AR {
  name = "PROD_BI_WH_FULL_AR"
}

resource snowflake_role PROD_DSCI_WH_U_AR {
  name = "PROD_DSCI_WH_U_AR"
}

resource snowflake_role PROD_DSCI_WH_UM_AR {
  name = "PROD_DSCI_WH_UM_AR"
}

resource snowflake_role PROD_DSCI_WH_FULL_AR {
  name = "PROD_DSCI_WH_FULL_AR"
}

resource snowflake_role PROD_ELT_WH_U_AR {
  name = "PROD_ELT_WH_U_AR"
}

resource snowflake_role PROD_ELT_WH_UM_AR {
  name = "PROD_ELT_WH_UM_AR"
}

resource snowflake_role PROD_ELT_WH_FULL_AR {
  name = "PROD_ELT_WH_FULL_AR"
}

resource snowflake_role PROD_DEVOPS_WH_U_AR {
  name = "PROD_DEVOPS_WH_U_AR"
}

resource snowflake_role PROD_DEVOPS_WH_UM_AR {
  name = "PROD_DEVOPS_WH_UM_AR"
}

resource snowflake_role PROD_DEVOPS_WH_FULL_AR {
  name = "PROD_DEVOPS_WH_FULL_AR"
}

resource snowflake_database_grant grant_usage_on_prod_example_db_database {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  privilege = "USAGE"
  roles = ["PROD_EXAMPLE_DB_COMMON_R_AR", "PROD_EXAMPLE_DB_COMMON_RW_AR", "PROD_EXAMPLE_DB_COMMON_FULL_AR", "PROD_EXAMPLE_DB_COMMON_FULL_AR", "PROD_EXAMPLE_DB_RAW_R_AR", "PROD_EXAMPLE_DB_RAW_RW_AR", "PROD_EXAMPLE_DB_RAW_FULL_AR", "PROD_EXAMPLE_DB_RAW_FULL_AR", "PROD_SOG_SOME_OBJECTS_R_AR", "PROD_SOG_SOME_OBJECTS_RW_AR"]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_schema_grant grant_usage_on_prod_example_db_common_schema {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name

  privilege = "USAGE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name, snowflake_role.PROD_SOG_SOME_OBJECTS_R_AR.name, snowflake_role.PROD_SOG_SOME_OBJECTS_RW_AR.name]

  depends_on = [snowflake_role_grants.role_prod_example_db_common_r_ar_grants,snowflake_role_grants.role_prod_example_db_common_rw_ar_grants,snowflake_role_grants.role_prod_example_db_common_full_ar_grants,snowflake_role_grants.role_prod_example_db_common_full_ar_grants,snowflake_role_grants.role_prod_sog_some_objects_r_ar_grants,snowflake_role_grants.role_prod_sog_some_objects_rw_ar_grants]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_schema_grant grant_ownership_on_prod_example_db_common_schema {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]

  depends_on = [snowflake_role_grants.role_prod_example_db_common_full_ar_grants]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_schema_grant grant_usage_on_prod_example_db_raw_schema {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name

  privilege = "USAGE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name, snowflake_role.PROD_SOG_SOME_OBJECTS_R_AR.name, snowflake_role.PROD_SOG_SOME_OBJECTS_RW_AR.name]

  depends_on = [snowflake_role_grants.role_prod_example_db_raw_r_ar_grants,snowflake_role_grants.role_prod_example_db_raw_rw_ar_grants,snowflake_role_grants.role_prod_example_db_raw_full_ar_grants,snowflake_role_grants.role_prod_example_db_raw_full_ar_grants,snowflake_role_grants.role_prod_sog_some_objects_r_ar_grants,snowflake_role_grants.role_prod_sog_some_objects_rw_ar_grants]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_schema_grant grant_ownership_on_prod_example_db_raw_schema {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]

  depends_on = [snowflake_role_grants.role_prod_example_db_raw_full_ar_grants]

  with_grant_option = false
  enable_multiple_grants = true
}

module "PROD_EXAMPLE_DB__COMMON_grant_SELECT_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name
  privilege = "SELECT"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_table_grant grant_select_on_future_prod_example_db_prod_example_db__common_tables {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name

  privilege = "SELECT"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_common_schema]
}

module "PROD_EXAMPLE_DB__COMMON_grant_INSERT_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name
  privilege = "INSERT"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

module "PROD_EXAMPLE_DB__COMMON_grant_UPDATE_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name
  privilege = "UPDATE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

module "PROD_EXAMPLE_DB__COMMON_grant_DELETE_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name
  privilege = "DELETE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

module "PROD_EXAMPLE_DB__COMMON_grant_REFERENCES_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name
  privilege = "REFERENCES"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_table_grant grant_insert_on_future_prod_example_db_prod_example_db__common_tables {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name

  privilege = "INSERT"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_common_schema]
}

resource snowflake_table_grant grant_update_on_future_prod_example_db_prod_example_db__common_tables {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name

  privilege = "UPDATE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_common_schema]
}

resource snowflake_table_grant grant_delete_on_future_prod_example_db_prod_example_db__common_tables {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name

  privilege = "DELETE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_common_schema]
}

resource snowflake_table_grant grant_references_on_future_prod_example_db_prod_example_db__common_tables {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name

  privilege = "REFERENCES"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_common_schema]
}

module "PROD_EXAMPLE_DB__COMMON_grant_OWNERSHIP_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_table_grant grant_ownership_on_future_prod_example_db_prod_example_db__common_tables {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_common_schema]
}

module "PROD_EXAMPLE_DB__RAW_grant_SELECT_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name
  privilege = "SELECT"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_table_grant grant_select_on_future_prod_example_db_prod_example_db__raw_tables {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name

  privilege = "SELECT"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_raw_schema]
}

module "PROD_EXAMPLE_DB__RAW_grant_INSERT_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name
  privilege = "INSERT"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

module "PROD_EXAMPLE_DB__RAW_grant_UPDATE_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name
  privilege = "UPDATE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

module "PROD_EXAMPLE_DB__RAW_grant_DELETE_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name
  privilege = "DELETE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

module "PROD_EXAMPLE_DB__RAW_grant_REFERENCES_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name
  privilege = "REFERENCES"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_table_grant grant_insert_on_future_prod_example_db_prod_example_db__raw_tables {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name

  privilege = "INSERT"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_raw_schema]
}

resource snowflake_table_grant grant_update_on_future_prod_example_db_prod_example_db__raw_tables {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name

  privilege = "UPDATE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_raw_schema]
}

resource snowflake_table_grant grant_delete_on_future_prod_example_db_prod_example_db__raw_tables {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name

  privilege = "DELETE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_raw_schema]
}

resource snowflake_table_grant grant_references_on_future_prod_example_db_prod_example_db__raw_tables {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name

  privilege = "REFERENCES"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_raw_schema]
}

module "PROD_EXAMPLE_DB__RAW_grant_OWNERSHIP_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_table_grant grant_ownership_on_future_prod_example_db_prod_example_db__raw_tables {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_raw_schema]
}

resource snowflake_table_grant grant_select_on_prod_example_db_prod_example_db__raw_tables_MY_TABLE {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name
  table_name = "MY_TABLE"
  privilege = "SELECT"
  roles = [snowflake_role.PROD_SOG_SOME_OBJECTS_R_AR.name, snowflake_role.PROD_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

resource snowflake_table_grant grant_select_on_prod_example_db_prod_example_db__common_tables_SEED_DATA {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name
  table_name = "SEED_DATA"
  privilege = "SELECT"
  roles = [snowflake_role.PROD_SOG_SOME_OBJECTS_R_AR.name, snowflake_role.PROD_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

resource snowflake_table_grant grant_insert_on_prod_example_db_prod_example_db__raw_tables_MY_TABLE {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name
  table_name = "MY_TABLE"
  privilege = "INSERT"
  roles = [snowflake_role.PROD_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

resource snowflake_table_grant grant_update_on_prod_example_db_prod_example_db__raw_tables_MY_TABLE {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name
  table_name = "MY_TABLE"
  privilege = "UPDATE"
  roles = [snowflake_role.PROD_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

resource snowflake_table_grant grant_delete_on_prod_example_db_prod_example_db__raw_tables_MY_TABLE {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name
  table_name = "MY_TABLE"
  privilege = "DELETE"
  roles = [snowflake_role.PROD_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

resource snowflake_table_grant grant_insert_on_prod_example_db_prod_example_db__common_tables_SEED_DATA {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name
  table_name = "SEED_DATA"
  privilege = "INSERT"
  roles = [snowflake_role.PROD_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

resource snowflake_table_grant grant_update_on_prod_example_db_prod_example_db__common_tables_SEED_DATA {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name
  table_name = "SEED_DATA"
  privilege = "UPDATE"
  roles = [snowflake_role.PROD_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

resource snowflake_table_grant grant_delete_on_prod_example_db_prod_example_db__common_tables_SEED_DATA {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name
  table_name = "SEED_DATA"
  privilege = "DELETE"
  roles = [snowflake_role.PROD_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

module "PROD_EXAMPLE_DB__COMMON_grant_SELECT_on_current_views" {
  source = "./modules/snowflake-grant-all-current-views"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name
  privilege = "SELECT"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_view_grant grant_select_on_future_prod_example_db_prod_example_db__common_views {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name

  privilege = "SELECT"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_common_schema]
}

module "PROD_EXAMPLE_DB__COMMON_grant_OWNERSHIP_on_current_views" {
  source = "./modules/snowflake-grant-all-current-views"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_view_grant grant_ownership_on_future_prod_example_db_prod_example_db__common_views {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_common_schema]
}

module "PROD_EXAMPLE_DB__RAW_grant_SELECT_on_current_views" {
  source = "./modules/snowflake-grant-all-current-views"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name
  privilege = "SELECT"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_view_grant grant_select_on_future_prod_example_db_prod_example_db__raw_views {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name

  privilege = "SELECT"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_raw_schema]
}

module "PROD_EXAMPLE_DB__RAW_grant_OWNERSHIP_on_current_views" {
  source = "./modules/snowflake-grant-all-current-views"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_view_grant grant_ownership_on_future_prod_example_db_prod_example_db__raw_views {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_raw_schema]
}

resource snowflake_view_grant grant_select_on_prod_example_db_prod_example_db__raw_views_MY_VIEW {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name
  view_name = "MY_VIEW"
  privilege = "SELECT"
  roles = [snowflake_role.PROD_SOG_SOME_OBJECTS_R_AR.name, snowflake_role.PROD_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

resource snowflake_view_grant grant_select_on_prod_example_db_prod_example_db__common_views_ANOTHER_VIEW {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name
  view_name = "ANOTHER_VIEW"
  privilege = "SELECT"
  roles = [snowflake_role.PROD_SOG_SOME_OBJECTS_R_AR.name, snowflake_role.PROD_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

module "PROD_EXAMPLE_DB__COMMON_grant_USAGE_on_current_sequences" {
  source = "./modules/snowflake-grant-all-current-sequences"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name
  privilege = "USAGE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_sequence_grant grant_usage_on_future_prod_example_db_prod_example_db__common_sequences {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name

  privilege = "USAGE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_common_schema]
}

module "PROD_EXAMPLE_DB__COMMON_grant_OWNERSHIP_on_current_sequences" {
  source = "./modules/snowflake-grant-all-current-sequences"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_sequence_grant grant_ownership_on_future_prod_example_db_prod_example_db__common_sequences {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_common_schema]
}

module "PROD_EXAMPLE_DB__RAW_grant_USAGE_on_current_sequences" {
  source = "./modules/snowflake-grant-all-current-sequences"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name
  privilege = "USAGE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_sequence_grant grant_usage_on_future_prod_example_db_prod_example_db__raw_sequences {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name

  privilege = "USAGE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_raw_schema]
}

module "PROD_EXAMPLE_DB__RAW_grant_OWNERSHIP_on_current_sequences" {
  source = "./modules/snowflake-grant-all-current-sequences"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_sequence_grant grant_ownership_on_future_prod_example_db_prod_example_db__raw_sequences {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_raw_schema]
}

module "PROD_EXAMPLE_DB__COMMON_grant_USAGE_on_current_stages" {
  source = "./modules/snowflake-grant-all-current-stages"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name
  privilege = "USAGE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

module "PROD_EXAMPLE_DB__COMMON_grant_READ_on_current_stages" {
  source = "./modules/snowflake-grant-all-current-stages"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name
  privilege = "READ"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_stage_grant grant_usage_on_future_prod_example_db_prod_example_db__common_stages {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name

  privilege = "USAGE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_common_schema]
}

resource snowflake_stage_grant grant_read_on_future_prod_example_db_prod_example_db__common_stages {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name

  privilege = "READ"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_common_schema]
}

resource snowflake_stage_grant grant_write_on_future_prod_example_db_prod_example_db__common_stages {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name

  privilege = "WRITE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_stage_grant.grant_usage_on_future_prod_example_db_prod_example_db__common_stages, snowflake_stage_grant.grant_read_on_future_prod_example_db_prod_example_db__common_stages]
}

module "PROD_EXAMPLE_DB__COMMON_grant_WRITE_on_current_stages" {
  source = "./modules/snowflake-grant-all-current-stages"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name
  privilege = "WRITE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

module "PROD_EXAMPLE_DB__COMMON_grant_OWNERSHIP_on_current_stages" {
  source = "./modules/snowflake-grant-all-current-stages"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_stage_grant grant_ownership_on_future_prod_example_db_prod_example_db__common_stages {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_common_schema]
}

module "PROD_EXAMPLE_DB__RAW_grant_USAGE_on_current_stages" {
  source = "./modules/snowflake-grant-all-current-stages"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name
  privilege = "USAGE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

module "PROD_EXAMPLE_DB__RAW_grant_READ_on_current_stages" {
  source = "./modules/snowflake-grant-all-current-stages"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name
  privilege = "READ"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_stage_grant grant_usage_on_future_prod_example_db_prod_example_db__raw_stages {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name

  privilege = "USAGE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_raw_schema]
}

resource snowflake_stage_grant grant_read_on_future_prod_example_db_prod_example_db__raw_stages {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name

  privilege = "READ"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_raw_schema]
}

resource snowflake_stage_grant grant_write_on_future_prod_example_db_prod_example_db__raw_stages {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name

  privilege = "WRITE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_stage_grant.grant_usage_on_future_prod_example_db_prod_example_db__raw_stages, snowflake_stage_grant.grant_read_on_future_prod_example_db_prod_example_db__raw_stages]
}

module "PROD_EXAMPLE_DB__RAW_grant_WRITE_on_current_stages" {
  source = "./modules/snowflake-grant-all-current-stages"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name
  privilege = "WRITE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

module "PROD_EXAMPLE_DB__RAW_grant_OWNERSHIP_on_current_stages" {
  source = "./modules/snowflake-grant-all-current-stages"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_stage_grant grant_ownership_on_future_prod_example_db_prod_example_db__raw_stages {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_raw_schema]
}

module "PROD_EXAMPLE_DB__COMMON_grant_USAGE_on_current_file-formats" {
  source = "./modules/snowflake-grant-all-current-file-formats"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name
  privilege = "USAGE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_file_format_grant grant_usage_on_future_prod_example_db_prod_example_db__common_file_formats {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name

  privilege = "USAGE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_common_schema]
}

module "PROD_EXAMPLE_DB__COMMON_grant_OWNERSHIP_on_current_file-formats" {
  source = "./modules/snowflake-grant-all-current-file-formats"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_file_format_grant grant_ownership_on_future_prod_example_db_prod_example_db__common_file_formats {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_common_schema]
}

module "PROD_EXAMPLE_DB__RAW_grant_USAGE_on_current_file-formats" {
  source = "./modules/snowflake-grant-all-current-file-formats"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name
  privilege = "USAGE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_file_format_grant grant_usage_on_future_prod_example_db_prod_example_db__raw_file_formats {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name

  privilege = "USAGE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_raw_schema]
}

module "PROD_EXAMPLE_DB__RAW_grant_OWNERSHIP_on_current_file-formats" {
  source = "./modules/snowflake-grant-all-current-file-formats"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_file_format_grant grant_ownership_on_future_prod_example_db_prod_example_db__raw_file_formats {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_raw_schema]
}

module "PROD_EXAMPLE_DB__COMMON_grant_SELECT_on_current_streams" {
  source = "./modules/snowflake-grant-all-current-streams"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name
  privilege = "SELECT"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_stream_grant grant_select_on_future_prod_example_db_prod_example_db__common_streams {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name

  privilege = "SELECT"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_common_schema]
}

module "PROD_EXAMPLE_DB__COMMON_grant_OWNERSHIP_on_current_streams" {
  source = "./modules/snowflake-grant-all-current-streams"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_stream_grant grant_ownership_on_future_prod_example_db_prod_example_db__common_streams {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_common_schema]
}

module "PROD_EXAMPLE_DB__RAW_grant_SELECT_on_current_streams" {
  source = "./modules/snowflake-grant-all-current-streams"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name
  privilege = "SELECT"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_stream_grant grant_select_on_future_prod_example_db_prod_example_db__raw_streams {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name

  privilege = "SELECT"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_raw_schema]
}

module "PROD_EXAMPLE_DB__RAW_grant_OWNERSHIP_on_current_streams" {
  source = "./modules/snowflake-grant-all-current-streams"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_stream_grant grant_ownership_on_future_prod_example_db_prod_example_db__raw_streams {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_raw_schema]
}

module "PROD_EXAMPLE_DB__COMMON_grant_USAGE_on_current_procedures" {
  source = "./modules/snowflake-grant-all-current-procedures"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name
  privilege = "USAGE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_procedure_grant grant_usage_on_future_prod_example_db_prod_example_db__common_procedures {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name

  privilege = "USAGE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_common_schema]
}

module "PROD_EXAMPLE_DB__COMMON_grant_OWNERSHIP_on_current_procedures" {
  source = "./modules/snowflake-grant-all-current-procedures"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_procedure_grant grant_ownership_on_future_prod_example_db_prod_example_db__common_procedures {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_common_schema]
}

module "PROD_EXAMPLE_DB__RAW_grant_USAGE_on_current_procedures" {
  source = "./modules/snowflake-grant-all-current-procedures"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name
  privilege = "USAGE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_procedure_grant grant_usage_on_future_prod_example_db_prod_example_db__raw_procedures {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name

  privilege = "USAGE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_raw_schema]
}

module "PROD_EXAMPLE_DB__RAW_grant_OWNERSHIP_on_current_procedures" {
  source = "./modules/snowflake-grant-all-current-procedures"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_procedure_grant grant_ownership_on_future_prod_example_db_prod_example_db__raw_procedures {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_raw_schema]
}

module "PROD_EXAMPLE_DB__COMMON_grant_USAGE_on_current_functions" {
  source = "./modules/snowflake-grant-all-current-functions"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name
  privilege = "USAGE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_function_grant grant_usage_on_future_prod_example_db_prod_example_db__common_functions {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name

  privilege = "USAGE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_common_schema]
}

module "PROD_EXAMPLE_DB__COMMON_grant_OWNERSHIP_on_current_functions" {
  source = "./modules/snowflake-grant-all-current-functions"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_function_grant grant_ownership_on_future_prod_example_db_prod_example_db__common_functions {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_common_schema]
}

module "PROD_EXAMPLE_DB__RAW_grant_USAGE_on_current_functions" {
  source = "./modules/snowflake-grant-all-current-functions"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name
  privilege = "USAGE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_function_grant grant_usage_on_future_prod_example_db_prod_example_db__raw_functions {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name

  privilege = "USAGE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_raw_schema]
}

module "PROD_EXAMPLE_DB__RAW_grant_OWNERSHIP_on_current_functions" {
  source = "./modules/snowflake-grant-all-current-functions"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_function_grant grant_ownership_on_future_prod_example_db_prod_example_db__raw_functions {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_raw_schema]
}

module "PROD_EXAMPLE_DB__COMMON_grant_MONITOR_on_current_tasks" {
  source = "./modules/snowflake-grant-all-current-tasks"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name
  privilege = "MONITOR"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

module "PROD_EXAMPLE_DB__COMMON_grant_OPERATE_on_current_tasks" {
  source = "./modules/snowflake-grant-all-current-tasks"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name
  privilege = "OPERATE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_task_grant grant_monitor_on_future_prod_example_db_prod_example_db__common_tasks {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name

  privilege = "MONITOR"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_common_schema]
}

resource snowflake_task_grant grant_operate_on_future_prod_example_db_prod_example_db__common_tasks {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__COMMON.name

  privilege = "OPERATE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_common_schema]
}

module "PROD_EXAMPLE_DB__RAW_grant_MONITOR_on_current_tasks" {
  source = "./modules/snowflake-grant-all-current-tasks"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name
  privilege = "MONITOR"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

module "PROD_EXAMPLE_DB__RAW_grant_OPERATE_on_current_tasks" {
  source = "./modules/snowflake-grant-all-current-tasks"
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name
  privilege = "OPERATE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_task_grant grant_monitor_on_future_prod_example_db_prod_example_db__raw_tasks {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name

  privilege = "MONITOR"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_raw_schema]
}

resource snowflake_task_grant grant_operate_on_future_prod_example_db_prod_example_db__raw_tasks {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  schema_name = snowflake_schema.PROD_EXAMPLE_DB__RAW.name

  privilege = "OPERATE"
  roles = [snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_example_db_raw_schema]
}

resource snowflake_warehouse_grant grant_usage_on_warehouse_prod_bi_wh {
  warehouse_name = snowflake_warehouse.PROD_BI_WH.name
  privilege = "USAGE"

  roles = [snowflake_role.PROD_BI_WH_U_AR.name, snowflake_role.PROD_BI_WH_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_monitor_on_warehouse_prod_bi_wh {
  warehouse_name = snowflake_warehouse.PROD_BI_WH.name
  privilege = "MONITOR"

  roles = [snowflake_role.PROD_BI_WH_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_ownership_on_warehouse_prod_bi_wh {
  warehouse_name = snowflake_warehouse.PROD_BI_WH.name
  privilege = "OWNERSHIP"

  roles = [snowflake_role.PROD_BI_WH_FULL_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_usage_on_warehouse_prod_dsci_wh {
  warehouse_name = snowflake_warehouse.PROD_DSCI_WH.name
  privilege = "USAGE"

  roles = [snowflake_role.PROD_DSCI_WH_U_AR.name, snowflake_role.PROD_DSCI_WH_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_monitor_on_warehouse_prod_dsci_wh {
  warehouse_name = snowflake_warehouse.PROD_DSCI_WH.name
  privilege = "MONITOR"

  roles = [snowflake_role.PROD_DSCI_WH_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_ownership_on_warehouse_prod_dsci_wh {
  warehouse_name = snowflake_warehouse.PROD_DSCI_WH.name
  privilege = "OWNERSHIP"

  roles = [snowflake_role.PROD_DSCI_WH_FULL_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_usage_on_warehouse_prod_elt_wh {
  warehouse_name = snowflake_warehouse.PROD_ELT_WH.name
  privilege = "USAGE"

  roles = [snowflake_role.PROD_ELT_WH_U_AR.name, snowflake_role.PROD_ELT_WH_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_monitor_on_warehouse_prod_elt_wh {
  warehouse_name = snowflake_warehouse.PROD_ELT_WH.name
  privilege = "MONITOR"

  roles = [snowflake_role.PROD_ELT_WH_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_ownership_on_warehouse_prod_elt_wh {
  warehouse_name = snowflake_warehouse.PROD_ELT_WH.name
  privilege = "OWNERSHIP"

  roles = [snowflake_role.PROD_ELT_WH_FULL_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_usage_on_warehouse_prod_devops_wh {
  warehouse_name = snowflake_warehouse.PROD_DEVOPS_WH.name
  privilege = "USAGE"

  roles = [snowflake_role.PROD_DEVOPS_WH_U_AR.name, snowflake_role.PROD_DEVOPS_WH_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_monitor_on_warehouse_prod_devops_wh {
  warehouse_name = snowflake_warehouse.PROD_DEVOPS_WH.name
  privilege = "MONITOR"

  roles = [snowflake_role.PROD_DEVOPS_WH_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_ownership_on_warehouse_prod_devops_wh {
  warehouse_name = snowflake_warehouse.PROD_DEVOPS_WH.name
  privilege = "OWNERSHIP"

  roles = [snowflake_role.PROD_DEVOPS_WH_FULL_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_role_grants role_prod_example_db_common_r_ar_grants {
  role_name = snowflake_role.PROD_EXAMPLE_DB_COMMON_R_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.PROD_DATA_ANALYST_ROLE.name,
    snowflake_role.PROD_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_prod_example_db_common_rw_ar_grants {
  role_name = snowflake_role.PROD_EXAMPLE_DB_COMMON_RW_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.PROD_DATA_SCIENTIST_ROLE.name,
    snowflake_role.PROD_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_prod_example_db_common_full_ar_grants {
  role_name = snowflake_role.PROD_EXAMPLE_DB_COMMON_FULL_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.PROD_ELT_TOOL_ROLE.name,
    snowflake_role.PROD_DEVOPS_ROLE.name,
    snowflake_role.PROD_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_prod_example_db_raw_r_ar_grants {
  role_name = snowflake_role.PROD_EXAMPLE_DB_RAW_R_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.PROD_DATA_ANALYST_ROLE.name,
    snowflake_role.PROD_DATA_SCIENTIST_ROLE.name,
    snowflake_role.PROD_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_prod_example_db_raw_rw_ar_grants {
  role_name = snowflake_role.PROD_EXAMPLE_DB_RAW_RW_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.PROD_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_prod_example_db_raw_full_ar_grants {
  role_name = snowflake_role.PROD_EXAMPLE_DB_RAW_FULL_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.PROD_ELT_TOOL_ROLE.name,
    snowflake_role.PROD_DEVOPS_ROLE.name,
    snowflake_role.PROD_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_prod_sog_some_objects_r_ar_grants {
  role_name = snowflake_role.PROD_SOG_SOME_OBJECTS_R_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.PROD_DATA_ANALYST_ROLE.name,
    snowflake_role.PROD_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_prod_sog_some_objects_rw_ar_grants {
  role_name = snowflake_role.PROD_SOG_SOME_OBJECTS_RW_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.PROD_ELT_TOOL_ROLE.name,
    snowflake_role.PROD_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_prod_bi_wh_u_ar_grants {
  role_name = snowflake_role.PROD_BI_WH_U_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.PROD_DATA_ANALYST_ROLE.name,
    snowflake_role.PROD_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_prod_bi_wh_um_ar_grants {
  role_name = snowflake_role.PROD_BI_WH_UM_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.PROD_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_prod_bi_wh_full_ar_grants {
  role_name = snowflake_role.PROD_BI_WH_FULL_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.PROD_DEVOPS_ROLE.name,
    snowflake_role.PROD_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_prod_dsci_wh_u_ar_grants {
  role_name = snowflake_role.PROD_DSCI_WH_U_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.PROD_DATA_SCIENTIST_ROLE.name,
    snowflake_role.PROD_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_prod_dsci_wh_um_ar_grants {
  role_name = snowflake_role.PROD_DSCI_WH_UM_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.PROD_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_prod_dsci_wh_full_ar_grants {
  role_name = snowflake_role.PROD_DSCI_WH_FULL_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.PROD_DEVOPS_ROLE.name,
    snowflake_role.PROD_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_prod_elt_wh_u_ar_grants {
  role_name = snowflake_role.PROD_ELT_WH_U_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.PROD_ELT_TOOL_ROLE.name,
    snowflake_role.PROD_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_prod_elt_wh_um_ar_grants {
  role_name = snowflake_role.PROD_ELT_WH_UM_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.PROD_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_prod_elt_wh_full_ar_grants {
  role_name = snowflake_role.PROD_ELT_WH_FULL_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.PROD_DEVOPS_ROLE.name,
    snowflake_role.PROD_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_prod_devops_wh_u_ar_grants {
  role_name = snowflake_role.PROD_DEVOPS_WH_U_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.PROD_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_prod_devops_wh_um_ar_grants {
  role_name = snowflake_role.PROD_DEVOPS_WH_UM_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.PROD_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_prod_devops_wh_full_ar_grants {
  role_name = snowflake_role.PROD_DEVOPS_WH_FULL_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.PROD_DEVOPS_ROLE.name,
    snowflake_role.PROD_SYSADMIN.name,
  ]
}

resource snowflake_role PROD_SYSADMIN {
  name = "PROD_SYSADMIN"
}

resource snowflake_role_grants role_prod_sysadmin_grants {
  role_name = snowflake_role.PROD_SYSADMIN.name

  enable_multiple_grants = true
  roles = [
    "SYSADMIN",
  ]
}

resource snowflake_database_grant grant_ownership_on_prod_example_db_database {
  database_name = snowflake_database.PROD_EXAMPLE_DB.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_SYSADMIN.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_role_grants.role_prod_sysadmin_grants]
}

resource snowflake_database_grant grant_ownership_on_prod_sandbox_db_database {
  database_name = snowflake_database.PROD_SANDBOX_DB.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_SYSADMIN.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_role_grants.role_prod_sysadmin_grants]
}

resource snowflake_role DEV_EXAMPLE_DB_COMMON_R_AR {
  name = "DEV_EXAMPLE_DB_COMMON_R_AR"
}

resource snowflake_role DEV_EXAMPLE_DB_COMMON_RW_AR {
  name = "DEV_EXAMPLE_DB_COMMON_RW_AR"
}

resource snowflake_role DEV_EXAMPLE_DB_COMMON_FULL_AR {
  name = "DEV_EXAMPLE_DB_COMMON_FULL_AR"
}

resource snowflake_role DEV_EXAMPLE_DB_RAW_R_AR {
  name = "DEV_EXAMPLE_DB_RAW_R_AR"
}

resource snowflake_role DEV_EXAMPLE_DB_RAW_RW_AR {
  name = "DEV_EXAMPLE_DB_RAW_RW_AR"
}

resource snowflake_role DEV_EXAMPLE_DB_RAW_FULL_AR {
  name = "DEV_EXAMPLE_DB_RAW_FULL_AR"
}

resource snowflake_role DEV_SOG_SOME_OBJECTS_R_AR {
  name = "DEV_SOG_SOME_OBJECTS_R_AR"
}

resource snowflake_role DEV_SOG_SOME_OBJECTS_RW_AR {
  name = "DEV_SOG_SOME_OBJECTS_RW_AR"
}

resource snowflake_role DEV_BI_WH_U_AR {
  name = "DEV_BI_WH_U_AR"
}

resource snowflake_role DEV_BI_WH_UM_AR {
  name = "DEV_BI_WH_UM_AR"
}

resource snowflake_role DEV_BI_WH_FULL_AR {
  name = "DEV_BI_WH_FULL_AR"
}

resource snowflake_role DEV_DSCI_WH_U_AR {
  name = "DEV_DSCI_WH_U_AR"
}

resource snowflake_role DEV_DSCI_WH_UM_AR {
  name = "DEV_DSCI_WH_UM_AR"
}

resource snowflake_role DEV_DSCI_WH_FULL_AR {
  name = "DEV_DSCI_WH_FULL_AR"
}

resource snowflake_role DEV_ELT_WH_U_AR {
  name = "DEV_ELT_WH_U_AR"
}

resource snowflake_role DEV_ELT_WH_UM_AR {
  name = "DEV_ELT_WH_UM_AR"
}

resource snowflake_role DEV_ELT_WH_FULL_AR {
  name = "DEV_ELT_WH_FULL_AR"
}

resource snowflake_role DEV_DEVOPS_WH_U_AR {
  name = "DEV_DEVOPS_WH_U_AR"
}

resource snowflake_role DEV_DEVOPS_WH_UM_AR {
  name = "DEV_DEVOPS_WH_UM_AR"
}

resource snowflake_role DEV_DEVOPS_WH_FULL_AR {
  name = "DEV_DEVOPS_WH_FULL_AR"
}

resource snowflake_database_grant grant_usage_on_dev_example_db_database {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  privilege = "USAGE"
  roles = ["DEV_EXAMPLE_DB_COMMON_R_AR", "DEV_EXAMPLE_DB_COMMON_RW_AR", "DEV_EXAMPLE_DB_COMMON_FULL_AR", "DEV_EXAMPLE_DB_COMMON_FULL_AR", "DEV_EXAMPLE_DB_RAW_R_AR", "DEV_EXAMPLE_DB_RAW_RW_AR", "DEV_EXAMPLE_DB_RAW_FULL_AR", "DEV_EXAMPLE_DB_RAW_FULL_AR", "DEV_SOG_SOME_OBJECTS_R_AR", "DEV_SOG_SOME_OBJECTS_RW_AR"]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_schema_grant grant_usage_on_dev_example_db_common_schema {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name

  privilege = "USAGE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name, snowflake_role.DEV_SOG_SOME_OBJECTS_R_AR.name, snowflake_role.DEV_SOG_SOME_OBJECTS_RW_AR.name]

  depends_on = [snowflake_role_grants.role_dev_example_db_common_r_ar_grants,snowflake_role_grants.role_dev_example_db_common_rw_ar_grants,snowflake_role_grants.role_dev_example_db_common_full_ar_grants,snowflake_role_grants.role_dev_example_db_common_full_ar_grants,snowflake_role_grants.role_dev_sog_some_objects_r_ar_grants,snowflake_role_grants.role_dev_sog_some_objects_rw_ar_grants]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_schema_grant grant_ownership_on_dev_example_db_common_schema {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]

  depends_on = [snowflake_role_grants.role_dev_example_db_common_full_ar_grants]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_schema_grant grant_usage_on_dev_example_db_raw_schema {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name

  privilege = "USAGE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name, snowflake_role.DEV_SOG_SOME_OBJECTS_R_AR.name, snowflake_role.DEV_SOG_SOME_OBJECTS_RW_AR.name]

  depends_on = [snowflake_role_grants.role_dev_example_db_raw_r_ar_grants,snowflake_role_grants.role_dev_example_db_raw_rw_ar_grants,snowflake_role_grants.role_dev_example_db_raw_full_ar_grants,snowflake_role_grants.role_dev_example_db_raw_full_ar_grants,snowflake_role_grants.role_dev_sog_some_objects_r_ar_grants,snowflake_role_grants.role_dev_sog_some_objects_rw_ar_grants]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_schema_grant grant_ownership_on_dev_example_db_raw_schema {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]

  depends_on = [snowflake_role_grants.role_dev_example_db_raw_full_ar_grants]

  with_grant_option = false
  enable_multiple_grants = true
}

module "DEV_EXAMPLE_DB__COMMON_grant_SELECT_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name
  privilege = "SELECT"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_table_grant grant_select_on_future_dev_example_db_dev_example_db__common_tables {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name

  privilege = "SELECT"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_common_schema]
}

module "DEV_EXAMPLE_DB__COMMON_grant_INSERT_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name
  privilege = "INSERT"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

module "DEV_EXAMPLE_DB__COMMON_grant_UPDATE_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name
  privilege = "UPDATE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

module "DEV_EXAMPLE_DB__COMMON_grant_DELETE_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name
  privilege = "DELETE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

module "DEV_EXAMPLE_DB__COMMON_grant_REFERENCES_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name
  privilege = "REFERENCES"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_table_grant grant_insert_on_future_dev_example_db_dev_example_db__common_tables {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name

  privilege = "INSERT"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_common_schema]
}

resource snowflake_table_grant grant_update_on_future_dev_example_db_dev_example_db__common_tables {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name

  privilege = "UPDATE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_common_schema]
}

resource snowflake_table_grant grant_delete_on_future_dev_example_db_dev_example_db__common_tables {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name

  privilege = "DELETE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_common_schema]
}

resource snowflake_table_grant grant_references_on_future_dev_example_db_dev_example_db__common_tables {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name

  privilege = "REFERENCES"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_common_schema]
}

module "DEV_EXAMPLE_DB__COMMON_grant_OWNERSHIP_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_table_grant grant_ownership_on_future_dev_example_db_dev_example_db__common_tables {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_common_schema]
}

module "DEV_EXAMPLE_DB__RAW_grant_SELECT_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name
  privilege = "SELECT"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_table_grant grant_select_on_future_dev_example_db_dev_example_db__raw_tables {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name

  privilege = "SELECT"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_raw_schema]
}

module "DEV_EXAMPLE_DB__RAW_grant_INSERT_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name
  privilege = "INSERT"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

module "DEV_EXAMPLE_DB__RAW_grant_UPDATE_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name
  privilege = "UPDATE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

module "DEV_EXAMPLE_DB__RAW_grant_DELETE_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name
  privilege = "DELETE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

module "DEV_EXAMPLE_DB__RAW_grant_REFERENCES_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name
  privilege = "REFERENCES"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_table_grant grant_insert_on_future_dev_example_db_dev_example_db__raw_tables {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name

  privilege = "INSERT"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_raw_schema]
}

resource snowflake_table_grant grant_update_on_future_dev_example_db_dev_example_db__raw_tables {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name

  privilege = "UPDATE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_raw_schema]
}

resource snowflake_table_grant grant_delete_on_future_dev_example_db_dev_example_db__raw_tables {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name

  privilege = "DELETE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_raw_schema]
}

resource snowflake_table_grant grant_references_on_future_dev_example_db_dev_example_db__raw_tables {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name

  privilege = "REFERENCES"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_raw_schema]
}

module "DEV_EXAMPLE_DB__RAW_grant_OWNERSHIP_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_table_grant grant_ownership_on_future_dev_example_db_dev_example_db__raw_tables {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_raw_schema]
}

resource snowflake_table_grant grant_select_on_dev_example_db_dev_example_db__raw_tables_MY_TABLE {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name
  table_name = "MY_TABLE"
  privilege = "SELECT"
  roles = [snowflake_role.DEV_SOG_SOME_OBJECTS_R_AR.name, snowflake_role.DEV_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

resource snowflake_table_grant grant_select_on_dev_example_db_dev_example_db__common_tables_SEED_DATA {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name
  table_name = "SEED_DATA"
  privilege = "SELECT"
  roles = [snowflake_role.DEV_SOG_SOME_OBJECTS_R_AR.name, snowflake_role.DEV_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

resource snowflake_table_grant grant_insert_on_dev_example_db_dev_example_db__raw_tables_MY_TABLE {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name
  table_name = "MY_TABLE"
  privilege = "INSERT"
  roles = [snowflake_role.DEV_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

resource snowflake_table_grant grant_update_on_dev_example_db_dev_example_db__raw_tables_MY_TABLE {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name
  table_name = "MY_TABLE"
  privilege = "UPDATE"
  roles = [snowflake_role.DEV_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

resource snowflake_table_grant grant_delete_on_dev_example_db_dev_example_db__raw_tables_MY_TABLE {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name
  table_name = "MY_TABLE"
  privilege = "DELETE"
  roles = [snowflake_role.DEV_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

resource snowflake_table_grant grant_insert_on_dev_example_db_dev_example_db__common_tables_SEED_DATA {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name
  table_name = "SEED_DATA"
  privilege = "INSERT"
  roles = [snowflake_role.DEV_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

resource snowflake_table_grant grant_update_on_dev_example_db_dev_example_db__common_tables_SEED_DATA {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name
  table_name = "SEED_DATA"
  privilege = "UPDATE"
  roles = [snowflake_role.DEV_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

resource snowflake_table_grant grant_delete_on_dev_example_db_dev_example_db__common_tables_SEED_DATA {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name
  table_name = "SEED_DATA"
  privilege = "DELETE"
  roles = [snowflake_role.DEV_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

module "DEV_EXAMPLE_DB__COMMON_grant_SELECT_on_current_views" {
  source = "./modules/snowflake-grant-all-current-views"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name
  privilege = "SELECT"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_view_grant grant_select_on_future_dev_example_db_dev_example_db__common_views {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name

  privilege = "SELECT"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_common_schema]
}

module "DEV_EXAMPLE_DB__COMMON_grant_OWNERSHIP_on_current_views" {
  source = "./modules/snowflake-grant-all-current-views"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_view_grant grant_ownership_on_future_dev_example_db_dev_example_db__common_views {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_common_schema]
}

module "DEV_EXAMPLE_DB__RAW_grant_SELECT_on_current_views" {
  source = "./modules/snowflake-grant-all-current-views"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name
  privilege = "SELECT"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_view_grant grant_select_on_future_dev_example_db_dev_example_db__raw_views {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name

  privilege = "SELECT"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_raw_schema]
}

module "DEV_EXAMPLE_DB__RAW_grant_OWNERSHIP_on_current_views" {
  source = "./modules/snowflake-grant-all-current-views"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_view_grant grant_ownership_on_future_dev_example_db_dev_example_db__raw_views {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_raw_schema]
}

resource snowflake_view_grant grant_select_on_dev_example_db_dev_example_db__raw_views_MY_VIEW {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name
  view_name = "MY_VIEW"
  privilege = "SELECT"
  roles = [snowflake_role.DEV_SOG_SOME_OBJECTS_R_AR.name, snowflake_role.DEV_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

resource snowflake_view_grant grant_select_on_dev_example_db_dev_example_db__common_views_ANOTHER_VIEW {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name
  view_name = "ANOTHER_VIEW"
  privilege = "SELECT"
  roles = [snowflake_role.DEV_SOG_SOME_OBJECTS_R_AR.name, snowflake_role.DEV_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

module "DEV_EXAMPLE_DB__COMMON_grant_USAGE_on_current_sequences" {
  source = "./modules/snowflake-grant-all-current-sequences"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name
  privilege = "USAGE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_sequence_grant grant_usage_on_future_dev_example_db_dev_example_db__common_sequences {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name

  privilege = "USAGE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_common_schema]
}

module "DEV_EXAMPLE_DB__COMMON_grant_OWNERSHIP_on_current_sequences" {
  source = "./modules/snowflake-grant-all-current-sequences"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_sequence_grant grant_ownership_on_future_dev_example_db_dev_example_db__common_sequences {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_common_schema]
}

module "DEV_EXAMPLE_DB__RAW_grant_USAGE_on_current_sequences" {
  source = "./modules/snowflake-grant-all-current-sequences"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name
  privilege = "USAGE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_sequence_grant grant_usage_on_future_dev_example_db_dev_example_db__raw_sequences {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name

  privilege = "USAGE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_raw_schema]
}

module "DEV_EXAMPLE_DB__RAW_grant_OWNERSHIP_on_current_sequences" {
  source = "./modules/snowflake-grant-all-current-sequences"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_sequence_grant grant_ownership_on_future_dev_example_db_dev_example_db__raw_sequences {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_raw_schema]
}

module "DEV_EXAMPLE_DB__COMMON_grant_USAGE_on_current_stages" {
  source = "./modules/snowflake-grant-all-current-stages"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name
  privilege = "USAGE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

module "DEV_EXAMPLE_DB__COMMON_grant_READ_on_current_stages" {
  source = "./modules/snowflake-grant-all-current-stages"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name
  privilege = "READ"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_stage_grant grant_usage_on_future_dev_example_db_dev_example_db__common_stages {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name

  privilege = "USAGE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_common_schema]
}

resource snowflake_stage_grant grant_read_on_future_dev_example_db_dev_example_db__common_stages {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name

  privilege = "READ"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_common_schema]
}

resource snowflake_stage_grant grant_write_on_future_dev_example_db_dev_example_db__common_stages {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name

  privilege = "WRITE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_stage_grant.grant_usage_on_future_dev_example_db_dev_example_db__common_stages, snowflake_stage_grant.grant_read_on_future_dev_example_db_dev_example_db__common_stages]
}

module "DEV_EXAMPLE_DB__COMMON_grant_WRITE_on_current_stages" {
  source = "./modules/snowflake-grant-all-current-stages"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name
  privilege = "WRITE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

module "DEV_EXAMPLE_DB__COMMON_grant_OWNERSHIP_on_current_stages" {
  source = "./modules/snowflake-grant-all-current-stages"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_stage_grant grant_ownership_on_future_dev_example_db_dev_example_db__common_stages {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_common_schema]
}

module "DEV_EXAMPLE_DB__RAW_grant_USAGE_on_current_stages" {
  source = "./modules/snowflake-grant-all-current-stages"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name
  privilege = "USAGE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

module "DEV_EXAMPLE_DB__RAW_grant_READ_on_current_stages" {
  source = "./modules/snowflake-grant-all-current-stages"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name
  privilege = "READ"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_stage_grant grant_usage_on_future_dev_example_db_dev_example_db__raw_stages {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name

  privilege = "USAGE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_raw_schema]
}

resource snowflake_stage_grant grant_read_on_future_dev_example_db_dev_example_db__raw_stages {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name

  privilege = "READ"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_raw_schema]
}

resource snowflake_stage_grant grant_write_on_future_dev_example_db_dev_example_db__raw_stages {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name

  privilege = "WRITE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_stage_grant.grant_usage_on_future_dev_example_db_dev_example_db__raw_stages, snowflake_stage_grant.grant_read_on_future_dev_example_db_dev_example_db__raw_stages]
}

module "DEV_EXAMPLE_DB__RAW_grant_WRITE_on_current_stages" {
  source = "./modules/snowflake-grant-all-current-stages"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name
  privilege = "WRITE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

module "DEV_EXAMPLE_DB__RAW_grant_OWNERSHIP_on_current_stages" {
  source = "./modules/snowflake-grant-all-current-stages"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_stage_grant grant_ownership_on_future_dev_example_db_dev_example_db__raw_stages {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_raw_schema]
}

module "DEV_EXAMPLE_DB__COMMON_grant_USAGE_on_current_file-formats" {
  source = "./modules/snowflake-grant-all-current-file-formats"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name
  privilege = "USAGE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_file_format_grant grant_usage_on_future_dev_example_db_dev_example_db__common_file_formats {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name

  privilege = "USAGE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_common_schema]
}

module "DEV_EXAMPLE_DB__COMMON_grant_OWNERSHIP_on_current_file-formats" {
  source = "./modules/snowflake-grant-all-current-file-formats"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_file_format_grant grant_ownership_on_future_dev_example_db_dev_example_db__common_file_formats {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_common_schema]
}

module "DEV_EXAMPLE_DB__RAW_grant_USAGE_on_current_file-formats" {
  source = "./modules/snowflake-grant-all-current-file-formats"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name
  privilege = "USAGE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_file_format_grant grant_usage_on_future_dev_example_db_dev_example_db__raw_file_formats {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name

  privilege = "USAGE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_raw_schema]
}

module "DEV_EXAMPLE_DB__RAW_grant_OWNERSHIP_on_current_file-formats" {
  source = "./modules/snowflake-grant-all-current-file-formats"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_file_format_grant grant_ownership_on_future_dev_example_db_dev_example_db__raw_file_formats {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_raw_schema]
}

module "DEV_EXAMPLE_DB__COMMON_grant_SELECT_on_current_streams" {
  source = "./modules/snowflake-grant-all-current-streams"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name
  privilege = "SELECT"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_stream_grant grant_select_on_future_dev_example_db_dev_example_db__common_streams {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name

  privilege = "SELECT"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_common_schema]
}

module "DEV_EXAMPLE_DB__COMMON_grant_OWNERSHIP_on_current_streams" {
  source = "./modules/snowflake-grant-all-current-streams"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_stream_grant grant_ownership_on_future_dev_example_db_dev_example_db__common_streams {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_common_schema]
}

module "DEV_EXAMPLE_DB__RAW_grant_SELECT_on_current_streams" {
  source = "./modules/snowflake-grant-all-current-streams"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name
  privilege = "SELECT"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_stream_grant grant_select_on_future_dev_example_db_dev_example_db__raw_streams {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name

  privilege = "SELECT"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_raw_schema]
}

module "DEV_EXAMPLE_DB__RAW_grant_OWNERSHIP_on_current_streams" {
  source = "./modules/snowflake-grant-all-current-streams"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_stream_grant grant_ownership_on_future_dev_example_db_dev_example_db__raw_streams {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_raw_schema]
}

module "DEV_EXAMPLE_DB__COMMON_grant_USAGE_on_current_procedures" {
  source = "./modules/snowflake-grant-all-current-procedures"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name
  privilege = "USAGE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_procedure_grant grant_usage_on_future_dev_example_db_dev_example_db__common_procedures {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name

  privilege = "USAGE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_common_schema]
}

module "DEV_EXAMPLE_DB__COMMON_grant_OWNERSHIP_on_current_procedures" {
  source = "./modules/snowflake-grant-all-current-procedures"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_procedure_grant grant_ownership_on_future_dev_example_db_dev_example_db__common_procedures {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_common_schema]
}

module "DEV_EXAMPLE_DB__RAW_grant_USAGE_on_current_procedures" {
  source = "./modules/snowflake-grant-all-current-procedures"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name
  privilege = "USAGE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_procedure_grant grant_usage_on_future_dev_example_db_dev_example_db__raw_procedures {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name

  privilege = "USAGE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_raw_schema]
}

module "DEV_EXAMPLE_DB__RAW_grant_OWNERSHIP_on_current_procedures" {
  source = "./modules/snowflake-grant-all-current-procedures"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_procedure_grant grant_ownership_on_future_dev_example_db_dev_example_db__raw_procedures {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_raw_schema]
}

module "DEV_EXAMPLE_DB__COMMON_grant_USAGE_on_current_functions" {
  source = "./modules/snowflake-grant-all-current-functions"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name
  privilege = "USAGE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_function_grant grant_usage_on_future_dev_example_db_dev_example_db__common_functions {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name

  privilege = "USAGE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_common_schema]
}

module "DEV_EXAMPLE_DB__COMMON_grant_OWNERSHIP_on_current_functions" {
  source = "./modules/snowflake-grant-all-current-functions"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_function_grant grant_ownership_on_future_dev_example_db_dev_example_db__common_functions {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_common_schema]
}

module "DEV_EXAMPLE_DB__RAW_grant_USAGE_on_current_functions" {
  source = "./modules/snowflake-grant-all-current-functions"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name
  privilege = "USAGE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_function_grant grant_usage_on_future_dev_example_db_dev_example_db__raw_functions {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name

  privilege = "USAGE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_raw_schema]
}

module "DEV_EXAMPLE_DB__RAW_grant_OWNERSHIP_on_current_functions" {
  source = "./modules/snowflake-grant-all-current-functions"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_function_grant grant_ownership_on_future_dev_example_db_dev_example_db__raw_functions {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_raw_schema]
}

module "DEV_EXAMPLE_DB__COMMON_grant_MONITOR_on_current_tasks" {
  source = "./modules/snowflake-grant-all-current-tasks"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name
  privilege = "MONITOR"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

module "DEV_EXAMPLE_DB__COMMON_grant_OPERATE_on_current_tasks" {
  source = "./modules/snowflake-grant-all-current-tasks"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name
  privilege = "OPERATE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_task_grant grant_monitor_on_future_dev_example_db_dev_example_db__common_tasks {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name

  privilege = "MONITOR"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_common_schema]
}

resource snowflake_task_grant grant_operate_on_future_dev_example_db_dev_example_db__common_tasks {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__COMMON.name

  privilege = "OPERATE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_common_schema]
}

module "DEV_EXAMPLE_DB__RAW_grant_MONITOR_on_current_tasks" {
  source = "./modules/snowflake-grant-all-current-tasks"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name
  privilege = "MONITOR"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

module "DEV_EXAMPLE_DB__RAW_grant_OPERATE_on_current_tasks" {
  source = "./modules/snowflake-grant-all-current-tasks"
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name
  privilege = "OPERATE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_task_grant grant_monitor_on_future_dev_example_db_dev_example_db__raw_tasks {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name

  privilege = "MONITOR"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_raw_schema]
}

resource snowflake_task_grant grant_operate_on_future_dev_example_db_dev_example_db__raw_tasks {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  schema_name = snowflake_schema.DEV_EXAMPLE_DB__RAW.name

  privilege = "OPERATE"
  roles = [snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_dev_example_db_raw_schema]
}

resource snowflake_warehouse_grant grant_usage_on_warehouse_dev_bi_wh {
  warehouse_name = snowflake_warehouse.DEV_BI_WH.name
  privilege = "USAGE"

  roles = [snowflake_role.DEV_BI_WH_U_AR.name, snowflake_role.DEV_BI_WH_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_monitor_on_warehouse_dev_bi_wh {
  warehouse_name = snowflake_warehouse.DEV_BI_WH.name
  privilege = "MONITOR"

  roles = [snowflake_role.DEV_BI_WH_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_ownership_on_warehouse_dev_bi_wh {
  warehouse_name = snowflake_warehouse.DEV_BI_WH.name
  privilege = "OWNERSHIP"

  roles = [snowflake_role.DEV_BI_WH_FULL_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_usage_on_warehouse_dev_dsci_wh {
  warehouse_name = snowflake_warehouse.DEV_DSCI_WH.name
  privilege = "USAGE"

  roles = [snowflake_role.DEV_DSCI_WH_U_AR.name, snowflake_role.DEV_DSCI_WH_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_monitor_on_warehouse_dev_dsci_wh {
  warehouse_name = snowflake_warehouse.DEV_DSCI_WH.name
  privilege = "MONITOR"

  roles = [snowflake_role.DEV_DSCI_WH_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_ownership_on_warehouse_dev_dsci_wh {
  warehouse_name = snowflake_warehouse.DEV_DSCI_WH.name
  privilege = "OWNERSHIP"

  roles = [snowflake_role.DEV_DSCI_WH_FULL_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_usage_on_warehouse_dev_elt_wh {
  warehouse_name = snowflake_warehouse.DEV_ELT_WH.name
  privilege = "USAGE"

  roles = [snowflake_role.DEV_ELT_WH_U_AR.name, snowflake_role.DEV_ELT_WH_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_monitor_on_warehouse_dev_elt_wh {
  warehouse_name = snowflake_warehouse.DEV_ELT_WH.name
  privilege = "MONITOR"

  roles = [snowflake_role.DEV_ELT_WH_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_ownership_on_warehouse_dev_elt_wh {
  warehouse_name = snowflake_warehouse.DEV_ELT_WH.name
  privilege = "OWNERSHIP"

  roles = [snowflake_role.DEV_ELT_WH_FULL_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_usage_on_warehouse_dev_devops_wh {
  warehouse_name = snowflake_warehouse.DEV_DEVOPS_WH.name
  privilege = "USAGE"

  roles = [snowflake_role.DEV_DEVOPS_WH_U_AR.name, snowflake_role.DEV_DEVOPS_WH_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_monitor_on_warehouse_dev_devops_wh {
  warehouse_name = snowflake_warehouse.DEV_DEVOPS_WH.name
  privilege = "MONITOR"

  roles = [snowflake_role.DEV_DEVOPS_WH_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_ownership_on_warehouse_dev_devops_wh {
  warehouse_name = snowflake_warehouse.DEV_DEVOPS_WH.name
  privilege = "OWNERSHIP"

  roles = [snowflake_role.DEV_DEVOPS_WH_FULL_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_role_grants role_dev_example_db_common_r_ar_grants {
  role_name = snowflake_role.DEV_EXAMPLE_DB_COMMON_R_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.DEV_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_dev_example_db_common_rw_ar_grants {
  role_name = snowflake_role.DEV_EXAMPLE_DB_COMMON_RW_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.DEV_DATA_ANALYST_ROLE.name,
    snowflake_role.DEV_DATA_SCIENTIST_ROLE.name,
    snowflake_role.DEV_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_dev_example_db_common_full_ar_grants {
  role_name = snowflake_role.DEV_EXAMPLE_DB_COMMON_FULL_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.DEV_ELT_TOOL_ROLE.name,
    snowflake_role.DEV_DEVOPS_ROLE.name,
    snowflake_role.DEV_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_dev_example_db_raw_r_ar_grants {
  role_name = snowflake_role.DEV_EXAMPLE_DB_RAW_R_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.DEV_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_dev_example_db_raw_rw_ar_grants {
  role_name = snowflake_role.DEV_EXAMPLE_DB_RAW_RW_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.DEV_DATA_ANALYST_ROLE.name,
    snowflake_role.DEV_DATA_SCIENTIST_ROLE.name,
    snowflake_role.DEV_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_dev_example_db_raw_full_ar_grants {
  role_name = snowflake_role.DEV_EXAMPLE_DB_RAW_FULL_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.DEV_ELT_TOOL_ROLE.name,
    snowflake_role.DEV_DEVOPS_ROLE.name,
    snowflake_role.DEV_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_dev_sog_some_objects_r_ar_grants {
  role_name = snowflake_role.DEV_SOG_SOME_OBJECTS_R_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.DEV_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_dev_sog_some_objects_rw_ar_grants {
  role_name = snowflake_role.DEV_SOG_SOME_OBJECTS_RW_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.DEV_DATA_ANALYST_ROLE.name,
    snowflake_role.DEV_ELT_TOOL_ROLE.name,
    snowflake_role.DEV_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_dev_bi_wh_u_ar_grants {
  role_name = snowflake_role.DEV_BI_WH_U_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.DEV_DATA_ANALYST_ROLE.name,
    snowflake_role.DEV_ELT_TOOL_ROLE.name,
    snowflake_role.DEV_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_dev_bi_wh_um_ar_grants {
  role_name = snowflake_role.DEV_BI_WH_UM_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.DEV_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_dev_bi_wh_full_ar_grants {
  role_name = snowflake_role.DEV_BI_WH_FULL_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.DEV_DEVOPS_ROLE.name,
    snowflake_role.DEV_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_dev_dsci_wh_u_ar_grants {
  role_name = snowflake_role.DEV_DSCI_WH_U_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.DEV_DATA_SCIENTIST_ROLE.name,
    snowflake_role.DEV_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_dev_dsci_wh_um_ar_grants {
  role_name = snowflake_role.DEV_DSCI_WH_UM_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.DEV_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_dev_dsci_wh_full_ar_grants {
  role_name = snowflake_role.DEV_DSCI_WH_FULL_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.DEV_DEVOPS_ROLE.name,
    snowflake_role.DEV_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_dev_elt_wh_u_ar_grants {
  role_name = snowflake_role.DEV_ELT_WH_U_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.DEV_ELT_TOOL_ROLE.name,
    snowflake_role.DEV_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_dev_elt_wh_um_ar_grants {
  role_name = snowflake_role.DEV_ELT_WH_UM_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.DEV_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_dev_elt_wh_full_ar_grants {
  role_name = snowflake_role.DEV_ELT_WH_FULL_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.DEV_DEVOPS_ROLE.name,
    snowflake_role.DEV_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_dev_devops_wh_u_ar_grants {
  role_name = snowflake_role.DEV_DEVOPS_WH_U_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.DEV_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_dev_devops_wh_um_ar_grants {
  role_name = snowflake_role.DEV_DEVOPS_WH_UM_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.DEV_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_dev_devops_wh_full_ar_grants {
  role_name = snowflake_role.DEV_DEVOPS_WH_FULL_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.DEV_DEVOPS_ROLE.name,
    snowflake_role.DEV_SYSADMIN.name,
  ]
}

resource snowflake_role DEV_SYSADMIN {
  name = "DEV_SYSADMIN"
}

resource snowflake_role_grants role_dev_sysadmin_grants {
  role_name = snowflake_role.DEV_SYSADMIN.name

  enable_multiple_grants = true
  roles = [
    "SYSADMIN",
  ]
}

resource snowflake_database_grant grant_ownership_on_dev_example_db_database {
  database_name = snowflake_database.DEV_EXAMPLE_DB.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_SYSADMIN.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_role_grants.role_dev_sysadmin_grants]
}

resource snowflake_database_grant grant_ownership_on_dev_sandbox_db_database {
  database_name = snowflake_database.DEV_SANDBOX_DB.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.DEV_SYSADMIN.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_role_grants.role_dev_sysadmin_grants]
}

resource snowflake_role TEST_EXAMPLE_DB_COMMON_R_AR {
  name = "TEST_EXAMPLE_DB_COMMON_R_AR"
}

resource snowflake_role TEST_EXAMPLE_DB_COMMON_RW_AR {
  name = "TEST_EXAMPLE_DB_COMMON_RW_AR"
}

resource snowflake_role TEST_EXAMPLE_DB_COMMON_FULL_AR {
  name = "TEST_EXAMPLE_DB_COMMON_FULL_AR"
}

resource snowflake_role TEST_EXAMPLE_DB_RAW_R_AR {
  name = "TEST_EXAMPLE_DB_RAW_R_AR"
}

resource snowflake_role TEST_EXAMPLE_DB_RAW_RW_AR {
  name = "TEST_EXAMPLE_DB_RAW_RW_AR"
}

resource snowflake_role TEST_EXAMPLE_DB_RAW_FULL_AR {
  name = "TEST_EXAMPLE_DB_RAW_FULL_AR"
}

resource snowflake_role TEST_SOG_SOME_OBJECTS_R_AR {
  name = "TEST_SOG_SOME_OBJECTS_R_AR"
}

resource snowflake_role TEST_SOG_SOME_OBJECTS_RW_AR {
  name = "TEST_SOG_SOME_OBJECTS_RW_AR"
}

resource snowflake_role TEST_BI_WH_U_AR {
  name = "TEST_BI_WH_U_AR"
}

resource snowflake_role TEST_BI_WH_UM_AR {
  name = "TEST_BI_WH_UM_AR"
}

resource snowflake_role TEST_BI_WH_FULL_AR {
  name = "TEST_BI_WH_FULL_AR"
}

resource snowflake_role TEST_DSCI_WH_U_AR {
  name = "TEST_DSCI_WH_U_AR"
}

resource snowflake_role TEST_DSCI_WH_UM_AR {
  name = "TEST_DSCI_WH_UM_AR"
}

resource snowflake_role TEST_DSCI_WH_FULL_AR {
  name = "TEST_DSCI_WH_FULL_AR"
}

resource snowflake_role TEST_ELT_WH_U_AR {
  name = "TEST_ELT_WH_U_AR"
}

resource snowflake_role TEST_ELT_WH_UM_AR {
  name = "TEST_ELT_WH_UM_AR"
}

resource snowflake_role TEST_ELT_WH_FULL_AR {
  name = "TEST_ELT_WH_FULL_AR"
}

resource snowflake_role TEST_DEVOPS_WH_U_AR {
  name = "TEST_DEVOPS_WH_U_AR"
}

resource snowflake_role TEST_DEVOPS_WH_UM_AR {
  name = "TEST_DEVOPS_WH_UM_AR"
}

resource snowflake_role TEST_DEVOPS_WH_FULL_AR {
  name = "TEST_DEVOPS_WH_FULL_AR"
}

resource snowflake_database_grant grant_usage_on_test_example_db_database {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  privilege = "USAGE"
  roles = ["TEST_EXAMPLE_DB_COMMON_R_AR", "TEST_EXAMPLE_DB_COMMON_RW_AR", "TEST_EXAMPLE_DB_COMMON_FULL_AR", "TEST_EXAMPLE_DB_COMMON_FULL_AR", "TEST_EXAMPLE_DB_RAW_R_AR", "TEST_EXAMPLE_DB_RAW_RW_AR", "TEST_EXAMPLE_DB_RAW_FULL_AR", "TEST_EXAMPLE_DB_RAW_FULL_AR", "TEST_SOG_SOME_OBJECTS_R_AR", "TEST_SOG_SOME_OBJECTS_RW_AR"]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_schema_grant grant_usage_on_test_example_db_common_schema {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name

  privilege = "USAGE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name, snowflake_role.TEST_SOG_SOME_OBJECTS_R_AR.name, snowflake_role.TEST_SOG_SOME_OBJECTS_RW_AR.name]

  depends_on = [snowflake_role_grants.role_test_example_db_common_r_ar_grants,snowflake_role_grants.role_test_example_db_common_rw_ar_grants,snowflake_role_grants.role_test_example_db_common_full_ar_grants,snowflake_role_grants.role_test_example_db_common_full_ar_grants,snowflake_role_grants.role_test_sog_some_objects_r_ar_grants,snowflake_role_grants.role_test_sog_some_objects_rw_ar_grants]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_schema_grant grant_ownership_on_test_example_db_common_schema {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]

  depends_on = [snowflake_role_grants.role_test_example_db_common_full_ar_grants]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_schema_grant grant_usage_on_test_example_db_raw_schema {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name

  privilege = "USAGE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name, snowflake_role.TEST_SOG_SOME_OBJECTS_R_AR.name, snowflake_role.TEST_SOG_SOME_OBJECTS_RW_AR.name]

  depends_on = [snowflake_role_grants.role_test_example_db_raw_r_ar_grants,snowflake_role_grants.role_test_example_db_raw_rw_ar_grants,snowflake_role_grants.role_test_example_db_raw_full_ar_grants,snowflake_role_grants.role_test_example_db_raw_full_ar_grants,snowflake_role_grants.role_test_sog_some_objects_r_ar_grants,snowflake_role_grants.role_test_sog_some_objects_rw_ar_grants]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_schema_grant grant_ownership_on_test_example_db_raw_schema {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]

  depends_on = [snowflake_role_grants.role_test_example_db_raw_full_ar_grants]

  with_grant_option = false
  enable_multiple_grants = true
}

module "TEST_EXAMPLE_DB__COMMON_grant_SELECT_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name
  privilege = "SELECT"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_table_grant grant_select_on_future_test_example_db_test_example_db__common_tables {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name

  privilege = "SELECT"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_common_schema]
}

module "TEST_EXAMPLE_DB__COMMON_grant_INSERT_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name
  privilege = "INSERT"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

module "TEST_EXAMPLE_DB__COMMON_grant_UPDATE_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name
  privilege = "UPDATE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

module "TEST_EXAMPLE_DB__COMMON_grant_DELETE_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name
  privilege = "DELETE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

module "TEST_EXAMPLE_DB__COMMON_grant_REFERENCES_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name
  privilege = "REFERENCES"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_table_grant grant_insert_on_future_test_example_db_test_example_db__common_tables {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name

  privilege = "INSERT"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_common_schema]
}

resource snowflake_table_grant grant_update_on_future_test_example_db_test_example_db__common_tables {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name

  privilege = "UPDATE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_common_schema]
}

resource snowflake_table_grant grant_delete_on_future_test_example_db_test_example_db__common_tables {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name

  privilege = "DELETE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_common_schema]
}

resource snowflake_table_grant grant_references_on_future_test_example_db_test_example_db__common_tables {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name

  privilege = "REFERENCES"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_common_schema]
}

module "TEST_EXAMPLE_DB__COMMON_grant_OWNERSHIP_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_table_grant grant_ownership_on_future_test_example_db_test_example_db__common_tables {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_common_schema]
}

module "TEST_EXAMPLE_DB__RAW_grant_SELECT_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name
  privilege = "SELECT"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_table_grant grant_select_on_future_test_example_db_test_example_db__raw_tables {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name

  privilege = "SELECT"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_raw_schema]
}

module "TEST_EXAMPLE_DB__RAW_grant_INSERT_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name
  privilege = "INSERT"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

module "TEST_EXAMPLE_DB__RAW_grant_UPDATE_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name
  privilege = "UPDATE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

module "TEST_EXAMPLE_DB__RAW_grant_DELETE_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name
  privilege = "DELETE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

module "TEST_EXAMPLE_DB__RAW_grant_REFERENCES_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name
  privilege = "REFERENCES"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_table_grant grant_insert_on_future_test_example_db_test_example_db__raw_tables {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name

  privilege = "INSERT"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_raw_schema]
}

resource snowflake_table_grant grant_update_on_future_test_example_db_test_example_db__raw_tables {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name

  privilege = "UPDATE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_raw_schema]
}

resource snowflake_table_grant grant_delete_on_future_test_example_db_test_example_db__raw_tables {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name

  privilege = "DELETE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_raw_schema]
}

resource snowflake_table_grant grant_references_on_future_test_example_db_test_example_db__raw_tables {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name

  privilege = "REFERENCES"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_raw_schema]
}

module "TEST_EXAMPLE_DB__RAW_grant_OWNERSHIP_on_current_tables" {
  source = "./modules/snowflake-grant-all-current-tables"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_table_grant grant_ownership_on_future_test_example_db_test_example_db__raw_tables {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_raw_schema]
}

resource snowflake_table_grant grant_select_on_test_example_db_test_example_db__raw_tables_MY_TABLE {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name
  table_name = "MY_TABLE"
  privilege = "SELECT"
  roles = [snowflake_role.TEST_SOG_SOME_OBJECTS_R_AR.name, snowflake_role.TEST_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

resource snowflake_table_grant grant_select_on_test_example_db_test_example_db__common_tables_SEED_DATA {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name
  table_name = "SEED_DATA"
  privilege = "SELECT"
  roles = [snowflake_role.TEST_SOG_SOME_OBJECTS_R_AR.name, snowflake_role.TEST_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

resource snowflake_table_grant grant_insert_on_test_example_db_test_example_db__raw_tables_MY_TABLE {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name
  table_name = "MY_TABLE"
  privilege = "INSERT"
  roles = [snowflake_role.TEST_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

resource snowflake_table_grant grant_update_on_test_example_db_test_example_db__raw_tables_MY_TABLE {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name
  table_name = "MY_TABLE"
  privilege = "UPDATE"
  roles = [snowflake_role.TEST_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

resource snowflake_table_grant grant_delete_on_test_example_db_test_example_db__raw_tables_MY_TABLE {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name
  table_name = "MY_TABLE"
  privilege = "DELETE"
  roles = [snowflake_role.TEST_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

resource snowflake_table_grant grant_insert_on_test_example_db_test_example_db__common_tables_SEED_DATA {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name
  table_name = "SEED_DATA"
  privilege = "INSERT"
  roles = [snowflake_role.TEST_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

resource snowflake_table_grant grant_update_on_test_example_db_test_example_db__common_tables_SEED_DATA {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name
  table_name = "SEED_DATA"
  privilege = "UPDATE"
  roles = [snowflake_role.TEST_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

resource snowflake_table_grant grant_delete_on_test_example_db_test_example_db__common_tables_SEED_DATA {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name
  table_name = "SEED_DATA"
  privilege = "DELETE"
  roles = [snowflake_role.TEST_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

module "TEST_EXAMPLE_DB__COMMON_grant_SELECT_on_current_views" {
  source = "./modules/snowflake-grant-all-current-views"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name
  privilege = "SELECT"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_view_grant grant_select_on_future_test_example_db_test_example_db__common_views {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name

  privilege = "SELECT"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_common_schema]
}

module "TEST_EXAMPLE_DB__COMMON_grant_OWNERSHIP_on_current_views" {
  source = "./modules/snowflake-grant-all-current-views"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_view_grant grant_ownership_on_future_test_example_db_test_example_db__common_views {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_common_schema]
}

module "TEST_EXAMPLE_DB__RAW_grant_SELECT_on_current_views" {
  source = "./modules/snowflake-grant-all-current-views"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name
  privilege = "SELECT"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_view_grant grant_select_on_future_test_example_db_test_example_db__raw_views {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name

  privilege = "SELECT"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_raw_schema]
}

module "TEST_EXAMPLE_DB__RAW_grant_OWNERSHIP_on_current_views" {
  source = "./modules/snowflake-grant-all-current-views"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_view_grant grant_ownership_on_future_test_example_db_test_example_db__raw_views {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_raw_schema]
}

resource snowflake_view_grant grant_select_on_test_example_db_test_example_db__raw_views_MY_VIEW {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name
  view_name = "MY_VIEW"
  privilege = "SELECT"
  roles = [snowflake_role.TEST_SOG_SOME_OBJECTS_R_AR.name, snowflake_role.TEST_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

resource snowflake_view_grant grant_select_on_test_example_db_test_example_db__common_views_ANOTHER_VIEW {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name
  view_name = "ANOTHER_VIEW"
  privilege = "SELECT"
  roles = [snowflake_role.TEST_SOG_SOME_OBJECTS_R_AR.name, snowflake_role.TEST_SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = []
}

module "TEST_EXAMPLE_DB__COMMON_grant_USAGE_on_current_sequences" {
  source = "./modules/snowflake-grant-all-current-sequences"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name
  privilege = "USAGE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_sequence_grant grant_usage_on_future_test_example_db_test_example_db__common_sequences {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name

  privilege = "USAGE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_common_schema]
}

module "TEST_EXAMPLE_DB__COMMON_grant_OWNERSHIP_on_current_sequences" {
  source = "./modules/snowflake-grant-all-current-sequences"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_sequence_grant grant_ownership_on_future_test_example_db_test_example_db__common_sequences {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_common_schema]
}

module "TEST_EXAMPLE_DB__RAW_grant_USAGE_on_current_sequences" {
  source = "./modules/snowflake-grant-all-current-sequences"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name
  privilege = "USAGE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_sequence_grant grant_usage_on_future_test_example_db_test_example_db__raw_sequences {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name

  privilege = "USAGE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_raw_schema]
}

module "TEST_EXAMPLE_DB__RAW_grant_OWNERSHIP_on_current_sequences" {
  source = "./modules/snowflake-grant-all-current-sequences"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_sequence_grant grant_ownership_on_future_test_example_db_test_example_db__raw_sequences {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_raw_schema]
}

module "TEST_EXAMPLE_DB__COMMON_grant_USAGE_on_current_stages" {
  source = "./modules/snowflake-grant-all-current-stages"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name
  privilege = "USAGE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

module "TEST_EXAMPLE_DB__COMMON_grant_READ_on_current_stages" {
  source = "./modules/snowflake-grant-all-current-stages"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name
  privilege = "READ"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_stage_grant grant_usage_on_future_test_example_db_test_example_db__common_stages {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name

  privilege = "USAGE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_common_schema]
}

resource snowflake_stage_grant grant_read_on_future_test_example_db_test_example_db__common_stages {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name

  privilege = "READ"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_common_schema]
}

resource snowflake_stage_grant grant_write_on_future_test_example_db_test_example_db__common_stages {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name

  privilege = "WRITE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_stage_grant.grant_usage_on_future_test_example_db_test_example_db__common_stages, snowflake_stage_grant.grant_read_on_future_test_example_db_test_example_db__common_stages]
}

module "TEST_EXAMPLE_DB__COMMON_grant_WRITE_on_current_stages" {
  source = "./modules/snowflake-grant-all-current-stages"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name
  privilege = "WRITE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

module "TEST_EXAMPLE_DB__COMMON_grant_OWNERSHIP_on_current_stages" {
  source = "./modules/snowflake-grant-all-current-stages"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_stage_grant grant_ownership_on_future_test_example_db_test_example_db__common_stages {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_common_schema]
}

module "TEST_EXAMPLE_DB__RAW_grant_USAGE_on_current_stages" {
  source = "./modules/snowflake-grant-all-current-stages"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name
  privilege = "USAGE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

module "TEST_EXAMPLE_DB__RAW_grant_READ_on_current_stages" {
  source = "./modules/snowflake-grant-all-current-stages"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name
  privilege = "READ"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_stage_grant grant_usage_on_future_test_example_db_test_example_db__raw_stages {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name

  privilege = "USAGE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_raw_schema]
}

resource snowflake_stage_grant grant_read_on_future_test_example_db_test_example_db__raw_stages {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name

  privilege = "READ"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_raw_schema]
}

resource snowflake_stage_grant grant_write_on_future_test_example_db_test_example_db__raw_stages {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name

  privilege = "WRITE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_stage_grant.grant_usage_on_future_test_example_db_test_example_db__raw_stages, snowflake_stage_grant.grant_read_on_future_test_example_db_test_example_db__raw_stages]
}

module "TEST_EXAMPLE_DB__RAW_grant_WRITE_on_current_stages" {
  source = "./modules/snowflake-grant-all-current-stages"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name
  privilege = "WRITE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

module "TEST_EXAMPLE_DB__RAW_grant_OWNERSHIP_on_current_stages" {
  source = "./modules/snowflake-grant-all-current-stages"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_stage_grant grant_ownership_on_future_test_example_db_test_example_db__raw_stages {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_raw_schema]
}

module "TEST_EXAMPLE_DB__COMMON_grant_USAGE_on_current_file-formats" {
  source = "./modules/snowflake-grant-all-current-file-formats"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name
  privilege = "USAGE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_file_format_grant grant_usage_on_future_test_example_db_test_example_db__common_file_formats {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name

  privilege = "USAGE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_common_schema]
}

module "TEST_EXAMPLE_DB__COMMON_grant_OWNERSHIP_on_current_file-formats" {
  source = "./modules/snowflake-grant-all-current-file-formats"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_file_format_grant grant_ownership_on_future_test_example_db_test_example_db__common_file_formats {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_common_schema]
}

module "TEST_EXAMPLE_DB__RAW_grant_USAGE_on_current_file-formats" {
  source = "./modules/snowflake-grant-all-current-file-formats"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name
  privilege = "USAGE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_file_format_grant grant_usage_on_future_test_example_db_test_example_db__raw_file_formats {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name

  privilege = "USAGE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_raw_schema]
}

module "TEST_EXAMPLE_DB__RAW_grant_OWNERSHIP_on_current_file-formats" {
  source = "./modules/snowflake-grant-all-current-file-formats"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_file_format_grant grant_ownership_on_future_test_example_db_test_example_db__raw_file_formats {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_raw_schema]
}

module "TEST_EXAMPLE_DB__COMMON_grant_SELECT_on_current_streams" {
  source = "./modules/snowflake-grant-all-current-streams"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name
  privilege = "SELECT"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_stream_grant grant_select_on_future_test_example_db_test_example_db__common_streams {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name

  privilege = "SELECT"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_common_schema]
}

module "TEST_EXAMPLE_DB__COMMON_grant_OWNERSHIP_on_current_streams" {
  source = "./modules/snowflake-grant-all-current-streams"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_stream_grant grant_ownership_on_future_test_example_db_test_example_db__common_streams {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_common_schema]
}

module "TEST_EXAMPLE_DB__RAW_grant_SELECT_on_current_streams" {
  source = "./modules/snowflake-grant-all-current-streams"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name
  privilege = "SELECT"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_stream_grant grant_select_on_future_test_example_db_test_example_db__raw_streams {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name

  privilege = "SELECT"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_raw_schema]
}

module "TEST_EXAMPLE_DB__RAW_grant_OWNERSHIP_on_current_streams" {
  source = "./modules/snowflake-grant-all-current-streams"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_stream_grant grant_ownership_on_future_test_example_db_test_example_db__raw_streams {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_raw_schema]
}

module "TEST_EXAMPLE_DB__COMMON_grant_USAGE_on_current_procedures" {
  source = "./modules/snowflake-grant-all-current-procedures"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name
  privilege = "USAGE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_procedure_grant grant_usage_on_future_test_example_db_test_example_db__common_procedures {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name

  privilege = "USAGE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_common_schema]
}

module "TEST_EXAMPLE_DB__COMMON_grant_OWNERSHIP_on_current_procedures" {
  source = "./modules/snowflake-grant-all-current-procedures"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_procedure_grant grant_ownership_on_future_test_example_db_test_example_db__common_procedures {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_common_schema]
}

module "TEST_EXAMPLE_DB__RAW_grant_USAGE_on_current_procedures" {
  source = "./modules/snowflake-grant-all-current-procedures"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name
  privilege = "USAGE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_procedure_grant grant_usage_on_future_test_example_db_test_example_db__raw_procedures {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name

  privilege = "USAGE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_raw_schema]
}

module "TEST_EXAMPLE_DB__RAW_grant_OWNERSHIP_on_current_procedures" {
  source = "./modules/snowflake-grant-all-current-procedures"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_procedure_grant grant_ownership_on_future_test_example_db_test_example_db__raw_procedures {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_raw_schema]
}

module "TEST_EXAMPLE_DB__COMMON_grant_USAGE_on_current_functions" {
  source = "./modules/snowflake-grant-all-current-functions"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name
  privilege = "USAGE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_function_grant grant_usage_on_future_test_example_db_test_example_db__common_functions {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name

  privilege = "USAGE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_common_schema]
}

module "TEST_EXAMPLE_DB__COMMON_grant_OWNERSHIP_on_current_functions" {
  source = "./modules/snowflake-grant-all-current-functions"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_function_grant grant_ownership_on_future_test_example_db_test_example_db__common_functions {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_common_schema]
}

module "TEST_EXAMPLE_DB__RAW_grant_USAGE_on_current_functions" {
  source = "./modules/snowflake-grant-all-current-functions"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name
  privilege = "USAGE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_function_grant grant_usage_on_future_test_example_db_test_example_db__raw_functions {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name

  privilege = "USAGE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_R_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_raw_schema]
}

module "TEST_EXAMPLE_DB__RAW_grant_OWNERSHIP_on_current_functions" {
  source = "./modules/snowflake-grant-all-current-functions"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_function_grant grant_ownership_on_future_test_example_db_test_example_db__raw_functions {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_raw_schema]
}

module "TEST_EXAMPLE_DB__COMMON_grant_MONITOR_on_current_tasks" {
  source = "./modules/snowflake-grant-all-current-tasks"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name
  privilege = "MONITOR"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

module "TEST_EXAMPLE_DB__COMMON_grant_OPERATE_on_current_tasks" {
  source = "./modules/snowflake-grant-all-current-tasks"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name
  privilege = "OPERATE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_task_grant grant_monitor_on_future_test_example_db_test_example_db__common_tasks {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name

  privilege = "MONITOR"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_common_schema]
}

resource snowflake_task_grant grant_operate_on_future_test_example_db_test_example_db__common_tasks {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__COMMON.name

  privilege = "OPERATE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_common_schema]
}

module "TEST_EXAMPLE_DB__RAW_grant_MONITOR_on_current_tasks" {
  source = "./modules/snowflake-grant-all-current-tasks"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name
  privilege = "MONITOR"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

module "TEST_EXAMPLE_DB__RAW_grant_OPERATE_on_current_tasks" {
  source = "./modules/snowflake-grant-all-current-tasks"
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name
  privilege = "OPERATE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
}

resource snowflake_task_grant grant_monitor_on_future_test_example_db_test_example_db__raw_tasks {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name

  privilege = "MONITOR"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_raw_schema]
}

resource snowflake_task_grant grant_operate_on_future_test_example_db_test_example_db__raw_tasks {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  schema_name = snowflake_schema.TEST_EXAMPLE_DB__RAW.name

  privilege = "OPERATE"
  roles = [snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name, snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_test_example_db_raw_schema]
}

resource snowflake_warehouse_grant grant_usage_on_warehouse_test_bi_wh {
  warehouse_name = snowflake_warehouse.TEST_BI_WH.name
  privilege = "USAGE"

  roles = [snowflake_role.TEST_BI_WH_U_AR.name, snowflake_role.TEST_BI_WH_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_monitor_on_warehouse_test_bi_wh {
  warehouse_name = snowflake_warehouse.TEST_BI_WH.name
  privilege = "MONITOR"

  roles = [snowflake_role.TEST_BI_WH_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_ownership_on_warehouse_test_bi_wh {
  warehouse_name = snowflake_warehouse.TEST_BI_WH.name
  privilege = "OWNERSHIP"

  roles = [snowflake_role.TEST_BI_WH_FULL_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_usage_on_warehouse_test_dsci_wh {
  warehouse_name = snowflake_warehouse.TEST_DSCI_WH.name
  privilege = "USAGE"

  roles = [snowflake_role.TEST_DSCI_WH_U_AR.name, snowflake_role.TEST_DSCI_WH_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_monitor_on_warehouse_test_dsci_wh {
  warehouse_name = snowflake_warehouse.TEST_DSCI_WH.name
  privilege = "MONITOR"

  roles = [snowflake_role.TEST_DSCI_WH_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_ownership_on_warehouse_test_dsci_wh {
  warehouse_name = snowflake_warehouse.TEST_DSCI_WH.name
  privilege = "OWNERSHIP"

  roles = [snowflake_role.TEST_DSCI_WH_FULL_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_usage_on_warehouse_test_elt_wh {
  warehouse_name = snowflake_warehouse.TEST_ELT_WH.name
  privilege = "USAGE"

  roles = [snowflake_role.TEST_ELT_WH_U_AR.name, snowflake_role.TEST_ELT_WH_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_monitor_on_warehouse_test_elt_wh {
  warehouse_name = snowflake_warehouse.TEST_ELT_WH.name
  privilege = "MONITOR"

  roles = [snowflake_role.TEST_ELT_WH_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_ownership_on_warehouse_test_elt_wh {
  warehouse_name = snowflake_warehouse.TEST_ELT_WH.name
  privilege = "OWNERSHIP"

  roles = [snowflake_role.TEST_ELT_WH_FULL_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_usage_on_warehouse_test_devops_wh {
  warehouse_name = snowflake_warehouse.TEST_DEVOPS_WH.name
  privilege = "USAGE"

  roles = [snowflake_role.TEST_DEVOPS_WH_U_AR.name, snowflake_role.TEST_DEVOPS_WH_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_monitor_on_warehouse_test_devops_wh {
  warehouse_name = snowflake_warehouse.TEST_DEVOPS_WH.name
  privilege = "MONITOR"

  roles = [snowflake_role.TEST_DEVOPS_WH_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_warehouse_grant grant_ownership_on_warehouse_test_devops_wh {
  warehouse_name = snowflake_warehouse.TEST_DEVOPS_WH.name
  privilege = "OWNERSHIP"

  roles = [snowflake_role.TEST_DEVOPS_WH_FULL_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_role_grants role_test_example_db_common_r_ar_grants {
  role_name = snowflake_role.TEST_EXAMPLE_DB_COMMON_R_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.TEST_DATA_ANALYST_ROLE.name,
    snowflake_role.TEST_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_test_example_db_common_rw_ar_grants {
  role_name = snowflake_role.TEST_EXAMPLE_DB_COMMON_RW_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.TEST_DATA_SCIENTIST_ROLE.name,
    snowflake_role.TEST_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_test_example_db_common_full_ar_grants {
  role_name = snowflake_role.TEST_EXAMPLE_DB_COMMON_FULL_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.TEST_ELT_TOOL_ROLE.name,
    snowflake_role.TEST_DEVOPS_ROLE.name,
    snowflake_role.TEST_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_test_example_db_raw_r_ar_grants {
  role_name = snowflake_role.TEST_EXAMPLE_DB_RAW_R_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.TEST_DATA_ANALYST_ROLE.name,
    snowflake_role.TEST_DATA_SCIENTIST_ROLE.name,
    snowflake_role.TEST_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_test_example_db_raw_rw_ar_grants {
  role_name = snowflake_role.TEST_EXAMPLE_DB_RAW_RW_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.TEST_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_test_example_db_raw_full_ar_grants {
  role_name = snowflake_role.TEST_EXAMPLE_DB_RAW_FULL_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.TEST_ELT_TOOL_ROLE.name,
    snowflake_role.TEST_DEVOPS_ROLE.name,
    snowflake_role.TEST_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_test_sog_some_objects_r_ar_grants {
  role_name = snowflake_role.TEST_SOG_SOME_OBJECTS_R_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.TEST_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_test_sog_some_objects_rw_ar_grants {
  role_name = snowflake_role.TEST_SOG_SOME_OBJECTS_RW_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.TEST_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_test_bi_wh_u_ar_grants {
  role_name = snowflake_role.TEST_BI_WH_U_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.TEST_DATA_ANALYST_ROLE.name,
    snowflake_role.TEST_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_test_bi_wh_um_ar_grants {
  role_name = snowflake_role.TEST_BI_WH_UM_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.TEST_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_test_bi_wh_full_ar_grants {
  role_name = snowflake_role.TEST_BI_WH_FULL_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.TEST_DEVOPS_ROLE.name,
    snowflake_role.TEST_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_test_dsci_wh_u_ar_grants {
  role_name = snowflake_role.TEST_DSCI_WH_U_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.TEST_DATA_SCIENTIST_ROLE.name,
    snowflake_role.TEST_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_test_dsci_wh_um_ar_grants {
  role_name = snowflake_role.TEST_DSCI_WH_UM_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.TEST_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_test_dsci_wh_full_ar_grants {
  role_name = snowflake_role.TEST_DSCI_WH_FULL_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.TEST_DEVOPS_ROLE.name,
    snowflake_role.TEST_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_test_elt_wh_u_ar_grants {
  role_name = snowflake_role.TEST_ELT_WH_U_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.TEST_ELT_TOOL_ROLE.name,
    snowflake_role.TEST_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_test_elt_wh_um_ar_grants {
  role_name = snowflake_role.TEST_ELT_WH_UM_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.TEST_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_test_elt_wh_full_ar_grants {
  role_name = snowflake_role.TEST_ELT_WH_FULL_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.TEST_DEVOPS_ROLE.name,
    snowflake_role.TEST_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_test_devops_wh_u_ar_grants {
  role_name = snowflake_role.TEST_DEVOPS_WH_U_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.TEST_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_test_devops_wh_um_ar_grants {
  role_name = snowflake_role.TEST_DEVOPS_WH_UM_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.TEST_SYSADMIN.name,
  ]
}

resource snowflake_role_grants role_test_devops_wh_full_ar_grants {
  role_name = snowflake_role.TEST_DEVOPS_WH_FULL_AR.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.TEST_DEVOPS_ROLE.name,
    snowflake_role.TEST_SYSADMIN.name,
  ]
}

resource snowflake_role TEST_SYSADMIN {
  name = "TEST_SYSADMIN"
}

resource snowflake_role_grants role_test_sysadmin_grants {
  role_name = snowflake_role.TEST_SYSADMIN.name

  enable_multiple_grants = true
  roles = [
    "SYSADMIN",
  ]
}

resource snowflake_database_grant grant_ownership_on_test_example_db_database {
  database_name = snowflake_database.TEST_EXAMPLE_DB.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_SYSADMIN.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_role_grants.role_test_sysadmin_grants]
}

resource snowflake_database_grant grant_ownership_on_test_sandbox_db_database {
  database_name = snowflake_database.TEST_SANDBOX_DB.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.TEST_SYSADMIN.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_role_grants.role_test_sysadmin_grants]
}
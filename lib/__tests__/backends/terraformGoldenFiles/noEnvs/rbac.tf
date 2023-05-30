resource snowflake_role PROD_DB_COMMON_R_AR {
  name = "PROD_DB_COMMON_R_AR"
}

resource snowflake_role_ownership_grant role_prod_db_common_r_ar_ownership_grant {
  on_role_name = snowflake_role.PROD_DB_COMMON_R_AR.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role PROD_DB_COMMON_RW_AR {
  name = "PROD_DB_COMMON_RW_AR"
}

resource snowflake_role_ownership_grant role_prod_db_common_rw_ar_ownership_grant {
  on_role_name = snowflake_role.PROD_DB_COMMON_RW_AR.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role PROD_DB_COMMON_FULL_AR {
  name = "PROD_DB_COMMON_FULL_AR"
}

resource snowflake_role_ownership_grant role_prod_db_common_full_ar_ownership_grant {
  on_role_name = snowflake_role.PROD_DB_COMMON_FULL_AR.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role PROD_DB_RAW_R_AR {
  name = "PROD_DB_RAW_R_AR"
}

resource snowflake_role_ownership_grant role_prod_db_raw_r_ar_ownership_grant {
  on_role_name = snowflake_role.PROD_DB_RAW_R_AR.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role PROD_DB_RAW_RW_AR {
  name = "PROD_DB_RAW_RW_AR"
}

resource snowflake_role_ownership_grant role_prod_db_raw_rw_ar_ownership_grant {
  on_role_name = snowflake_role.PROD_DB_RAW_RW_AR.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role PROD_DB_RAW_FULL_AR {
  name = "PROD_DB_RAW_FULL_AR"
}

resource snowflake_role_ownership_grant role_prod_db_raw_full_ar_ownership_grant {
  on_role_name = snowflake_role.PROD_DB_RAW_FULL_AR.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role SOG_SOME_OBJECTS_R_AR {
  name = "SOG_SOME_OBJECTS_R_AR"
}

resource snowflake_role_ownership_grant role_sog_some_objects_r_ar_ownership_grant {
  on_role_name = snowflake_role.SOG_SOME_OBJECTS_R_AR.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role SOG_SOME_OBJECTS_RW_AR {
  name = "SOG_SOME_OBJECTS_RW_AR"
}

resource snowflake_role_ownership_grant role_sog_some_objects_rw_ar_ownership_grant {
  on_role_name = snowflake_role.SOG_SOME_OBJECTS_RW_AR.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role PROD_BI_U_AR {
  name = "PROD_BI_U_AR"
}

resource snowflake_role_ownership_grant role_prod_bi_u_ar_ownership_grant {
  on_role_name = snowflake_role.PROD_BI_U_AR.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role PROD_BI_UM_AR {
  name = "PROD_BI_UM_AR"
}

resource snowflake_role_ownership_grant role_prod_bi_um_ar_ownership_grant {
  on_role_name = snowflake_role.PROD_BI_UM_AR.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role PROD_BI_FULL_AR {
  name = "PROD_BI_FULL_AR"
}

resource snowflake_role_ownership_grant role_prod_bi_full_ar_ownership_grant {
  on_role_name = snowflake_role.PROD_BI_FULL_AR.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role PROD_DSCI_U_AR {
  name = "PROD_DSCI_U_AR"
}

resource snowflake_role_ownership_grant role_prod_dsci_u_ar_ownership_grant {
  on_role_name = snowflake_role.PROD_DSCI_U_AR.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role PROD_DSCI_UM_AR {
  name = "PROD_DSCI_UM_AR"
}

resource snowflake_role_ownership_grant role_prod_dsci_um_ar_ownership_grant {
  on_role_name = snowflake_role.PROD_DSCI_UM_AR.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role PROD_DSCI_FULL_AR {
  name = "PROD_DSCI_FULL_AR"
}

resource snowflake_role_ownership_grant role_prod_dsci_full_ar_ownership_grant {
  on_role_name = snowflake_role.PROD_DSCI_FULL_AR.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role PROD_ELT_U_AR {
  name = "PROD_ELT_U_AR"
}

resource snowflake_role_ownership_grant role_prod_elt_u_ar_ownership_grant {
  on_role_name = snowflake_role.PROD_ELT_U_AR.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role PROD_ELT_UM_AR {
  name = "PROD_ELT_UM_AR"
}

resource snowflake_role_ownership_grant role_prod_elt_um_ar_ownership_grant {
  on_role_name = snowflake_role.PROD_ELT_UM_AR.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role PROD_ELT_FULL_AR {
  name = "PROD_ELT_FULL_AR"
}

resource snowflake_role_ownership_grant role_prod_elt_full_ar_ownership_grant {
  on_role_name = snowflake_role.PROD_ELT_FULL_AR.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_database_grant grant_usage_on_prod_db_database {
  database_name = snowflake_database.PROD_DB.name
  privilege = "USAGE"
  roles = ["PROD_DB_COMMON_R_AR", "PROD_DB_COMMON_RW_AR", "PROD_DB_COMMON_FULL_AR", "PROD_DB_COMMON_FULL_AR", "PROD_DB_RAW_R_AR", "PROD_DB_RAW_RW_AR", "PROD_DB_RAW_FULL_AR", "PROD_DB_RAW_FULL_AR", "SOG_SOME_OBJECTS_R_AR", "SOG_SOME_OBJECTS_RW_AR"]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_role_ownership_grant.role_prod_db_common_r_ar_ownership_grant]
}

resource snowflake_schema_grant grant_usage_on_prod_db__common_schema {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name

  privilege = "USAGE"
  roles = [snowflake_role.PROD_DB_COMMON_R_AR.name, snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name, snowflake_role.SOG_SOME_OBJECTS_R_AR.name, snowflake_role.SOG_SOME_OBJECTS_RW_AR.name]

  depends_on = [snowflake_role_grants.role_prod_db_common_r_ar_grants, snowflake_role_grants.role_prod_db_common_rw_ar_grants, snowflake_role_grants.role_prod_db_common_full_ar_grants, snowflake_role_grants.role_prod_db_common_full_ar_grants, snowflake_role_grants.role_sog_some_objects_r_ar_grants, snowflake_role_grants.role_sog_some_objects_rw_ar_grants, snowflake_role_ownership_grant.role_prod_db_common_r_ar_ownership_grant]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_schema_grant grant_ownership_on_prod_db__common_schema {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_COMMON_FULL_AR.name]

  depends_on = [snowflake_role_grants.role_prod_db_common_full_ar_grants, snowflake_role_ownership_grant.role_prod_db_common_full_ar_ownership_grant]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_schema_grant grant_usage_on_prod_db__raw_schema {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name

  privilege = "USAGE"
  roles = [snowflake_role.PROD_DB_RAW_R_AR.name, snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name, snowflake_role.SOG_SOME_OBJECTS_R_AR.name, snowflake_role.SOG_SOME_OBJECTS_RW_AR.name]

  depends_on = [snowflake_role_grants.role_prod_db_raw_r_ar_grants, snowflake_role_grants.role_prod_db_raw_rw_ar_grants, snowflake_role_grants.role_prod_db_raw_full_ar_grants, snowflake_role_grants.role_prod_db_raw_full_ar_grants, snowflake_role_grants.role_sog_some_objects_r_ar_grants, snowflake_role_grants.role_sog_some_objects_rw_ar_grants, snowflake_role_ownership_grant.role_prod_db_raw_r_ar_ownership_grant]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_schema_grant grant_ownership_on_prod_db__raw_schema {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_RAW_FULL_AR.name]

  depends_on = [snowflake_role_grants.role_prod_db_raw_full_ar_grants, snowflake_role_ownership_grant.role_prod_db_raw_full_ar_ownership_grant]

  with_grant_option = false
  enable_multiple_grants = true
}

resource snowflake_table_grant grant_select_on_prod_db__common_tables {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  privilege = "SELECT"
  roles = [snowflake_role.PROD_DB_COMMON_R_AR.name, snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_r_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__common_tables]
}

resource snowflake_table_grant grant_select_on_future_prod_db__common_tables {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name

  privilege = "SELECT"
  roles = [snowflake_role.PROD_DB_COMMON_R_AR.name, snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_r_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__common_tables]
}

resource snowflake_table_grant grant_insert_on_prod_db__common_tables {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  privilege = "INSERT"
  roles = [snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_rw_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__common_tables]
}

resource snowflake_table_grant grant_update_on_prod_db__common_tables {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  privilege = "UPDATE"
  roles = [snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_rw_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__common_tables]
}

resource snowflake_table_grant grant_delete_on_prod_db__common_tables {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  privilege = "DELETE"
  roles = [snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_rw_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__common_tables]
}

resource snowflake_table_grant grant_references_on_prod_db__common_tables {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  privilege = "REFERENCES"
  roles = [snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_rw_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__common_tables]
}

resource snowflake_table_grant grant_insert_on_future_prod_db__common_tables {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name

  privilege = "INSERT"
  roles = [snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_rw_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__common_tables]
}

resource snowflake_table_grant grant_update_on_future_prod_db__common_tables {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name

  privilege = "UPDATE"
  roles = [snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_rw_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__common_tables]
}

resource snowflake_table_grant grant_delete_on_future_prod_db__common_tables {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name

  privilege = "DELETE"
  roles = [snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_rw_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__common_tables]
}

resource snowflake_table_grant grant_references_on_future_prod_db__common_tables {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name

  privilege = "REFERENCES"
  roles = [snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_rw_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__common_tables]
}

resource snowflake_table_grant grant_ownership_on_prod_db__common_tables {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_full_ar_ownership_grant]
}

resource snowflake_table_grant grant_ownership_on_future_prod_db__common_tables {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_full_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__common_tables]
}

resource snowflake_table_grant grant_select_on_prod_db__raw_tables {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  privilege = "SELECT"
  roles = [snowflake_role.PROD_DB_RAW_R_AR.name, snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_r_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__raw_tables]
}

resource snowflake_table_grant grant_select_on_future_prod_db__raw_tables {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name

  privilege = "SELECT"
  roles = [snowflake_role.PROD_DB_RAW_R_AR.name, snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_r_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__raw_tables]
}

resource snowflake_table_grant grant_insert_on_prod_db__raw_tables {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  privilege = "INSERT"
  roles = [snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_rw_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__raw_tables]
}

resource snowflake_table_grant grant_update_on_prod_db__raw_tables {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  privilege = "UPDATE"
  roles = [snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_rw_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__raw_tables]
}

resource snowflake_table_grant grant_delete_on_prod_db__raw_tables {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  privilege = "DELETE"
  roles = [snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_rw_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__raw_tables]
}

resource snowflake_table_grant grant_references_on_prod_db__raw_tables {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  privilege = "REFERENCES"
  roles = [snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_rw_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__raw_tables]
}

resource snowflake_table_grant grant_insert_on_future_prod_db__raw_tables {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name

  privilege = "INSERT"
  roles = [snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_rw_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__raw_tables]
}

resource snowflake_table_grant grant_update_on_future_prod_db__raw_tables {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name

  privilege = "UPDATE"
  roles = [snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_rw_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__raw_tables]
}

resource snowflake_table_grant grant_delete_on_future_prod_db__raw_tables {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name

  privilege = "DELETE"
  roles = [snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_rw_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__raw_tables]
}

resource snowflake_table_grant grant_references_on_future_prod_db__raw_tables {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name

  privilege = "REFERENCES"
  roles = [snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_rw_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__raw_tables]
}

resource snowflake_table_grant grant_ownership_on_prod_db__raw_tables {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_full_ar_ownership_grant]
}

resource snowflake_table_grant grant_ownership_on_future_prod_db__raw_tables {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_full_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__raw_tables]
}

resource snowflake_table_grant grant_select_on_prod_db__raw_tables_MY_TABLE {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  table_name = "MY_TABLE"
  privilege = "SELECT"
  roles = [snowflake_role.SOG_SOME_OBJECTS_R_AR.name, snowflake_role.SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_role_ownership_grant.role_sog_some_objects_r_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__raw_tables]
}

resource snowflake_table_grant grant_select_on_prod_db__common_tables_SEED_DATA {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  table_name = "SEED_DATA"
  privilege = "SELECT"
  roles = [snowflake_role.SOG_SOME_OBJECTS_R_AR.name, snowflake_role.SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_role_ownership_grant.role_sog_some_objects_r_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__common_tables]
}

resource snowflake_table_grant grant_insert_on_prod_db__raw_tables_MY_TABLE {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  table_name = "MY_TABLE"
  privilege = "INSERT"
  roles = [snowflake_role.SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_role_ownership_grant.role_sog_some_objects_rw_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__raw_tables]
}

resource snowflake_table_grant grant_update_on_prod_db__raw_tables_MY_TABLE {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  table_name = "MY_TABLE"
  privilege = "UPDATE"
  roles = [snowflake_role.SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_role_ownership_grant.role_sog_some_objects_rw_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__raw_tables]
}

resource snowflake_table_grant grant_delete_on_prod_db__raw_tables_MY_TABLE {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  table_name = "MY_TABLE"
  privilege = "DELETE"
  roles = [snowflake_role.SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_role_ownership_grant.role_sog_some_objects_rw_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__raw_tables]
}

resource snowflake_table_grant grant_insert_on_prod_db__common_tables_SEED_DATA {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  table_name = "SEED_DATA"
  privilege = "INSERT"
  roles = [snowflake_role.SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_role_ownership_grant.role_sog_some_objects_rw_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__common_tables]
}

resource snowflake_table_grant grant_update_on_prod_db__common_tables_SEED_DATA {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  table_name = "SEED_DATA"
  privilege = "UPDATE"
  roles = [snowflake_role.SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_role_ownership_grant.role_sog_some_objects_rw_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__common_tables]
}

resource snowflake_table_grant grant_delete_on_prod_db__common_tables_SEED_DATA {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  table_name = "SEED_DATA"
  privilege = "DELETE"
  roles = [snowflake_role.SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_role_ownership_grant.role_sog_some_objects_rw_ar_ownership_grant, snowflake_table_grant.grant_ownership_on_prod_db__common_tables]
}

resource snowflake_view_grant grant_select_on_prod_db__common_views {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  privilege = "SELECT"
  roles = [snowflake_role.PROD_DB_COMMON_R_AR.name, snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_r_ar_ownership_grant, snowflake_view_grant.grant_ownership_on_prod_db__common_views]
}

resource snowflake_view_grant grant_select_on_future_prod_db__common_views {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name

  privilege = "SELECT"
  roles = [snowflake_role.PROD_DB_COMMON_R_AR.name, snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_r_ar_ownership_grant, snowflake_view_grant.grant_ownership_on_prod_db__common_views]
}

resource snowflake_view_grant grant_ownership_on_prod_db__common_views {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_full_ar_ownership_grant]
}

resource snowflake_view_grant grant_ownership_on_future_prod_db__common_views {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_full_ar_ownership_grant, snowflake_view_grant.grant_ownership_on_prod_db__common_views]
}

resource snowflake_view_grant grant_select_on_prod_db__raw_views {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  privilege = "SELECT"
  roles = [snowflake_role.PROD_DB_RAW_R_AR.name, snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_r_ar_ownership_grant, snowflake_view_grant.grant_ownership_on_prod_db__raw_views]
}

resource snowflake_view_grant grant_select_on_future_prod_db__raw_views {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name

  privilege = "SELECT"
  roles = [snowflake_role.PROD_DB_RAW_R_AR.name, snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_r_ar_ownership_grant, snowflake_view_grant.grant_ownership_on_prod_db__raw_views]
}

resource snowflake_view_grant grant_ownership_on_prod_db__raw_views {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_full_ar_ownership_grant]
}

resource snowflake_view_grant grant_ownership_on_future_prod_db__raw_views {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_full_ar_ownership_grant, snowflake_view_grant.grant_ownership_on_prod_db__raw_views]
}

resource snowflake_view_grant grant_select_on_prod_db__raw_views_MY_VIEW {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  view_name = "MY_VIEW"
  privilege = "SELECT"
  roles = [snowflake_role.SOG_SOME_OBJECTS_R_AR.name, snowflake_role.SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_role_ownership_grant.role_sog_some_objects_r_ar_ownership_grant, snowflake_view_grant.grant_ownership_on_prod_db__raw_views]
}

resource snowflake_view_grant grant_select_on_prod_db__common_views_ANOTHER_VIEW {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  view_name = "ANOTHER_VIEW"
  privilege = "SELECT"
  roles = [snowflake_role.SOG_SOME_OBJECTS_R_AR.name, snowflake_role.SOG_SOME_OBJECTS_RW_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_role_ownership_grant.role_sog_some_objects_r_ar_ownership_grant, snowflake_view_grant.grant_ownership_on_prod_db__common_views]
}

resource snowflake_sequence_grant grant_usage_on_prod_db__common_sequences {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  privilege = "USAGE"
  roles = [snowflake_role.PROD_DB_COMMON_R_AR.name, snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_r_ar_ownership_grant, snowflake_sequence_grant.grant_ownership_on_prod_db__common_sequences]
}

resource snowflake_sequence_grant grant_usage_on_future_prod_db__common_sequences {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name

  privilege = "USAGE"
  roles = [snowflake_role.PROD_DB_COMMON_R_AR.name, snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_r_ar_ownership_grant, snowflake_sequence_grant.grant_ownership_on_prod_db__common_sequences]
}

resource snowflake_sequence_grant grant_ownership_on_prod_db__common_sequences {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_full_ar_ownership_grant]
}

resource snowflake_sequence_grant grant_ownership_on_future_prod_db__common_sequences {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_full_ar_ownership_grant, snowflake_sequence_grant.grant_ownership_on_prod_db__common_sequences]
}

resource snowflake_sequence_grant grant_usage_on_prod_db__raw_sequences {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  privilege = "USAGE"
  roles = [snowflake_role.PROD_DB_RAW_R_AR.name, snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_r_ar_ownership_grant, snowflake_sequence_grant.grant_ownership_on_prod_db__raw_sequences]
}

resource snowflake_sequence_grant grant_usage_on_future_prod_db__raw_sequences {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name

  privilege = "USAGE"
  roles = [snowflake_role.PROD_DB_RAW_R_AR.name, snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_r_ar_ownership_grant, snowflake_sequence_grant.grant_ownership_on_prod_db__raw_sequences]
}

resource snowflake_sequence_grant grant_ownership_on_prod_db__raw_sequences {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_full_ar_ownership_grant]
}

resource snowflake_sequence_grant grant_ownership_on_future_prod_db__raw_sequences {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_full_ar_ownership_grant, snowflake_sequence_grant.grant_ownership_on_prod_db__raw_sequences]
}

resource snowflake_stage_grant grant_usage_on_prod_db__common_stages {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  privilege = "USAGE"
  roles = [snowflake_role.PROD_DB_COMMON_R_AR.name, snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_r_ar_ownership_grant, snowflake_stage_grant.grant_ownership_on_prod_db__common_stages]
}

resource snowflake_stage_grant grant_read_on_prod_db__common_stages {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  privilege = "READ"
  roles = [snowflake_role.PROD_DB_COMMON_R_AR.name, snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_r_ar_ownership_grant, snowflake_stage_grant.grant_ownership_on_prod_db__common_stages]
}

resource snowflake_stage_grant grant_usage_on_future_prod_db__common_stages {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name

  privilege = "USAGE"
  roles = [snowflake_role.PROD_DB_COMMON_R_AR.name, snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_r_ar_ownership_grant, snowflake_stage_grant.grant_ownership_on_prod_db__common_stages]
}

resource snowflake_stage_grant grant_read_on_future_prod_db__common_stages {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name

  privilege = "READ"
  roles = [snowflake_role.PROD_DB_COMMON_R_AR.name, snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_r_ar_ownership_grant, snowflake_stage_grant.grant_ownership_on_prod_db__common_stages]
}

resource snowflake_stage_grant grant_write_on_future_prod_db__common_stages {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name

  privilege = "WRITE"
  roles = [snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_stage_grant.grant_usage_on_future_prod_db__common_stages, snowflake_stage_grant.grant_read_on_future_prod_db__common_stages, snowflake_role_ownership_grant.role_prod_db_common_rw_ar_ownership_grant, snowflake_stage_grant.grant_ownership_on_prod_db__common_stages]
}

resource snowflake_stage_grant grant_write_on_prod_db__common_stages {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  privilege = "WRITE"
  roles = [snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_rw_ar_ownership_grant, snowflake_stage_grant.grant_ownership_on_prod_db__common_stages]
}

resource snowflake_stage_grant grant_ownership_on_prod_db__common_stages {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_full_ar_ownership_grant]
}

resource snowflake_stage_grant grant_ownership_on_future_prod_db__common_stages {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_full_ar_ownership_grant, snowflake_stage_grant.grant_ownership_on_prod_db__common_stages]
}

resource snowflake_stage_grant grant_usage_on_prod_db__raw_stages {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  privilege = "USAGE"
  roles = [snowflake_role.PROD_DB_RAW_R_AR.name, snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_r_ar_ownership_grant, snowflake_stage_grant.grant_ownership_on_prod_db__raw_stages]
}

resource snowflake_stage_grant grant_read_on_prod_db__raw_stages {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  privilege = "READ"
  roles = [snowflake_role.PROD_DB_RAW_R_AR.name, snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_r_ar_ownership_grant, snowflake_stage_grant.grant_ownership_on_prod_db__raw_stages]
}

resource snowflake_stage_grant grant_usage_on_future_prod_db__raw_stages {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name

  privilege = "USAGE"
  roles = [snowflake_role.PROD_DB_RAW_R_AR.name, snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_r_ar_ownership_grant, snowflake_stage_grant.grant_ownership_on_prod_db__raw_stages]
}

resource snowflake_stage_grant grant_read_on_future_prod_db__raw_stages {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name

  privilege = "READ"
  roles = [snowflake_role.PROD_DB_RAW_R_AR.name, snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_r_ar_ownership_grant, snowflake_stage_grant.grant_ownership_on_prod_db__raw_stages]
}

resource snowflake_stage_grant grant_write_on_future_prod_db__raw_stages {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name

  privilege = "WRITE"
  roles = [snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_stage_grant.grant_usage_on_future_prod_db__raw_stages, snowflake_stage_grant.grant_read_on_future_prod_db__raw_stages, snowflake_role_ownership_grant.role_prod_db_raw_rw_ar_ownership_grant, snowflake_stage_grant.grant_ownership_on_prod_db__raw_stages]
}

resource snowflake_stage_grant grant_write_on_prod_db__raw_stages {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  privilege = "WRITE"
  roles = [snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_rw_ar_ownership_grant, snowflake_stage_grant.grant_ownership_on_prod_db__raw_stages]
}

resource snowflake_stage_grant grant_ownership_on_prod_db__raw_stages {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_full_ar_ownership_grant]
}

resource snowflake_stage_grant grant_ownership_on_future_prod_db__raw_stages {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_full_ar_ownership_grant, snowflake_stage_grant.grant_ownership_on_prod_db__raw_stages]
}

resource snowflake_file_format_grant grant_usage_on_prod_db__common_file_formats {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  privilege = "USAGE"
  roles = [snowflake_role.PROD_DB_COMMON_R_AR.name, snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_r_ar_ownership_grant, snowflake_file_format_grant.grant_ownership_on_prod_db__common_file_formats]
}

resource snowflake_file_format_grant grant_usage_on_future_prod_db__common_file_formats {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name

  privilege = "USAGE"
  roles = [snowflake_role.PROD_DB_COMMON_R_AR.name, snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_r_ar_ownership_grant, snowflake_file_format_grant.grant_ownership_on_prod_db__common_file_formats]
}

resource snowflake_file_format_grant grant_ownership_on_prod_db__common_file_formats {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_full_ar_ownership_grant]
}

resource snowflake_file_format_grant grant_ownership_on_future_prod_db__common_file_formats {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_full_ar_ownership_grant, snowflake_file_format_grant.grant_ownership_on_prod_db__common_file_formats]
}

resource snowflake_file_format_grant grant_usage_on_prod_db__raw_file_formats {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  privilege = "USAGE"
  roles = [snowflake_role.PROD_DB_RAW_R_AR.name, snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_r_ar_ownership_grant, snowflake_file_format_grant.grant_ownership_on_prod_db__raw_file_formats]
}

resource snowflake_file_format_grant grant_usage_on_future_prod_db__raw_file_formats {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name

  privilege = "USAGE"
  roles = [snowflake_role.PROD_DB_RAW_R_AR.name, snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_r_ar_ownership_grant, snowflake_file_format_grant.grant_ownership_on_prod_db__raw_file_formats]
}

resource snowflake_file_format_grant grant_ownership_on_prod_db__raw_file_formats {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_full_ar_ownership_grant]
}

resource snowflake_file_format_grant grant_ownership_on_future_prod_db__raw_file_formats {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_full_ar_ownership_grant, snowflake_file_format_grant.grant_ownership_on_prod_db__raw_file_formats]
}

resource snowflake_stream_grant grant_select_on_prod_db__common_streams {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  privilege = "SELECT"
  roles = [snowflake_role.PROD_DB_COMMON_R_AR.name, snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_r_ar_ownership_grant, snowflake_stream_grant.grant_ownership_on_prod_db__common_streams]
}

resource snowflake_stream_grant grant_select_on_future_prod_db__common_streams {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name

  privilege = "SELECT"
  roles = [snowflake_role.PROD_DB_COMMON_R_AR.name, snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_r_ar_ownership_grant, snowflake_stream_grant.grant_ownership_on_prod_db__common_streams]
}

resource snowflake_stream_grant grant_ownership_on_prod_db__common_streams {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_full_ar_ownership_grant]
}

resource snowflake_stream_grant grant_ownership_on_future_prod_db__common_streams {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_full_ar_ownership_grant, snowflake_stream_grant.grant_ownership_on_prod_db__common_streams]
}

resource snowflake_stream_grant grant_select_on_prod_db__raw_streams {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  privilege = "SELECT"
  roles = [snowflake_role.PROD_DB_RAW_R_AR.name, snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_r_ar_ownership_grant, snowflake_stream_grant.grant_ownership_on_prod_db__raw_streams]
}

resource snowflake_stream_grant grant_select_on_future_prod_db__raw_streams {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name

  privilege = "SELECT"
  roles = [snowflake_role.PROD_DB_RAW_R_AR.name, snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_r_ar_ownership_grant, snowflake_stream_grant.grant_ownership_on_prod_db__raw_streams]
}

resource snowflake_stream_grant grant_ownership_on_prod_db__raw_streams {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_full_ar_ownership_grant]
}

resource snowflake_stream_grant grant_ownership_on_future_prod_db__raw_streams {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_full_ar_ownership_grant, snowflake_stream_grant.grant_ownership_on_prod_db__raw_streams]
}

resource snowflake_procedure_grant grant_usage_on_prod_db__common_procedures {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  privilege = "USAGE"
  roles = [snowflake_role.PROD_DB_COMMON_R_AR.name, snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_r_ar_ownership_grant, snowflake_procedure_grant.grant_ownership_on_prod_db__common_procedures]
}

resource snowflake_procedure_grant grant_usage_on_future_prod_db__common_procedures {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name

  privilege = "USAGE"
  roles = [snowflake_role.PROD_DB_COMMON_R_AR.name, snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_r_ar_ownership_grant, snowflake_procedure_grant.grant_ownership_on_prod_db__common_procedures]
}

resource snowflake_procedure_grant grant_ownership_on_prod_db__common_procedures {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_full_ar_ownership_grant]
}

resource snowflake_procedure_grant grant_ownership_on_future_prod_db__common_procedures {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_full_ar_ownership_grant, snowflake_procedure_grant.grant_ownership_on_prod_db__common_procedures]
}

resource snowflake_procedure_grant grant_usage_on_prod_db__raw_procedures {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  privilege = "USAGE"
  roles = [snowflake_role.PROD_DB_RAW_R_AR.name, snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_r_ar_ownership_grant, snowflake_procedure_grant.grant_ownership_on_prod_db__raw_procedures]
}

resource snowflake_procedure_grant grant_usage_on_future_prod_db__raw_procedures {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name

  privilege = "USAGE"
  roles = [snowflake_role.PROD_DB_RAW_R_AR.name, snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_r_ar_ownership_grant, snowflake_procedure_grant.grant_ownership_on_prod_db__raw_procedures]
}

resource snowflake_procedure_grant grant_ownership_on_prod_db__raw_procedures {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_full_ar_ownership_grant]
}

resource snowflake_procedure_grant grant_ownership_on_future_prod_db__raw_procedures {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_full_ar_ownership_grant, snowflake_procedure_grant.grant_ownership_on_prod_db__raw_procedures]
}

resource snowflake_function_grant grant_usage_on_prod_db__common_functions {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  privilege = "USAGE"
  roles = [snowflake_role.PROD_DB_COMMON_R_AR.name, snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_r_ar_ownership_grant, snowflake_function_grant.grant_ownership_on_prod_db__common_functions]
}

resource snowflake_function_grant grant_usage_on_future_prod_db__common_functions {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name

  privilege = "USAGE"
  roles = [snowflake_role.PROD_DB_COMMON_R_AR.name, snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_r_ar_ownership_grant, snowflake_function_grant.grant_ownership_on_prod_db__common_functions]
}

resource snowflake_function_grant grant_ownership_on_prod_db__common_functions {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_full_ar_ownership_grant]
}

resource snowflake_function_grant grant_ownership_on_future_prod_db__common_functions {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_full_ar_ownership_grant, snowflake_function_grant.grant_ownership_on_prod_db__common_functions]
}

resource snowflake_function_grant grant_usage_on_prod_db__raw_functions {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  privilege = "USAGE"
  roles = [snowflake_role.PROD_DB_RAW_R_AR.name, snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_r_ar_ownership_grant, snowflake_function_grant.grant_ownership_on_prod_db__raw_functions]
}

resource snowflake_function_grant grant_usage_on_future_prod_db__raw_functions {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name

  privilege = "USAGE"
  roles = [snowflake_role.PROD_DB_RAW_R_AR.name, snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_r_ar_ownership_grant, snowflake_function_grant.grant_ownership_on_prod_db__raw_functions]
}

resource snowflake_function_grant grant_ownership_on_prod_db__raw_functions {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_full_ar_ownership_grant]
}

resource snowflake_function_grant grant_ownership_on_future_prod_db__raw_functions {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_full_ar_ownership_grant, snowflake_function_grant.grant_ownership_on_prod_db__raw_functions]
}

resource snowflake_materialized_view_grant grant_select_on_prod_db__common_materialized_views {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  privilege = "SELECT"
  roles = [snowflake_role.PROD_DB_COMMON_R_AR.name, snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_r_ar_ownership_grant, snowflake_materialized_view_grant.grant_ownership_on_prod_db__common_materialized_views]
}

resource snowflake_materialized_view_grant grant_select_on_future_prod_db__common_materialized_views {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name

  privilege = "SELECT"
  roles = [snowflake_role.PROD_DB_COMMON_R_AR.name, snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_r_ar_ownership_grant, snowflake_materialized_view_grant.grant_ownership_on_prod_db__common_materialized_views]
}

resource snowflake_materialized_view_grant grant_ownership_on_prod_db__common_materialized_views {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_full_ar_ownership_grant]
}

resource snowflake_materialized_view_grant grant_ownership_on_future_prod_db__common_materialized_views {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_full_ar_ownership_grant, snowflake_materialized_view_grant.grant_ownership_on_prod_db__common_materialized_views]
}

resource snowflake_materialized_view_grant grant_select_on_prod_db__raw_materialized_views {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  privilege = "SELECT"
  roles = [snowflake_role.PROD_DB_RAW_R_AR.name, snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_r_ar_ownership_grant, snowflake_materialized_view_grant.grant_ownership_on_prod_db__raw_materialized_views]
}

resource snowflake_materialized_view_grant grant_select_on_future_prod_db__raw_materialized_views {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name

  privilege = "SELECT"
  roles = [snowflake_role.PROD_DB_RAW_R_AR.name, snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_r_ar_ownership_grant, snowflake_materialized_view_grant.grant_ownership_on_prod_db__raw_materialized_views]
}

resource snowflake_materialized_view_grant grant_ownership_on_prod_db__raw_materialized_views {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_full_ar_ownership_grant]
}

resource snowflake_materialized_view_grant grant_ownership_on_future_prod_db__raw_materialized_views {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_full_ar_ownership_grant, snowflake_materialized_view_grant.grant_ownership_on_prod_db__raw_materialized_views]
}

resource snowflake_task_grant grant_monitor_on_prod_db__common_tasks {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  privilege = "MONITOR"
  roles = [snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_rw_ar_ownership_grant, snowflake_task_grant.grant_ownership_on_prod_db__common_tasks]
}

resource snowflake_task_grant grant_operate_on_prod_db__common_tasks {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  privilege = "OPERATE"
  roles = [snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_rw_ar_ownership_grant, snowflake_task_grant.grant_ownership_on_prod_db__common_tasks]
}

resource snowflake_task_grant grant_monitor_on_future_prod_db__common_tasks {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name

  privilege = "MONITOR"
  roles = [snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_rw_ar_ownership_grant, snowflake_task_grant.grant_ownership_on_prod_db__common_tasks]
}

resource snowflake_task_grant grant_operate_on_future_prod_db__common_tasks {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name

  privilege = "OPERATE"
  roles = [snowflake_role.PROD_DB_COMMON_RW_AR.name, snowflake_role.PROD_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_rw_ar_ownership_grant, snowflake_task_grant.grant_ownership_on_prod_db__common_tasks]
}

resource snowflake_task_grant grant_ownership_on_prod_db__common_tasks {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_COMMON_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_full_ar_ownership_grant]
}

resource snowflake_task_grant grant_ownership_on_future_prod_db__common_tasks {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__COMMON.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_COMMON_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__common_schema, snowflake_role_ownership_grant.role_prod_db_common_full_ar_ownership_grant, snowflake_task_grant.grant_ownership_on_prod_db__common_tasks]
}

resource snowflake_task_grant grant_monitor_on_prod_db__raw_tasks {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  privilege = "MONITOR"
  roles = [snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_rw_ar_ownership_grant, snowflake_task_grant.grant_ownership_on_prod_db__raw_tasks]
}

resource snowflake_task_grant grant_operate_on_prod_db__raw_tasks {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  privilege = "OPERATE"
  roles = [snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_rw_ar_ownership_grant, snowflake_task_grant.grant_ownership_on_prod_db__raw_tasks]
}

resource snowflake_task_grant grant_monitor_on_future_prod_db__raw_tasks {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name

  privilege = "MONITOR"
  roles = [snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_rw_ar_ownership_grant, snowflake_task_grant.grant_ownership_on_prod_db__raw_tasks]
}

resource snowflake_task_grant grant_operate_on_future_prod_db__raw_tasks {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name

  privilege = "OPERATE"
  roles = [snowflake_role.PROD_DB_RAW_RW_AR.name, snowflake_role.PROD_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_rw_ar_ownership_grant, snowflake_task_grant.grant_ownership_on_prod_db__raw_tasks]
}

resource snowflake_task_grant grant_ownership_on_prod_db__raw_tasks {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name
  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_RAW_FULL_AR.name]
  enable_multiple_grants = true
  on_all = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_full_ar_ownership_grant]
}

resource snowflake_task_grant grant_ownership_on_future_prod_db__raw_tasks {
  database_name = snowflake_database.PROD_DB.name
  schema_name = snowflake_schema.PROD_DB__RAW.name

  privilege = "OWNERSHIP"
  roles = [snowflake_role.PROD_DB_RAW_FULL_AR.name]

  on_future = true
  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_schema_grant.grant_ownership_on_prod_db__raw_schema, snowflake_role_ownership_grant.role_prod_db_raw_full_ar_ownership_grant, snowflake_task_grant.grant_ownership_on_prod_db__raw_tasks]
}

resource snowflake_warehouse_grant grant_usage_on_warehouse_prod_bi {
  warehouse_name = snowflake_warehouse.PROD_BI.name
  privilege = "USAGE"

  roles = [snowflake_role.PROD_BI_U_AR.name, snowflake_role.PROD_BI_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_role_ownership_grant.role_prod_bi_u_ar_ownership_grant]
}

resource snowflake_warehouse_grant grant_monitor_on_warehouse_prod_bi {
  warehouse_name = snowflake_warehouse.PROD_BI.name
  privilege = "MONITOR"

  roles = [snowflake_role.PROD_BI_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_role_ownership_grant.role_prod_bi_um_ar_ownership_grant]
}

resource snowflake_warehouse_grant grant_ownership_on_warehouse_prod_bi {
  warehouse_name = snowflake_warehouse.PROD_BI.name
  privilege = "OWNERSHIP"

  roles = [snowflake_role.PROD_BI_FULL_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_role_ownership_grant.role_prod_bi_full_ar_ownership_grant]
}

resource snowflake_warehouse_grant grant_usage_on_warehouse_prod_dsci {
  warehouse_name = snowflake_warehouse.PROD_DSCI.name
  privilege = "USAGE"

  roles = [snowflake_role.PROD_DSCI_U_AR.name, snowflake_role.PROD_DSCI_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_role_ownership_grant.role_prod_dsci_u_ar_ownership_grant]
}

resource snowflake_warehouse_grant grant_monitor_on_warehouse_prod_dsci {
  warehouse_name = snowflake_warehouse.PROD_DSCI.name
  privilege = "MONITOR"

  roles = [snowflake_role.PROD_DSCI_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_role_ownership_grant.role_prod_dsci_um_ar_ownership_grant]
}

resource snowflake_warehouse_grant grant_ownership_on_warehouse_prod_dsci {
  warehouse_name = snowflake_warehouse.PROD_DSCI.name
  privilege = "OWNERSHIP"

  roles = [snowflake_role.PROD_DSCI_FULL_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_role_ownership_grant.role_prod_dsci_full_ar_ownership_grant]
}

resource snowflake_warehouse_grant grant_usage_on_warehouse_prod_elt {
  warehouse_name = snowflake_warehouse.PROD_ELT.name
  privilege = "USAGE"

  roles = [snowflake_role.PROD_ELT_U_AR.name, snowflake_role.PROD_ELT_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_role_ownership_grant.role_prod_elt_u_ar_ownership_grant]
}

resource snowflake_warehouse_grant grant_monitor_on_warehouse_prod_elt {
  warehouse_name = snowflake_warehouse.PROD_ELT.name
  privilege = "MONITOR"

  roles = [snowflake_role.PROD_ELT_UM_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_role_ownership_grant.role_prod_elt_um_ar_ownership_grant]
}

resource snowflake_warehouse_grant grant_ownership_on_warehouse_prod_elt {
  warehouse_name = snowflake_warehouse.PROD_ELT.name
  privilege = "OWNERSHIP"

  roles = [snowflake_role.PROD_ELT_FULL_AR.name]

  with_grant_option = false
  enable_multiple_grants = true
  depends_on = [snowflake_role_ownership_grant.role_prod_elt_full_ar_ownership_grant]
}

resource snowflake_role_grants role_prod_db_common_r_ar_grants {
  role_name = snowflake_role.PROD_DB_COMMON_R_AR.name

  enable_multiple_grants = true
  roles = [
    "SYSADMIN",
    snowflake_role.DATA_ANALYST.name,
  ]
}

resource snowflake_role_grants role_prod_db_common_rw_ar_grants {
  role_name = snowflake_role.PROD_DB_COMMON_RW_AR.name

  enable_multiple_grants = true
  roles = [
    "SYSADMIN",
    snowflake_role.DATA_SCIENTIST.name,
  ]
}

resource snowflake_role_grants role_prod_db_common_full_ar_grants {
  role_name = snowflake_role.PROD_DB_COMMON_FULL_AR.name

  enable_multiple_grants = true
  roles = [
    "SYSADMIN",
    snowflake_role.ELT_TOOL.name,
  ]
}

resource snowflake_role_grants role_prod_db_raw_r_ar_grants {
  role_name = snowflake_role.PROD_DB_RAW_R_AR.name

  enable_multiple_grants = true
  roles = [
    "SYSADMIN",
    snowflake_role.DATA_ANALYST.name,
    snowflake_role.DATA_SCIENTIST.name,
  ]
}

resource snowflake_role_grants role_prod_db_raw_rw_ar_grants {
  role_name = snowflake_role.PROD_DB_RAW_RW_AR.name

  enable_multiple_grants = true
  roles = [
    "SYSADMIN",
  ]
}

resource snowflake_role_grants role_prod_db_raw_full_ar_grants {
  role_name = snowflake_role.PROD_DB_RAW_FULL_AR.name

  enable_multiple_grants = true
  roles = [
    "SYSADMIN",
    snowflake_role.ELT_TOOL.name,
  ]
}

resource snowflake_role_grants role_sog_some_objects_r_ar_grants {
  role_name = snowflake_role.SOG_SOME_OBJECTS_R_AR.name

  enable_multiple_grants = true
  roles = [
    "SYSADMIN",
    snowflake_role.DATA_ANALYST.name,
  ]
}

resource snowflake_role_grants role_sog_some_objects_rw_ar_grants {
  role_name = snowflake_role.SOG_SOME_OBJECTS_RW_AR.name

  enable_multiple_grants = true
  roles = [
    "SYSADMIN",
    snowflake_role.ELT_TOOL.name,
  ]
}

resource snowflake_role_grants role_prod_bi_u_ar_grants {
  role_name = snowflake_role.PROD_BI_U_AR.name

  enable_multiple_grants = true
  roles = [
    "SYSADMIN",
    snowflake_role.DATA_ANALYST.name,
  ]
}

resource snowflake_role_grants role_prod_bi_um_ar_grants {
  role_name = snowflake_role.PROD_BI_UM_AR.name

  enable_multiple_grants = true
  roles = [
    "SYSADMIN",
  ]
}

resource snowflake_role_grants role_prod_bi_full_ar_grants {
  role_name = snowflake_role.PROD_BI_FULL_AR.name

  enable_multiple_grants = true
  roles = [
    "SYSADMIN",
  ]
}

resource snowflake_role_grants role_prod_dsci_u_ar_grants {
  role_name = snowflake_role.PROD_DSCI_U_AR.name

  enable_multiple_grants = true
  roles = [
    "SYSADMIN",
    snowflake_role.DATA_SCIENTIST.name,
  ]
}

resource snowflake_role_grants role_prod_dsci_um_ar_grants {
  role_name = snowflake_role.PROD_DSCI_UM_AR.name

  enable_multiple_grants = true
  roles = [
    "SYSADMIN",
  ]
}

resource snowflake_role_grants role_prod_dsci_full_ar_grants {
  role_name = snowflake_role.PROD_DSCI_FULL_AR.name

  enable_multiple_grants = true
  roles = [
    "SYSADMIN",
  ]
}

resource snowflake_role_grants role_prod_elt_u_ar_grants {
  role_name = snowflake_role.PROD_ELT_U_AR.name

  enable_multiple_grants = true
  roles = [
    "SYSADMIN",
    snowflake_role.ELT_TOOL.name,
  ]
}

resource snowflake_role_grants role_prod_elt_um_ar_grants {
  role_name = snowflake_role.PROD_ELT_UM_AR.name

  enable_multiple_grants = true
  roles = [
    "SYSADMIN",
  ]
}

resource snowflake_role_grants role_prod_elt_full_ar_grants {
  role_name = snowflake_role.PROD_ELT_FULL_AR.name

  enable_multiple_grants = true
  roles = [
    "SYSADMIN",
  ]
}
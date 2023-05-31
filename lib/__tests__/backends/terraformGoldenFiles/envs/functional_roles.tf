resource snowflake_role PROD_DATA_ANALYST_ROLE {
  name = "PROD_DATA_ANALYST_ROLE"
}

resource snowflake_role_ownership_grant role_prod_data_analyst_role_ownership_grant {
  on_role_name = snowflake_role.PROD_DATA_ANALYST_ROLE.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role_grants role_prod_data_analyst_role_grants {
  role_name = snowflake_role.PROD_DATA_ANALYST_ROLE.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.PROD_SYSADMIN.name,
  ]
}

resource snowflake_role PROD_DATA_SCIENTIST_ROLE {
  name = "PROD_DATA_SCIENTIST_ROLE"
}

resource snowflake_role_ownership_grant role_prod_data_scientist_role_ownership_grant {
  on_role_name = snowflake_role.PROD_DATA_SCIENTIST_ROLE.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role_grants role_prod_data_scientist_role_grants {
  role_name = snowflake_role.PROD_DATA_SCIENTIST_ROLE.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.PROD_SYSADMIN.name,
  ]
}

resource snowflake_role PROD_ELT_TOOL_ROLE {
  name = "PROD_ELT_TOOL_ROLE"
}

resource snowflake_role_ownership_grant role_prod_elt_tool_role_ownership_grant {
  on_role_name = snowflake_role.PROD_ELT_TOOL_ROLE.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role_grants role_prod_elt_tool_role_grants {
  role_name = snowflake_role.PROD_ELT_TOOL_ROLE.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.PROD_SYSADMIN.name,
  ]
}

resource snowflake_role PROD_DEVOPS_ROLE {
  name = "PROD_DEVOPS_ROLE"
}

resource snowflake_role_ownership_grant role_prod_devops_role_ownership_grant {
  on_role_name = snowflake_role.PROD_DEVOPS_ROLE.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role_grants role_prod_devops_role_grants {
  role_name = snowflake_role.PROD_DEVOPS_ROLE.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.PROD_SYSADMIN.name,
  ]
}

resource snowflake_role DEV_DATA_ANALYST_ROLE {
  name = "DEV_DATA_ANALYST_ROLE"
}

resource snowflake_role_ownership_grant role_dev_data_analyst_role_ownership_grant {
  on_role_name = snowflake_role.DEV_DATA_ANALYST_ROLE.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role_grants role_dev_data_analyst_role_grants {
  role_name = snowflake_role.DEV_DATA_ANALYST_ROLE.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.DEV_SYSADMIN.name,
  ]
}

resource snowflake_role DEV_DATA_SCIENTIST_ROLE {
  name = "DEV_DATA_SCIENTIST_ROLE"
}

resource snowflake_role_ownership_grant role_dev_data_scientist_role_ownership_grant {
  on_role_name = snowflake_role.DEV_DATA_SCIENTIST_ROLE.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role_grants role_dev_data_scientist_role_grants {
  role_name = snowflake_role.DEV_DATA_SCIENTIST_ROLE.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.DEV_SYSADMIN.name,
  ]
}

resource snowflake_role DEV_ELT_TOOL_ROLE {
  name = "DEV_ELT_TOOL_ROLE"
}

resource snowflake_role_ownership_grant role_dev_elt_tool_role_ownership_grant {
  on_role_name = snowflake_role.DEV_ELT_TOOL_ROLE.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role_grants role_dev_elt_tool_role_grants {
  role_name = snowflake_role.DEV_ELT_TOOL_ROLE.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.DEV_SYSADMIN.name,
  ]
}

resource snowflake_role DEV_DEVOPS_ROLE {
  name = "DEV_DEVOPS_ROLE"
}

resource snowflake_role_ownership_grant role_dev_devops_role_ownership_grant {
  on_role_name = snowflake_role.DEV_DEVOPS_ROLE.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role_grants role_dev_devops_role_grants {
  role_name = snowflake_role.DEV_DEVOPS_ROLE.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.DEV_SYSADMIN.name,
  ]
}

resource snowflake_role TEST_DATA_ANALYST_ROLE {
  name = "TEST_DATA_ANALYST_ROLE"
}

resource snowflake_role_ownership_grant role_test_data_analyst_role_ownership_grant {
  on_role_name = snowflake_role.TEST_DATA_ANALYST_ROLE.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role_grants role_test_data_analyst_role_grants {
  role_name = snowflake_role.TEST_DATA_ANALYST_ROLE.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.TEST_SYSADMIN.name,
  ]
}

resource snowflake_role TEST_DATA_SCIENTIST_ROLE {
  name = "TEST_DATA_SCIENTIST_ROLE"
}

resource snowflake_role_ownership_grant role_test_data_scientist_role_ownership_grant {
  on_role_name = snowflake_role.TEST_DATA_SCIENTIST_ROLE.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role_grants role_test_data_scientist_role_grants {
  role_name = snowflake_role.TEST_DATA_SCIENTIST_ROLE.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.TEST_SYSADMIN.name,
  ]
}

resource snowflake_role TEST_ELT_TOOL_ROLE {
  name = "TEST_ELT_TOOL_ROLE"
}

resource snowflake_role_ownership_grant role_test_elt_tool_role_ownership_grant {
  on_role_name = snowflake_role.TEST_ELT_TOOL_ROLE.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role_grants role_test_elt_tool_role_grants {
  role_name = snowflake_role.TEST_ELT_TOOL_ROLE.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.TEST_SYSADMIN.name,
  ]
}

resource snowflake_role TEST_DEVOPS_ROLE {
  name = "TEST_DEVOPS_ROLE"
}

resource snowflake_role_ownership_grant role_test_devops_role_ownership_grant {
  on_role_name = snowflake_role.TEST_DEVOPS_ROLE.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role_grants role_test_devops_role_grants {
  role_name = snowflake_role.TEST_DEVOPS_ROLE.name

  enable_multiple_grants = true
  roles = [
    snowflake_role.TEST_SYSADMIN.name,
  ]
}
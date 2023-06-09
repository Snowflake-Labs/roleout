resource snowflake_role DATA_ANALYST {
  name = "DATA_ANALYST"
}

resource snowflake_role_ownership_grant role_data_analyst_ownership_grant {
  on_role_name = snowflake_role.DATA_ANALYST.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role_grants role_data_analyst_grants {
  role_name = snowflake_role.DATA_ANALYST.name

  enable_multiple_grants = true
  roles = [
    "SYSADMIN",
  ]
}

resource snowflake_role DATA_SCIENTIST {
  name = "DATA_SCIENTIST"
}

resource snowflake_role_ownership_grant role_data_scientist_ownership_grant {
  on_role_name = snowflake_role.DATA_SCIENTIST.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role_grants role_data_scientist_grants {
  role_name = snowflake_role.DATA_SCIENTIST.name

  enable_multiple_grants = true
  roles = [
    "SYSADMIN",
  ]
}

resource snowflake_role ELT_TOOL {
  name = "ELT_TOOL"
}

resource snowflake_role_ownership_grant role_elt_tool_ownership_grant {
  on_role_name = snowflake_role.ELT_TOOL.name
  to_role_name = "USERADMIN"
  revert_ownership_to_role_name = "SYSADMIN"
}

resource snowflake_role_grants role_elt_tool_grants {
  role_name = snowflake_role.ELT_TOOL.name

  enable_multiple_grants = true
  roles = [
    "SYSADMIN",
  ]
}
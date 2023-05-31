resource snowflake_warehouse PROD_BI_WH {
  name = "PROD_BI_WH"
  warehouse_size = "X-Small"
  max_cluster_count = 10
  min_cluster_count = 2
  scaling_policy = "ECONOMY"
  auto_suspend = 18540
  auto_resume = false
  enable_query_acceleration = false
  warehouse_type = "STANDARD"
  statement_timeout_in_seconds = 3600
  resource_monitor = "FOO_PROD"
}

resource snowflake_warehouse PROD_DSCI_WH {
  name = "PROD_DSCI_WH"
  warehouse_size = "Medium"
  max_cluster_count = 1
  min_cluster_count = 1
  auto_suspend = 600
  auto_resume = true
  enable_query_acceleration = false
  warehouse_type = "STANDARD"
  initially_suspended = true
}

resource snowflake_warehouse PROD_ELT_WH {
  name = "PROD_ELT_WH"
  warehouse_size = "Medium"
  max_cluster_count = 1
  min_cluster_count = 1
  auto_suspend = 600
  auto_resume = true
  enable_query_acceleration = false
  warehouse_type = "STANDARD"
  initially_suspended = true
}

resource snowflake_warehouse PROD_DEVOPS_WH {
  name = "PROD_DEVOPS_WH"
  warehouse_size = "Medium"
  max_cluster_count = 1
  min_cluster_count = 1
  auto_suspend = 600
  auto_resume = true
  enable_query_acceleration = false
  warehouse_type = "STANDARD"
  initially_suspended = true
}

resource snowflake_warehouse DEV_BI_WH {
  name = "DEV_BI_WH"
  warehouse_size = "Small"
  max_cluster_count = 9
  min_cluster_count = 3
  scaling_policy = "ECONOMY"
  auto_suspend = 18000
  auto_resume = true
  enable_query_acceleration = false
  warehouse_type = "STANDARD"
  statement_timeout_in_seconds = 60
  resource_monitor = "FOO_DEV"
}

resource snowflake_warehouse DEV_DSCI_WH {
  name = "DEV_DSCI_WH"
  warehouse_size = "Medium"
  max_cluster_count = 1
  min_cluster_count = 1
  auto_suspend = 600
  auto_resume = true
  enable_query_acceleration = false
  warehouse_type = "STANDARD"
  initially_suspended = true
}

resource snowflake_warehouse DEV_ELT_WH {
  name = "DEV_ELT_WH"
  warehouse_size = "Medium"
  max_cluster_count = 1
  min_cluster_count = 1
  auto_suspend = 600
  auto_resume = true
  enable_query_acceleration = false
  warehouse_type = "STANDARD"
  initially_suspended = true
}

resource snowflake_warehouse DEV_DEVOPS_WH {
  name = "DEV_DEVOPS_WH"
  warehouse_size = "Medium"
  max_cluster_count = 1
  min_cluster_count = 1
  auto_suspend = 600
  auto_resume = true
  enable_query_acceleration = false
  warehouse_type = "STANDARD"
  initially_suspended = true
}

resource snowflake_warehouse TEST_BI_WH {
  name = "TEST_BI_WH"
  warehouse_size = "Medium"
  max_cluster_count = 1
  min_cluster_count = 1
  auto_suspend = 600
  auto_resume = true
  enable_query_acceleration = false
  warehouse_type = "STANDARD"
  initially_suspended = true
}

resource snowflake_warehouse TEST_DSCI_WH {
  name = "TEST_DSCI_WH"
  warehouse_size = "Medium"
  max_cluster_count = 1
  min_cluster_count = 1
  auto_suspend = 600
  auto_resume = true
  enable_query_acceleration = false
  warehouse_type = "STANDARD"
  initially_suspended = true
}

resource snowflake_warehouse TEST_ELT_WH {
  name = "TEST_ELT_WH"
  warehouse_size = "Medium"
  max_cluster_count = 1
  min_cluster_count = 1
  auto_suspend = 600
  auto_resume = true
  enable_query_acceleration = false
  warehouse_type = "STANDARD"
  initially_suspended = true
}

resource snowflake_warehouse TEST_DEVOPS_WH {
  name = "TEST_DEVOPS_WH"
  warehouse_size = "Medium"
  max_cluster_count = 1
  min_cluster_count = 1
  auto_suspend = 600
  auto_resume = true
  enable_query_acceleration = false
  warehouse_type = "STANDARD"
  initially_suspended = true
}
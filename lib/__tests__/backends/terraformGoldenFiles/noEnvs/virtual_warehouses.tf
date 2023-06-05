resource snowflake_warehouse PROD_BI {
  name = "PROD_BI"
  warehouse_size = "X-Small"
  max_cluster_count = 10
  min_cluster_count = 2
  scaling_policy = "ECONOMY"
  auto_suspend = 18540
  auto_resume = false
  enable_query_acceleration = false
  warehouse_type = "STANDARD"
  statement_timeout_in_seconds = 3600
  resource_monitor = "FOO"
}

resource snowflake_warehouse PROD_DSCI {
  name = "PROD_DSCI"
  warehouse_size = "Medium"
  max_cluster_count = 1
  min_cluster_count = 1
  auto_suspend = 600
  auto_resume = true
  enable_query_acceleration = false
  warehouse_type = "STANDARD"
  initially_suspended = true
}

resource snowflake_warehouse PROD_ELT {
  name = "PROD_ELT"
  warehouse_size = "Medium"
  max_cluster_count = 1
  min_cluster_count = 1
  auto_suspend = 600
  auto_resume = true
  enable_query_acceleration = false
  warehouse_type = "STANDARD"
  initially_suspended = true
}
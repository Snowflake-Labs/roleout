resource snowflake_warehouse PROD_BI {
  name = "PROD_BI"
  warehouse_size = "XSMALL"
  initially_suspended = true
  max_cluster_count = 10
  min_cluster_count = 2
  scaling_policy = "ECONOMY"
  auto_suspend = 18540
  auto_resume = false
}

resource snowflake_warehouse PROD_DSCI {
  name = "PROD_DSCI"
  warehouse_size = "MEDIUM"
  initially_suspended = true
  max_cluster_count = 1
  min_cluster_count = 1
  auto_suspend = 600
  auto_resume = true
}

resource snowflake_warehouse PROD_ELT {
  name = "PROD_ELT"
  warehouse_size = "MEDIUM"
  initially_suspended = true
  max_cluster_count = 1
  min_cluster_count = 1
  auto_suspend = 600
  auto_resume = true
}
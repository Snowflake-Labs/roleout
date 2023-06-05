USE ROLE "SYSADMIN";

CREATE WAREHOUSE IF NOT EXISTS "PROD_BI" WITH INITIALLY_SUSPENDED = FALSE WAREHOUSE_SIZE = XSMALL;
ALTER WAREHOUSE "PROD_BI" SET
WAIT_FOR_COMPLETION = TRUE
WAREHOUSE_SIZE = XSMALL
MIN_CLUSTER_COUNT = 2
MAX_CLUSTER_COUNT = 10
SCALING_POLICY = ECONOMY
AUTO_SUSPEND = 18540
AUTO_RESUME = FALSE
ENABLE_QUERY_ACCELERATION = FALSE
STATEMENT_TIMEOUT_IN_SECONDS = 3600
RESOURCE_MONITOR = FOO
WAREHOUSE_TYPE = STANDARD;

CREATE WAREHOUSE IF NOT EXISTS "PROD_DSCI" WITH INITIALLY_SUSPENDED = TRUE WAREHOUSE_SIZE = MEDIUM;
ALTER WAREHOUSE "PROD_DSCI" SET
WAIT_FOR_COMPLETION = TRUE
WAREHOUSE_SIZE = MEDIUM
MIN_CLUSTER_COUNT = 1
MAX_CLUSTER_COUNT = 1
AUTO_SUSPEND = 600
AUTO_RESUME = TRUE
ENABLE_QUERY_ACCELERATION = FALSE
WAREHOUSE_TYPE = STANDARD;

CREATE WAREHOUSE IF NOT EXISTS "PROD_ELT" WITH INITIALLY_SUSPENDED = TRUE WAREHOUSE_SIZE = MEDIUM;
ALTER WAREHOUSE "PROD_ELT" SET
WAIT_FOR_COMPLETION = TRUE
WAREHOUSE_SIZE = MEDIUM
MIN_CLUSTER_COUNT = 1
MAX_CLUSTER_COUNT = 1
AUTO_SUSPEND = 600
AUTO_RESUME = TRUE
ENABLE_QUERY_ACCELERATION = FALSE
WAREHOUSE_TYPE = STANDARD;

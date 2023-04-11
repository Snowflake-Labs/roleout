terraform {
  required_providers {
    snowflake = {
      source = "Snowflake-Labs/snowflake"
      version = "0.55.1"
    }
  }
}

provider "snowflake" {
  role = "ACCOUNTADMIN"
}

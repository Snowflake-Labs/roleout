terraform {
  required_providers {
    snowflake = {
      source = "Snowflake-Labs/snowflake"
      version = "0.64.0"
    }
  }
}

provider "snowflake" {
  role = "ACCOUNTADMIN"
}

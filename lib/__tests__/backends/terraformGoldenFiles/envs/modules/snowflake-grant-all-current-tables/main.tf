
terraform {
  required_providers {
    snowflake = {
      source  = "snowflake-labs/snowflake"
      version = "0.55.1"
    }
  }
}

#
# Tables
#
data "snowflake_tables" "this" {
  database = var.database_name
  schema   = var.schema_name
}

locals {
  tables = toset([
  for table in coalesce(data.snowflake_tables.this.tables, []) :
  table.name
  ])
}

resource "snowflake_table_grant" "this" {
  for_each               = local.tables
  database_name          = var.database_name
  schema_name            = var.schema_name
  table_name             = each.value
  privilege              = var.privilege
  roles                  = var.roles
  enable_multiple_grants = var.enable_multiple_grants

  depends_on = [data.snowflake_tables.this]
}

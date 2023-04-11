
terraform {
  required_providers {
    snowflake = {
      source  = "snowflake-labs/snowflake"
      version = "0.55.1"
    }
  }
}

#
# File Formats
#
data "snowflake_file_formats" "this" {
  database = var.database_name
  schema   = var.schema_name
}

locals {
  file_formats = toset([
  for file_format in coalesce(data.snowflake_file_formats.this.file_formats, []) :
  file_format.name
  ])
}

resource "snowflake_file_format_grant" "this" {
  for_each               = local.file_formats
  database_name          = var.database_name
  schema_name            = var.schema_name
  file_format_name       = each.value
  privilege              = var.privilege
  roles                  = var.roles
  enable_multiple_grants = var.enable_multiple_grants

  depends_on = [data.snowflake_file_formats.this]
}

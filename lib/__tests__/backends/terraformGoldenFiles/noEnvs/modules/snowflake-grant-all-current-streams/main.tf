
terraform {
  required_providers {
    snowflake = {
      source  = "snowflake-labs/snowflake"
      version = "0.55.1"
    }
  }
}

#
# Stream
#
data "snowflake_streams" "this" {
  database = var.database_name
  schema   = var.schema_name
}

locals {
  streams = toset([
  for stream in coalesce(data.snowflake_streams.this.streams, []) :
  stream.name
  ])
}

resource "snowflake_stream_grant" "this" {
  for_each               = local.streams
  database_name          = var.database_name
  schema_name            = var.schema_name
  stream_name            = each.value
  privilege              = var.privilege
  roles                  = var.roles
  enable_multiple_grants = var.enable_multiple_grants

  depends_on = [data.snowflake_streams.this]
}


terraform {
  required_providers {
    snowflake = {
      source  = "snowflake-labs/snowflake"
      version = "0.55.1"
    }
  }
}

#
# Views
#
data "snowflake_views" "this" {
  database = var.database_name
  schema   = var.schema_name
}

locals {
  views = toset([
  for view in coalesce(data.snowflake_views.this.views, []) :
  view.name
  ])
}

resource "snowflake_view_grant" "this" {
  for_each               = local.views
  database_name          = var.database_name
  schema_name            = var.schema_name
  view_name              = each.value
  privilege              = var.privilege
  roles                  = var.roles
  enable_multiple_grants = var.enable_multiple_grants

  depends_on = [data.snowflake_views.this]
}

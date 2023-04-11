
terraform {
  required_providers {
    snowflake = {
      source  = "snowflake-labs/snowflake"
      version = "0.55.1"
    }
  }
}

#
# Stage
#
data "snowflake_stages" "this" {
  database = var.database_name
  schema   = var.schema_name
}

locals {
  stages = toset([
  for stage in coalesce(data.snowflake_stages.this.stages, []) :
  stage.name
  if upper(var.privilege) == "OWNERSHIP"
  ])
  
  external_stages = toset([
  for stage in coalesce(data.snowflake_stages.this.stages, []) :
  stage.name
  if stage.storage_integration != "" && upper(var.privilege) == "USAGE"
  ])

  internal_stages = toset([
  for stage in coalesce(data.snowflake_stages.this.stages, []) :
  stage.name
  if stage.storage_integration == "" && (upper(var.privilege) == "READ" || upper(var.privilege) == "WRITE")
  ])
}

resource "snowflake_stage_grant" "this" {
  for_each               = local.stages
  database_name          = var.database_name
  schema_name            = var.schema_name
  stage_name             = each.value
  privilege              = var.privilege
  roles                  = var.roles
  enable_multiple_grants = var.enable_multiple_grants

  depends_on = [data.snowflake_stages.this]
}

resource "snowflake_stage_grant" "external" {
  for_each               = local.external_stages
  database_name          = var.database_name
  schema_name            = var.schema_name
  stage_name             = each.value
  privilege              = var.privilege
  roles                  = var.roles
  enable_multiple_grants = var.enable_multiple_grants

  depends_on = [data.snowflake_stages.this]
}

resource "snowflake_stage_grant" "internal" {
  for_each               = local.internal_stages
  database_name          = var.database_name
  schema_name            = var.schema_name
  stage_name             = each.value
  privilege              = var.privilege
  roles                  = var.roles
  enable_multiple_grants = var.enable_multiple_grants

  depends_on = [data.snowflake_stages.this]
}

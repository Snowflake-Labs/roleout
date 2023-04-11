
#
# Task
#
terraform {
  required_providers {
    snowflake = {
      source  = "snowflake-labs/snowflake"
      version = "0.55.1"
    }
  }
}

data "snowflake_tasks" "this" {
  database = var.database_name
  schema   = var.schema_name
}

locals {
  tasks = toset([
    for task in coalesce(data.snowflake_tasks.this.tasks, []) :
  task.name
])
}

resource "snowflake_task_grant" "this" {
  for_each               = local.tasks
  database_name          = var.database_name
  schema_name            = var.schema_name
  task_name              = each.value
  privilege              = var.privilege
  roles                  = var.roles
  enable_multiple_grants = var.enable_multiple_grants

  depends_on = [data.snowflake_tasks.this]
}

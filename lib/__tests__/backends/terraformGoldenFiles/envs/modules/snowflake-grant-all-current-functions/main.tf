
terraform {
  required_providers {
    snowflake = {
      source  = "snowflake-labs/snowflake"
      version = "0.55.1"
    }
  }
}

#
# Functions
#
data "snowflake_functions" "this" {
  database = var.database_name
  schema   = var.schema_name
}

locals {
  function_names_list = tolist([
  for function in coalesce(data.snowflake_functions.this.functions, []) :
  function.name
  ])

  function_signatures_list = tolist([
  for function in coalesce(data.snowflake_functions.this.functions, []) :
  {
    argument_types = compact(function.argument_types),
    return_type    = function.return_type
  }
  ])

  functions = zipmap(local.function_names_list, local.function_signatures_list)
}

resource "snowflake_function_grant" "this" {
  for_each      = local.functions
  database_name = var.database_name
  schema_name   = var.schema_name
  function_name = each.key
  dynamic "arguments" {
    for_each = each.value["argument_types"]
    content {
      name = ""
      type = arguments.value
    }
  }
  return_type            = each.value["return_type"]
  privilege              = var.privilege
  roles                  = var.roles
  enable_multiple_grants = var.enable_multiple_grants

  depends_on = [data.snowflake_functions.this]
}

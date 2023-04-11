
terraform {
  required_providers {
    snowflake = {
      source  = "snowflake-labs/snowflake"
      version = "0.55.1"
    }
  }
}

#
# Procedures
#
data "snowflake_procedures" "this" {
  database = var.database_name
  schema   = var.schema_name
}

locals {
  procedure_names_list = tolist([
  for procedure in coalesce(data.snowflake_procedures.this.procedures, []) :
  procedure.name
  if procedure.name != "ASSOCIATE_SEMANTIC_CATEGORY_TAGS" && length(regexall("[$]+", procedure.name)) == 0
  ])

  procedure_signatures_list = tolist([
  for procedure in coalesce(data.snowflake_procedures.this.procedures, []) :
  {
    argument_types = compact(procedure.argument_types),
    return_type    = procedure.return_type
  }
  if procedure.name != "ASSOCIATE_SEMANTIC_CATEGORY_TAGS" && length(regexall("[$]+", procedure.name)) == 0
  ])

  procedures = zipmap(local.procedure_names_list, local.procedure_signatures_list)
}

resource "snowflake_procedure_grant" "this" {
  for_each       = local.procedures
  database_name  = var.database_name
  schema_name    = var.schema_name
  procedure_name = each.key
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

  depends_on = [data.snowflake_procedures.this]
}

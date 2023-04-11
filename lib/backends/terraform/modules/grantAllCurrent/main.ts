import {TERRAFORM_VERSION} from '../../terraformVersion'

export const mainFiles = new Map<string, string>(
  [['file-formats',
    `
terraform {
  required_providers {
    snowflake = {
      source  = "snowflake-labs/snowflake"
      version = "${TERRAFORM_VERSION}"
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
`],
    ['functions',
      `
terraform {
  required_providers {
    snowflake = {
      source  = "snowflake-labs/snowflake"
      version = "${TERRAFORM_VERSION}"
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
`],
    ['procedures',
      `
terraform {
  required_providers {
    snowflake = {
      source  = "snowflake-labs/snowflake"
      version = "${TERRAFORM_VERSION}"
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
`],
    ['sequences',
      `
terraform {
  required_providers {
    snowflake = {
      source  = "snowflake-labs/snowflake"
      version = "${TERRAFORM_VERSION}"
    }
  }
}

#
# Sequences
#
data "snowflake_sequences" "this" {
  database = var.database_name
  schema   = var.schema_name
}

locals {
  sequences = toset([
  for sequence in coalesce(data.snowflake_sequences.this.sequences, []) :
  sequence.name
  ])
}

resource "snowflake_sequence_grant" "this" {
  for_each               = local.sequences
  database_name          = var.database_name
  schema_name            = var.schema_name
  sequence_name          = each.value
  privilege              = var.privilege
  roles                  = var.roles
  enable_multiple_grants = var.enable_multiple_grants

  depends_on = [data.snowflake_sequences.this]
}
`
    ],
    ['stages',
      `
terraform {
  required_providers {
    snowflake = {
      source  = "snowflake-labs/snowflake"
      version = "${TERRAFORM_VERSION}"
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
`
    ],
    ['streams',
      `
terraform {
  required_providers {
    snowflake = {
      source  = "snowflake-labs/snowflake"
      version = "${TERRAFORM_VERSION}"
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
`
    ],
    ['tasks',
      `
#
# Task
#
terraform {
  required_providers {
    snowflake = {
      source  = "snowflake-labs/snowflake"
      version = "${TERRAFORM_VERSION}"
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
`],
    ['tables',
      `
terraform {
  required_providers {
    snowflake = {
      source  = "snowflake-labs/snowflake"
      version = "${TERRAFORM_VERSION}"
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
`
    ],
    ['views',
      `
terraform {
  required_providers {
    snowflake = {
      source  = "snowflake-labs/snowflake"
      version = "${TERRAFORM_VERSION}"
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
`
    ]])

export default mainFiles
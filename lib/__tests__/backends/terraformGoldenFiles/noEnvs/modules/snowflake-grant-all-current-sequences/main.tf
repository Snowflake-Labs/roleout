
terraform {
  required_providers {
    snowflake = {
      source  = "snowflake-labs/snowflake"
      version = "0.55.1"
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

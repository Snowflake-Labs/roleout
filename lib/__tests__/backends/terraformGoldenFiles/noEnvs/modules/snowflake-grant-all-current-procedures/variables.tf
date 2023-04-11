
variable "database_name" {
  type = string
}

variable "schema_name" {
  type = string
}

variable "privilege" {
  type = string
}

variable "roles" {
  type    = list(string)
  default = []
}

variable "enable_multiple_grants" {
  type    = bool
  default = false
}

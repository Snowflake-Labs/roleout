# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Added
* New Terraform import functionality
* New populateFromSnowflake command
* Virtual warehouse options for query acceleration, statement timeout, resource monitor, type, initially suspended

Changed
* Update to version 0.64.0 of Snowflake Terraform provider
* Use `on_all` Terraform grants instead of custom module

Fixed
* USERADMIN now owns roles
* Dependencies corrected for ownership grants in Terraform

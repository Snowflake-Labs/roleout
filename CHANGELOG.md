# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.1] - 2023-06-12
### Fixed
- Replaced erroneous "REVOKE CURRENT GRANTS" with "COPY CURRENT GRANTS" for object ownership grants in SQL file '04 - RBAC.sql'
- Added "IF EXISTS" to all "DROP ROLE" statements in SQL file 'teardown/04 - Teardown RBAC.sql'
- Moved the DROP commands for environment roles from 'teardown/04 - Teardown RBAC.sql' to 'teardown/05 - Teardown Setup.sql'
 
## [2.0.0] - 2023-05-31
### Added
- New Terraform import functionality allows importing existing objects in a Snowflake account into Terraform state.
- New populateFromSnowflake command will create/update a Roleout project with applicable objects from a Snowflake account
  (i.e. databases, schemas, virtual warehouses, roles)l
- Virtual warehouse options for query acceleration, statement timeout, resource monitor, type, initially suspended.

### Changed
- Update to version 0.64.0 of Snowflake Terraform provider. **NB** this is a potentially breaking change if you update
 a project from an earlier version of Roleout; the new version of the Terraform provider may or may not be fully compatible with any
 custom Terraform code you've created.
- Use `on_all` Terraform grants instead of custom module. **NB** this change requires that you follow [this migration guide](https://github.com/Snowflake-Labs/roleout/wiki/Migration)
  if you are updating from an earlier version of Roleout.

### Fixed
- USERADMIN now owns roles in Terraform.
- Dependencies corrected for ownership grants in Terraform.
- Renaming a database/schema would break Schema Object Groups with objects from that database/schema.

[2.0.1]: https://github.com/Snowflake-Labs/roleout/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/Snowflake-Labs/roleout/compare/v1.8.0...v2.0.0
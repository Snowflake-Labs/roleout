# Roleout

## Table of Contents

- [Legal](#legal)
- [Installation](#installation)
- [Concept](#concept)
- [Functionality](#functionality)
- [Usage](#usage)
- [CLI Usage](#cli-usage)
  - [Deployment](#generating-deployment-code)
  - [Loading Objects from Snowflake](#loading-objects-from-snowflake)
  - [Importing Objects to Terraform](#importing-existing-snowflake-objects-to-terraform)
- [Terraform Deployment](#terraform-deployment)
- [SQL Deployment](#sql-deployment)
- [Development](#development)

## Legal

This application is not part of the Snowflake Service and is governed by the terms in LICENSE, unless expressly
agreed to in writing. You use this application at your own risk, and Snowflake has no obligation to support your use of
this application.

## Installation

Download the appropriate installer/executable for your platform from
the [latest release page](https://github.com/Snowflake-Labs/roleout/releases/latest).

#### Windows

Download and run the `Roleout Setup x.x.x.exe` installer.

#### macOS

Download the `Roleout x.x.x.dmg` disk image and open it, then drag Roleout into the Applications folder. Because Roleout
is not code-signed, on macOS you will need to unquaratine the app before you can run it. Open a terminal and run
the following:

```shell
sudo xattr -r -d com.apple.quarantine /Applications/Roleout.app
```

#### Linux

Download the `Roleout x.x.x.AppImage` [AppImage](https://appimage.org/) file and run it. You can also build Roleout from
source.

## Concept

- Accelerate the Snowflake environment design and deployment process.
- Enable Infrastructure as Code for Snowflake environments with an easy-to-use interface.
- Automatically apply best practices where it matters. Be moderately opinionated about these implementation details
  while remaining flexible enough to support different use cases.
- Don't reinvent functionality that existing mature tools provide; integrate with those tools instead.

## Functionality

A central tenet Roleout follows is that your Snowflake infrastructure should
be declared in code. A
declarative [Infrastructure as Code](https://www.redhat.com/en/topics/automation/what-is-infrastructure-as-code-iac)
approach provides numerous benefits such as accelerating development, reducing errors, and improving consistency. To
that end,
Roleout defines your Snowflake project in a simple YAML file format and can generate deployment code in either SQL or
Terraform
based on that file. Currently Roleout allows you to define your desired databases, schemas, virtual warehouses,
functional roles,
and RBAC with schema-level access. These stateless account objects are well-suited to an IaC approach, while the
stateful objects
like tables should be created and managed with a database migration tool
like [Schemachange](https://github.com/Snowflake-Labs/schemachange).

Roleout generates deployment code for the following:

- Databases and schemas
- Virtual warehouses
- Functional roles
- RBAC hierarchy of access roles to implement schema-level and virtual warehouse access

## Usage

Run Roleout and work through each page in the sidebar to design your environment. Make sure to save your project file;
this is the YAML file that defines your whole Snowflake project and is used to generate deployment code. You should
commit
this file to source control and treat it as you would any other IaC tool's code.

### Environments

Decide what environments you want to provision if any, e.g. PROD, DEV, TEST. If you enable the environments feature,
Roleout
will generate a separate set of objects for each environment with the appropriate names. For example, with a PROD and
DEV
environment and a database called MAIN, Roleout would create deployment code for `PROD_MAIN_DB` and `DEV_MAIN_DB`.

With environments enabled you can design different access levels for each environment on the Access page.

If you do not enable the environments feature, Roleout will only generate deployment code for exactly the objects you
define.

### Databases, Schema, Virtual Warehouses

Simply use the editors in the GUI to enter your desired databases, schemas, and virtual warehouses. Roleout will
generate
deployment code for these with the following properties:

- Schemas will all be MANAGED ACCESS
- Virtual warehouses are currently set to MEDIUM size and other parameters are left to the defaults

### Schema Object Groups

Although not generally recommended, sometimes you might have a hard requirement to control access to individual tables and views, rather than at the schema level. Enable Schema Object Groups to create groups of tables and views across schemas and databases that should share an access level, and manage that access from the Access page.

On the "Schema Object Groups" page, you can create one or more groups. Clicking the group name will take you to the edit page
where you can add tables and views from one or more schemas across databases to the group.

### Functional Roles

Determine what groups of people and programs that will use Snowflake exist in your organization, and make functional
roles
for them. For example, many organizations would have roles like `ANALYST`, `DATA_SCIENTIST`, `ELT_TOOL`. Note that if
environments are enabled Roleout will generate a version of your functional roles for each environment,
e.g. `PROD_ANALYST_FR`.

### Access Control

On the Access page you can choose a level of access each functional role should have to each schema and virtual
warehouse
in each environment. Simply click in a cell to cycle through available access levels.

Roleout implements a layered access model which means that all access levels are grouped at the schema level,
so a given role will either have Read, ReadWrite, or Full access to all objects in a schema. That includes tables,
views,
functions, stages, streams, etc.

To consolidate the privileges for each access level on each schema and warehouse, Roleout generates "access roles".
These are roles
named like `PROD_DB_RAW_RW_AR` which have all the privileges that make up Read, ReadWrite, or Full access to a
schema/warehouse.
These access roles are then granted to the appropriate functional roles to implement the access control matrix you have
specified.

### Naming Convention

Roleout comes with a default naming convention for the various objects it creates, and you can tweak that convention to
your liking on the Naming Convention page.

## CLI Usage

### Generating Deployment Code

#### SQL

`roleout sql deploy -c my_config.yml -o output_dir`

#### Terraform

`roleout terraform deploy -c my_config.yml -o output_dir`

### Loading Objects from Snowflake
If you already have a Snowflake environment, you can use the CLI to load your existing databases, schemas, roles, and warehouses
into your Roleout project. To start a new Roleout project by loading those objects from your Snowflake account:
1) Setup your connection. roleout-cli will use the same environment variables for authentication as the Terraform provider,
  so follow [these Authentication instructions](https://registry.terraform.io/providers/Snowflake-Labs/snowflake/latest/docs#authentication)
  to export the appropriate environment variables. For example:
  ```
export SNOWFLAKE_USER="<your user>"
export SNOWFLAKE_PRIVATE_KEY_PATH="<your private key path>"
export SNOWFLAKE_ACCOUNT="<org-account>"
export SNOWFLAKE_WAREHOUSE="<your warehouse>"
export SNOWFLAKE_ROLE="ACCOUNTADMIN"
```
2) Run `roleout-cli snowflake populateProject -o 'Your New Project Name.yml'`

You can also update an existing Roleout project with objects from your Snowflake account like so:
`roleout-cli snowflake populateProject -c 'My Existing Project.yml' -o 'Your New Project Name.yml'`

### Importing Existing Snowflake Objects to Terraform

This command will run `terraform import` for all database, schema, virtual warehouse, and functional role resources in
your project.

`roleout terrform import -c my_config.yml `

To write the `terraform import` commands to a file rather than running them, use the `-o --output` flag.

## Terraform Deployment

If you are using Terraform as your deployment tool, you should select the Terraform deployment backend on the Deploy
page in Roleout and click the download button. This will save a .zip file of all the .tf files for your defined
Snowflake
resources.

You need to create a user in your Snowflake account that Terraform can connect with. This user needs to be
granted `ACCOUNTADMIN`
and will need access to a virtual warehouse where it will run SQL commands.

The `snowflake.tf` file will tell Terraform to install and use
the [Snowflake Terraform provider](https://registry.terraform.io/providers/Snowflake-Labs/snowflake).

Specify your Snowflake connection properties via environment variables as shown in
the [Snowflake provider documentation](https://registry.terraform.io/providers/Snowflake-Labs/snowflake/latest/docs)
or edit the `snowflake.tf` file to include them. For example:

```shell
export SNOWFLAKE_USER="TERRAFORM"
export SNOWFLAKE_PRIVATE_KEY_PATH="rsa_key.p8"
export SNOWFLAKE_ACCOUNT="<your account name>"
export SNOWFLAKE_WAREHOUSE="TERRAFORM_WH"
```

## SQL Deployment

For your convenience, shell scripts are provided in your deployment SQL files to automatically run the .sql scripts
against your Snowflake account. The `deploy.{sh,ps1}` and `teardown/teardown.{sh,ps1}` scripts use SnowSQL to run their
respective
.sql files in batch mode against the connection of your choice. The `.sh` scripts are suitable for Mac OS and Linux, and
the `.ps1` scripts are for Windows.

Example usages:

```./deploy.sh -c my_snowsql_connection```

```./teardown.ps1 -a ab12345.us-east-2.aws -u MY_USER```

### SQL Limitations

* If you delete objects or roles from your Roleout project, the SQL deployment .sql scripts do not drop or revoke
  anything
  from your Snowflake account.
  You will need to manually drop objects and roles in Snowflake after removing them in Roleout.
* Changing or revoking access in your Roleout project does not revoke that access in Snowflake. If you make changes to
  the
  access grants in Roleout, you should run the prior version of `teardown/01 - Teardown RBAC.sql` script to remove the
  old grants, and then run
  your new deployment .sql scripts as usual to put the new grants in place. Note that this process will result in a (
  short) period of time where the
  old grants have been deleted but the new grants are not yet in place.
* Databases and schemas cannot change from transient to non-transient or vice versa. You would need to manually drop and
  recreate the
  database/schema in order to change the transience.

## Development

1. Clone this repository
2. Install [Node.js](https://nodejs.org/en/download/) if you don't have it already. Recommend
   using [nvm](https://github.com/nvm-sh/nvm).
3. Install requirements:
    1. `$ npm install`

### Electron App

To run the Electron app in development, run `npm run start -w app`.

To build executables for your local platform, run `npm run package -w app`.

To build executables of the Electron app for all platforms,
run:

`npm exec electron-builder -w app -- --publish never --win --mac --linux`.


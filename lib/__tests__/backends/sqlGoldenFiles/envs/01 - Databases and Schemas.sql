--
-- PROD Environment
--

USE ROLE "PROD_SYSADMIN";
CREATE DATABASE IF NOT EXISTS "PROD_EXAMPLE_DB";
CREATE SCHEMA IF NOT EXISTS "PROD_EXAMPLE_DB"."COMMON" WITH MANAGED ACCESS;
CREATE TRANSIENT SCHEMA IF NOT EXISTS "PROD_EXAMPLE_DB"."RAW";
ALTER SCHEMA "PROD_EXAMPLE_DB"."RAW" SET DATA_RETENTION_TIME_IN_DAYS = 10;
CREATE DATABASE IF NOT EXISTS "PROD_SANDBOX_DB";
ALTER DATABASE "PROD_SANDBOX_DB" SET DATA_RETENTION_TIME_IN_DAYS = 10;

--
-- DEV Environment
--

USE ROLE "DEV_SYSADMIN";
CREATE DATABASE IF NOT EXISTS "DEV_EXAMPLE_DB";
CREATE SCHEMA IF NOT EXISTS "DEV_EXAMPLE_DB"."COMMON" WITH MANAGED ACCESS;
CREATE TRANSIENT SCHEMA IF NOT EXISTS "DEV_EXAMPLE_DB"."RAW" WITH MANAGED ACCESS;
ALTER SCHEMA "DEV_EXAMPLE_DB"."RAW" SET DATA_RETENTION_TIME_IN_DAYS = 0;
CREATE TRANSIENT DATABASE IF NOT EXISTS "DEV_SANDBOX_DB";
ALTER DATABASE "DEV_SANDBOX_DB" SET DATA_RETENTION_TIME_IN_DAYS = 0;

--
-- TEST Environment
--

USE ROLE "TEST_SYSADMIN";
CREATE DATABASE IF NOT EXISTS "TEST_EXAMPLE_DB";
CREATE SCHEMA IF NOT EXISTS "TEST_EXAMPLE_DB"."COMMON" WITH MANAGED ACCESS;
CREATE SCHEMA IF NOT EXISTS "TEST_EXAMPLE_DB"."RAW" WITH MANAGED ACCESS;
CREATE DATABASE IF NOT EXISTS "TEST_SANDBOX_DB";
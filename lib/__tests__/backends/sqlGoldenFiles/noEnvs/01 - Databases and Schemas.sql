USE ROLE "SYSADMIN";
CREATE DATABASE IF NOT EXISTS "PROD_DB";
ALTER DATABASE "PROD_DB" SET DATA_RETENTION_TIME_IN_DAYS = 90;
CREATE SCHEMA IF NOT EXISTS "PROD_DB"."COMMON" WITH MANAGED ACCESS;
CREATE TRANSIENT SCHEMA IF NOT EXISTS "PROD_DB"."RAW";
ALTER SCHEMA "PROD_DB"."RAW" SET DATA_RETENTION_TIME_IN_DAYS = 10;
CREATE TRANSIENT DATABASE IF NOT EXISTS "SANDBOX_DB";
ALTER DATABASE "SANDBOX_DB" SET DATA_RETENTION_TIME_IN_DAYS = 0;
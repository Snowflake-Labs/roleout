#!/bin/bash

set -e

if ! command -v snowsql &> /dev/null
then
    echo "It looks like SnowSQL is not installed. Please download and install SnowSQL, then re-run this command."
    echo "https://docs.snowflake.com/en/user-guide/snowsql.html"
    exit
fi

read -r -p "Are you sure you want to deploy your Snowflake account? [y/N] " response
case "$response" in
    [yY][eE][sS]|[yY])
        for FILE in $(dirname -- $0)/*.sql
        do
            CMD="snowsql -o exit_on_error=True -f '$FILE' "$@""
            echo $CMD
            /bin/bash -c "$CMD"
        done
        ;;
    *)
        exit
        ;;
esac
 
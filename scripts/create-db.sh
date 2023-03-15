#!/bin/bash
export PGPASSWORD=$POSTGRES_PASSWORD

initDB() {
  psql -h $POSTGRES_HOST -U $POSTGRES_USER -W -d postgres -c "CREATE DATABASE $POSTGRES_DB;" &&
    psql -h $POSTGRES_HOST -U $POSTGRES_USER -W -d $POSTGRES_DB -c "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";" &&
    echo "Init database $POSTGRES_DB successfully."
}

psql -h $POSTGRES_HOST -U $POSTGRES_USER -W -d postgres \
  -tc "SELECT 1 FROM pg_database WHERE datname = '$POSTGRES_DB';" | grep -q 1 && echo "Database $POSTGRES_DB already exists." || initDB

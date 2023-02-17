#!/bin/bash
    export PGPASSWORD=$TIMESCALE_PASSWORD

    initDB(){
      psql -h $TIMESCALE_HOST -U $TIMESCALE_USER -W -d $TIMESCALE_USER -c "CREATE DATABASE $TIMESCALE_DB;" && \
      psql -h $TIMESCALE_HOST -U $TIMESCALE_USER -W -d $TIMESCALE_DB -c "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";" && \
      echo "Init database $TIMESCALE_DB successfully."
    }
    
    psql -h $TIMESCALE_HOST -U $TIMESCALE_USER -W -d $TIMESCALE_USER \
    -tc "SELECT 1 FROM pg_database WHERE datname = '$TIMESCALE_DB';" | grep -q 1 && echo "Database $TIMESCALE_DB already exists." || initDB
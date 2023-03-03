#!/bin/bash
set -e
bash /app/scripts/wait.sh $POSTGRES_HOST:$POSTGRES_PORT -t 5

if ls ./dist/src/migrations/*.js &> /dev/null; then
  echo "Start running migrations."
  npx typeorm migration:run -d ./dist/ormconfig.js
else
  echo "No migration to run."
fi

if [ "$NODE_ENV" = "production" ]; then
  npm run start:prod
else
  npm run start:dev
fi

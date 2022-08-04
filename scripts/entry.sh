#!/bin/sh

sh /app/scripts/wait.sh $TIMESCALE_HOST:$TIMESCALE_PORT -t 0

if ls ./dist/migrations/*.js &> /dev/null; then
  echo "Start running migrations."
  npx typeorm migration:run
else
  echo "No migration to run."
fi

if [ "$NODE_ENV" = "production" ]; then
  npm run start:prod
else
  npm run start:dev
fi

/* eslint-disable @typescript-eslint/no-var-requires */
const { version } = require('../package.json');

module.exports = {
  version: version,
  postgres: {
    host: 'postgres',
    port: 5432,
    username: 'user',
    password: 'password',
    database: 'db',
    schema: 'public',
    synchronize: false,
  },

  mongo: {
    host: 'mongo',
    port: 27017,
    username: 'dev',
    password: 'dev',
    database: 'db',
  },

  server: {
    port: 3000,
  },

  port: {
    http: 3000,
  },

  redis: {
    host: 'redis',
    port: 6379,
    db: 0,
    password: '',
  },

};

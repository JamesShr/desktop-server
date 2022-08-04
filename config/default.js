/* eslint-disable @typescript-eslint/no-var-requires */
const { version } = require('../package.json');

module.exports = {
  version: version,
  timescale: {
    host: 'timescale-db',
    port: 5432,
    username: 'user',
    password: 'password',
    database: 'edge_ems',
    schema: 'public',
  },

  mongo: {
    host: 'mongo',
    port: 27017,
    username: 'dev',
    password: 'dev',
    database: 'edge_ems',
  },

  server: {
    port: 3000,
  },

  redis: {
    host: 'redis',
    port: 6379,
    db: 0,
    password: '',
  },

};

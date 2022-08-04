/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('config');
const path = require('path');

module.exports = {
  type: 'postgres',
  host: config.get('timescale.host'),
  port: config.get('timescale.port'),
  username: config.get('timescale.username'),
  password: config.get('timescale.password'),
  database: config.get('timescale.database'),
  schema: config.get('timescale.schema'),
  entities: [path.join(__dirname, '/dist/entities/*.entity.js')],
  migrations: [path.join(__dirname, '/dist/migrations/*.js')],
  logging: process.env.NODE_ENV === 'development',
};

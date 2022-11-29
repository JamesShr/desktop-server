import { DataSource } from 'typeorm';
import config from 'config';
import path from 'path';

const ormConfig = new DataSource({
  type: 'postgres',
  host: config.get('timescale.host'),
  port: config.get('timescale.port'),
  username: config.get('timescale.username'),
  password: config.get('timescale.password'),
  database: config.get('timescale.database'),
  schema: config.get('timescale.schema'),
  entities: [path.join(__dirname, '/src/entities/*.entity.js')],
  migrations: [path.join(__dirname, '/src/migrations/*.js')],
  logging: process.env.NODE_ENV === 'development',
  cache: {
    type: 'redis',
    options: {
      host: config.get('redis.host'),
      port: config.get('redis.port'),
      password: config.get('redis.password')
    },
    duration: 1000 * 60 * 60 * 24,
  },
});

export default ormConfig;

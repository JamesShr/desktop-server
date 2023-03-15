import { DataSource, DataSourceOptions } from 'typeorm';
import config from 'config';
import path from 'path';

const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: config.get('postgres.host'),
  port: config.get('postgres.port'),
  username: config.get('postgres.username'),
  password: config.get('postgres.password'),
  database: config.get('postgres.database'),
  schema: config.get('postgres.schema'),
  entities: [path.join(__dirname, '/src/entities/*.entity.js')],
  migrations: [path.join(__dirname, '/src/migrations/*.js')],
};

const dataSource = new DataSource(ormConfig);

export default dataSource;

import { DataSource, DataSourceOptions } from 'typeorm';
import config from 'config';
import path from 'path';

const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: config.get('timescale.host'),
  port: config.get('timescale.port'),
  username: config.get('timescale.username'),
  password: config.get('timescale.password'),
  database: config.get('timescale.database'),
  schema: config.get('timescale.schema'),
  migrations: [path.join(__dirname, '/src/migrations/*.js')],
};

const dataSource = new DataSource(ormConfig);

export default dataSource;

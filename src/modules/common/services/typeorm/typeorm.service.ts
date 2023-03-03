import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { createConnection, DataSource } from 'typeorm';
import config from 'config';
import path from 'path';

@Injectable()
export class TypeormService implements OnApplicationBootstrap {

  constructor() { }

  async onApplicationBootstrap() {
    const connection = new DataSource({
      type: 'postgres',
      host: config.get('postgres.host'),
      port: config.get('postgres.port'),
      username: config.get('postgres.username'),
      password: config.get('postgres.password'),
      database: config.get('postgres.database'),
      schema: config.get('postgres.schema'),
      entities: [path.join(__dirname, 'entities/*.entity.js')],
    });

    // const queryRunner = connection.createQueryRunner()
    // await queryRunner.connect()

  }
}
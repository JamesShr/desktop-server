import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { Connection, ObjectLiteral, QueryRunner, DataSource } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import dataSource from 'ormconfig';

@Injectable()
export class TypeormService implements OnApplicationBootstrap {
  private conn: DataSource;
  constructor(
    // @InjectConnection()
    // private connection: Connection,
  ) {
  }

  async onApplicationBootstrap() {
    this.conn = await dataSource.initialize();
  }

  async createTable(): Promise<void> {
    const queryRunner = this.conn.createQueryRunner();
    await queryRunner.connect();
    const dbNum = Date.now();

    const findDb = await queryRunner.query(`SELECT 1 FROM pg_database WHERE datname = 'test-db-${dbNum}'`);
    if (!findDb.length) {
      await queryRunner.query(`CREATE DATABASE "test-db-${dbNum}";`)
    }
    await this.conn.transaction(async (manager) => {
      Logger.log(`SELECT 1 FROM pg_database WHERE datname = 'test-db-${dbNum}'`)
      Logger.log(`CREATE DATABASE "test-db-${dbNum}";`)

      const findDb = await manager.query(`SELECT 1 FROM pg_database WHERE datname = 'test-db-${dbNum}'`);
      if (!findDb.length) {
        await manager.query(`CREATE DATABASE "test-db-${dbNum}";`)
      }
    });

    // const connection = await createConnection();
    // const dataSource = new DataSource({
    //   type: 'postgres',
    //   host: config.get('postgres.host'),
    //   port: config.get('postgres.port'),
    //   username: config.get('postgres.username'),
    //   password: config.get('postgres.password'),
    //   database: config.get('postgres.database'),
    //   schema: config.get('postgres.schema'),
    //   entities: [path.join(__dirname, 'entities/*.entity.js')],
    // });

    // const queryRunner = dataSource.createQueryRunner('master')
    // await queryRunner.connect()
    // await connection.transaction(async (manager) => {
    //   await manager.save(user);
    //   await manager.save(auth);
    // })
  }

  connection(): DataSource {
    return this.conn;
  }
}
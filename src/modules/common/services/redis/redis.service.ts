import { Injectable, Inject } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

import { REDIS_HOST, REDIS_PORT, REDIS_URL, REDIS_DB } from '@/config';
import { LOGGER_SERVICE, LoggerService } from '../logger/logger.service';

export const REDIS_SERVICE = Symbol('REDIS_SERVICE');

const connectConfig = {
  url: REDIS_URL,
  database: REDIS_DB,
};

@Injectable()
export class RedisService {
  private client: RedisClientType;

  constructor(
    @Inject(LOGGER_SERVICE)
    private readonly logger: LoggerService,
  ) {
    this.startRedis();
  }

  async startRedis(): Promise<void> {
    this.client = createClient(connectConfig);
    this.client.on('connect', () => {
      this.logger
        .system()
        .debug(`Connect to redis ${REDIS_HOST}:${REDIS_PORT} successfully.`, {
          label: 'redis',
          meta: { label: 'redis' },
        });
    });
    await this.client.connect();
  }

  async deleteManyJwtids(ids: number[]) {
    for (let id of ids) {
      const jwtIds = await this.client.scan(0, { MATCH: `userId:${id}:*` });
      if (jwtIds.keys.length > 0) {
        await this.client.del(jwtIds.keys);
      }
    }
  }

  getClient(): RedisClientType {
    return this.client;
  }
}

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
  private subClient: RedisClientType;

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
        .debug(`Connect to redis ${REDIS_HOST}:${REDIS_PORT} Successfully.`, {
          label: RedisService.name,
          meta: { label: RedisService.name }
        });
    });
    await this.client.connect();

    this.subClient = createClient(connectConfig);
    this.subClient.on('connect', () => {
      this.logger.system().debug(`Monitor expire key client connect to redis ${REDIS_HOST}:${REDIS_PORT} successfully.`,
        {
          label: RedisService.name,
          meta: { label: RedisService.name }
        });
      this.subClient.subscribe('__keyevent@' + connectConfig.database + '__:expired', () => {
        // console.log('subscribe expire topic');
        this.subClient.on('message', async (chan, msg) => {
          this.logger.system().debug(`expired : ${msg}`,
            {
              label: RedisService.name,
              meta: { label: RedisService.name }
            });
          // console.log('[expired]', msg);
          // this.notify.send({
          //   service: ServiceTable.KEY_EXPIRED,
          //   event: EventTable.KEY_EXPIRED,
          //   content: {
          //     key: msg,
          //   },
          //   value: 0
          // });

        })
      });
    });
    await this.subClient.connect();
  }

  getClient(): RedisClientType {
    return this.client;
  }
}

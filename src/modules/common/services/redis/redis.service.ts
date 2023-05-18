import { Injectable, Inject } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { from, interval, Subject } from 'rxjs';
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
  // private subClient: RedisClientType;
  private readonly expireSubject = new Subject<string>();

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
          meta: { label: RedisService.name },
        });
      this.client.configSet('notify-keyspace-events', 'Ex');
    });
    await this.client.connect();

    // this.subClient = createClient(connectConfig);
    const subscriber = this.client.duplicate();
    subscriber.on('error', (err) => console.error(err));
    await subscriber.connect();
    subscriber.on('connect', () => {
      this.logger
        .system()
        .debug(
          `Monitor expire key client connect to redis ${REDIS_HOST}:${REDIS_PORT} successfully.`,
          {
            label: RedisService.name,
            meta: { label: RedisService.name },
          },
        );
    });
    await subscriber.subscribe(
      '__keyevent@' + connectConfig.database + '__:expired',
      (message, channel) => {
        this.logger.system().debug(`expired : ${message}`, {
          label: RedisService.name,
          meta: { label: RedisService.name },
        });
        this.expireSubject.next(message);
      },
    );
  }

  getClient(): RedisClientType {
    return this.client;
  }

  getExpireSubject(): Subject<string> {
    return this.expireSubject;
  }
}

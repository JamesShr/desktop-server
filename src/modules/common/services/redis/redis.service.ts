import { Injectable, Inject, Logger } from '@nestjs/common';
import { Redis, RedisOptions } from 'ioredis';
import { Subject } from 'rxjs';
import {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_URL,
  REDIS_DB,
  REDIS_PASSWORD,
} from '@/config';
import { LOGGER_SERVICE, LoggerService } from '../logger/logger.service';

export const REDIS_SERVICE = Symbol('REDIS_SERVICE');

const connectConfig: RedisOptions = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD.length ? REDIS_PASSWORD : undefined,
  db: REDIS_DB,
};
@Injectable()
export class RedisService {
  private client: Redis;
  private sub: Redis;
  private readonly expireSubject = new Subject<string>();

  constructor(
    @Inject(LOGGER_SERVICE)
    private readonly logger: LoggerService,
  ) {
    this.startRedis();
  }

  async startRedis(): Promise<void> {
    this.client = new Redis(connectConfig);
    // await this.client.connect();
    this.sub = new Redis(connectConfig);
    // await this.sub.connect() ;
    this.client.on('connect', () => {
      this.logger
        .system()
        .debug(`Connect to redis ${REDIS_HOST}:${REDIS_PORT} Successfully.`, {
          label: RedisService.name,
          meta: { label: RedisService.name },
        });
    });
    this.client.config('SET', 'notify-keyspace-events', 'Ex');
    this.sub.subscribe(`__keyevent@0__:expired`);
    this.sub.on('message', (channel, message) => {
      this.logger.system().debug(`expired : ${message}`, {
        label: RedisService.name,
        meta: { label: RedisService.name },
      });
      this.expireSubject.next(message);
    });
  }

  getClient(): Redis {
    return this.client;
  }

  getExpireSubject(): Subject<string> {
    return this.expireSubject;
  }
}

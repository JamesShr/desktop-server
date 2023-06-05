import { Inject, Injectable } from '@nestjs/common';
import {
  RedisService,
  REDIS_SERVICE,
} from '@/modules/common/services/redis/redis.service';

export const QUEUE_SERVICE = Symbol('QUEUE_SERVICE');

export interface QueueService<INPUT, OUTPUT> {
  // addToJobQueue
  send(queueName: string, jobs: INPUT[]): Promise<void>;

  // getJob
  get(queueName: string): Promise<OUTPUT>;
}

@Injectable()
export class QueueServiceImpl<INPUT, OUTPUT>
  implements QueueService<INPUT, OUTPUT>
{
  public constructor(
    @Inject(REDIS_SERVICE)
    private readonly redisService: RedisService,
  ) {}

  public async send(queueName: string, jobs: INPUT[]): Promise<void> {
    // const payload =  jobs.map((conn) => JSON.stringify(conn));
    await Promise.all(
      jobs.map(async (conn) => {
        await this.redisService
          .getClient()
          .lpush(queueName, JSON.stringify(conn));
      }),
    );
  }

  public async get(queueName: string): Promise<OUTPUT> {
    const conn = await this.redisService.getClient().rpop(queueName);
    return JSON.parse(conn) as OUTPUT;
  }
}

import { Injectable, Inject } from '@nestjs/common';
import {
  QUEUE_SERVICE,
  QueueService,
} from '@/modules/common/services/queue/queue.service';

@Injectable()
export class BetaMqService {
    public constructor(
    @Inject(QUEUE_SERVICE)
    private readonly queueService: QueueService<any, any>,
  ) {}

  async messageQueueTest(): Promise<void> {
    await this.queueService.send('beta.messageQueueTest', [
      {
        queue: true,
        topic: 'beta.messageQueueTest',
        time: Date.now(),
      },
    ]);
  }
}

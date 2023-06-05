import { Injectable, Inject } from '@nestjs/common';
import {
  QUEUE_SERVICE,
  QueueService,
} from '@/modules/common/services/queue/queue.service';

@Injectable()
export class AlphaMqService {
  public constructor(
    @Inject(QUEUE_SERVICE)
    private readonly queueService: QueueService<any, any>,
  ) {}

  async messageQueueTest(): Promise<void> {
    await this.queueService.send('alpha.messageQueueTest', [
      {
        queue: true,
        topic: 'alpha.messageQueueTest',
        time: Date.now(),
      },
    ]);
  }
}

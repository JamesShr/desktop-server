import {
  Inject,
  Injectable,
  OnApplicationBootstrap,
  Logger,
} from '@nestjs/common';
import { from, interval, Subject } from 'rxjs';
import { catchError, concatMap, filter, map, tap } from 'rxjs/operators';
import { SubjectService } from '@/modules/common/interceptors/subjectService.interface';
import {
  QUEUE_SERVICE,
  QueueService,
} from '@/modules/common/services/queue/queue.service';
import {
  RxCatchErrorService,
  RX_CATCH_ERROR_SERVICE,
} from '@/modules/common/services/rxCatchError/rxCatchError.service';

export const ALPHA_MQ_SERVICE = Symbol('ALPHA_MQ_SERVICE');

export interface AlphaMqService extends SubjectService<any> {
  getSubject(): Subject<any>;
}

@Injectable()
export class AlphaMqServiceImpl
  implements OnApplicationBootstrap, AlphaMqService
{
  private subject: Subject<any>;
  public constructor(
    @Inject(RX_CATCH_ERROR_SERVICE)
    private readonly rxCatchErrorService: RxCatchErrorService,
    @Inject(QUEUE_SERVICE)
    private readonly queueService: QueueService<any, any>,
  ) {}

  public onApplicationBootstrap(): void {
    const jobInterval$ = interval(100);
    const recReport$ = jobInterval$.pipe(
      concatMap(() =>
        from(this.queueService.get('alpha.messageQueueTest')).pipe(
          filter((dto) => dto !== null),
          tap((dto) => this.emit(dto)),
          catchError((err) => this.rxCatchErrorService.catchError$(err)),
        ),
      ),
    );
    recReport$.subscribe(this.subject);
  }

  public getSubject(): Subject<any> {
    return this.subject;
  }

  private emit(dto: any): void {
    Logger.log('alpha.messageQueueTest');
    Logger.log(dto);
  }
}

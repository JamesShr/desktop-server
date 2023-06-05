import { Inject, Injectable } from '@nestjs/common';
import { empty, Observable } from 'rxjs';

import { LoggerService, LOGGER_SERVICE } from '@/modules/common/services/logger/logger.service';

export const RX_CATCH_ERROR_SERVICE = Symbol('RX_CATCH_ERROR_SERVICE');

export interface RxCatchErrorService {
  catchError$(err: Error, extra?: { [key: string]: any }): Observable<never>;
}

@Injectable()
export class RxCatchErrorServiceImpl implements RxCatchErrorService {
  public constructor(
    @Inject(LOGGER_SERVICE)
    private readonly logger: LoggerService,
  ) { }

  public catchError$(
    err: Error,
    extra?: { [key: string]: any },
  ): Observable<never> {
    if (typeof extra !== 'undefined') {
      this.logger.system().error(err.message, {
        ...extra,
        name: err.name,
        message: err.message,
        stack: err.stack,
      });
    } else {
      this.logger.system().error('rxCatchError', { error: err, stack: err.stack });
    }

    return empty();
  }
}

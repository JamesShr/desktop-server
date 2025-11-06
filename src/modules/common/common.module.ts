import { Module, Global } from '@nestjs/common';
import {
  LoggerServiceImpl,
  LOGGER_SERVICE,
} from '@/modules/common/services/logger/logger.service';
// import {
//   REDIS_SERVICE,
//   RedisService,
// } from '@/modules/common/services/redis/redis.service';
// import { TypeormService } from '@/modules/common/services/typeorm/typeorm.service';
// import {
//   QueueServiceImpl,
//   QUEUE_SERVICE,
// } from './services/queue/queue.service';
import {
  RX_CATCH_ERROR_SERVICE,
  RxCatchErrorServiceImpl,
} from './services/rxCatchError/rxCatchError.service';

const modules = [
  {
    provide: LOGGER_SERVICE,
    useClass: LoggerServiceImpl,
  },
  // {
  //   provide: REDIS_SERVICE,
  //   useClass: RedisService,
  // },
  // {
  //   provide: QUEUE_SERVICE,
  //   useClass: QueueServiceImpl,
  // },
  {
    provide: RX_CATCH_ERROR_SERVICE,
    useClass: RxCatchErrorServiceImpl,
  },
  // TypeormService,
];

@Global()
@Module({
  providers: modules,
  exports: modules,
})
export class CommonModule {}

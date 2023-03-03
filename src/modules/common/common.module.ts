import { Module, Global } from '@nestjs/common';
import {
  LoggerServiceImpl,
  LOGGER_SERVICE,
} from '@/modules/common/services/logger/logger.service';
import {
  REDIS_SERVICE,
  RedisService,
} from '@/modules/common/services/redis/redis.service';

const modules = [
  {
    provide: LOGGER_SERVICE,
    useClass: LoggerServiceImpl,
  },
  {
    provide: REDIS_SERVICE,
    useClass: RedisService,
  },
];

@Global()
@Module({
  providers: modules,
  exports: modules,
})
export class CommonModule { }

import { Module, Global } from '@nestjs/common';
import {
  LoggerServiceImpl,
  LOGGER_SERVICE,
} from '@/modules/common/logger/logger.service';

const modules = [
  {
    provide: LOGGER_SERVICE,
    useClass: LoggerServiceImpl,
  },
];

@Global()
@Module({
  providers: modules,
  exports: modules,
})
export class CommonModule {}

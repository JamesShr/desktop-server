import { Controller, Get, UseInterceptors, Post } from '@nestjs/common';
import { INFO_VERSION } from '@/config';
import { OkInterceptor } from '@/modules/common/interceptors/ok.interceptor';

type HealthCheck = {
  version: string;
};
@Controller()
@UseInterceptors(OkInterceptor)
export class AppController {
  constructor() {}

  @Get()
  healthCheck(): HealthCheck {
    return {
      version: INFO_VERSION,
    };
  }

  @Post()
  test(): void {
    return;
  }
}

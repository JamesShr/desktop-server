import { Controller, Get, UseInterceptors, Post } from '@nestjs/common';
import { INFO_VERSION } from '@/config';
import { OkInterceptor } from '@/modules/common/interceptors/ok.interceptor';
import { ApiTags } from "@nestjs/swagger";

type HealthCheck = {
  version: string;
};
@Controller()
@ApiTags('ping')
@UseInterceptors(OkInterceptor)
export class AppController {
  constructor() { }

  @Get()
  healthCheck(): HealthCheck {
    return {
      version: INFO_VERSION,
    };
  }
}

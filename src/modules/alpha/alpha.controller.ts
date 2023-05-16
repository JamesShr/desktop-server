import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AlphaService } from './alpha.service';
import { OkInterceptor } from '@/modules/common/interceptors/ok.interceptor';

@Controller('alpha')
@UseInterceptors(OkInterceptor)
export class AlphaController {
  constructor(private readonly alphaService: AlphaService) {}

  @Get('/rpc')
  async getHello() {
    return this.alphaService.rpcSend();
  }

  @Get('/rpc-async')
  async getHelloAsync() {
    return this.alphaService.rpcSendAsync();
  }

  @Get('/publish-event')
  async publishEvent() {
    this.alphaService.rpcEmit();
  }
}

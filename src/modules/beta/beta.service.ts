import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AlphaRpcService } from '../microservices/alpha/alpha.rpc';
import { AlphaMqService } from '../microservices/alpha/alpha.mq';

@Injectable()
export class BetaService {
  constructor(
    private readonly alphaRpcService: AlphaRpcService,
    private readonly alphaMqService: AlphaMqService,
  ) {}

  async rpcSend(): Promise<Observable<string>> {
    return this.alphaRpcService.rpcSend();
  }

  async rpcSendAsync(): Promise<Observable<string>> {
    return await this.alphaRpcService.rpcSendAsync();
  }

  async rpcEmit() {
    this.alphaRpcService.rpcEmit('alpha');
  }

  async mq() {
    this.alphaMqService.messageQueueTest();
  }
}

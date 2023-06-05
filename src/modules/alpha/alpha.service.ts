import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BetaRpcService } from '../microservices/beta/beta.rpc';
import { BetaMqService } from '../microservices/beta/beta.mq';

@Injectable()
export class AlphaService {
  constructor(
    private readonly betaRpcService: BetaRpcService,
    private readonly betaMqService: BetaMqService,
  ) {}

  async rpcSend(): Promise<string> {
    return (await this.betaRpcService.rpcSend()).toPromise();
  }

  async rpcSendAsync(): Promise<string> {
    return (await this.betaRpcService.rpcSendAsync()).toPromise();
  }

  async rpcEmit() {
    this.betaRpcService.rpcEmit('beta');
  }

  async mq() {
    this.betaMqService.messageQueueTest();
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class BetaRpcService {
  constructor(@Inject('beta') private client: ClientProxy) {}

  async rpcSend() {
    return this.client.send('beta.rpcSend', 'Progressive Coder');
  }

  async rpcSendAsync() {
    const message = await this.client.send(
      'beta.rpcSendAsync',
      'Progressive Coder',
    );
    return message;
  }

  async rpcEmit(service: string) {
    this.client.emit('rpcEmit', {
      service,
      method: 'rpcEmit',
      data: {
        bookName: 'The Way Of Kings',
        author: 'Brandon Sanderson',
      },
      timestamp: Date.now(),
    });
  }
}

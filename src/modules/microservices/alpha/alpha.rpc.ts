import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AlphaRpcService {
  constructor(@Inject('alpha') private client: ClientProxy) {}

  async rpcSend() {
    return this.client.send('alpha.rpcSend', 'Progressive Coder');
  }

  async rpcSendAsync() {
    const message = await this.client.send(
      'alpha.rpcSendAsync',
      'Progressive Coder',
    );
    return message;
  }

  async rpcEmit(service:string) {
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

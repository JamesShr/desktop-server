import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, EventPattern } from '@nestjs/microservices';

@Controller()
export class AlphaRpcController {

  @MessagePattern('alpha.rpcSend')
  getGreetingMessage(name: string): string {
    console.log('alpha.rpcSend');
    return `Hello ${name}`;
  }

  @MessagePattern('alpha.rpcSendAsync')
  async getGreetingMessageAysnc(name: string): Promise<string> {
    console.log('alpha.rpcSendAsync');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Hello ${name} Async`);
      }, 1000);
    });
  }

  @EventPattern('rpcEmit')
  async handleBookCreatedEvent(data: Record<string, unknown>) {
    console.log('alpha.rpcEmit');
    console.log(data);
  }
}

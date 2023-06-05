import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, EventPattern } from '@nestjs/microservices';

@Controller()
export class BetaRpcController {
  @MessagePattern('beta.rpcSend')
  getGreetingMessage(name: string): string {
    console.log('beta.rpcSend');
    return `Hello ${name}`;
  }

  @MessagePattern('beta.rpcSendAsync')
  async getGreetingMessageAysnc(name: string): Promise<string> {
    console.log('beta.rpcSendAsync');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Hello ${name} Async`);
      }, 1000);
    });
  }

  @EventPattern('rpcEmit')
  async handleBookCreatedEvent(data: Record<string, unknown>) {
    console.log('beta.rpcEmit');
    console.log(data);
  }
}

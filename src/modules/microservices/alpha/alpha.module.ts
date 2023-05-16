import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { REDIS_HOST, REDIS_PORT } from '@/config';
import { AlphaRpcService } from './alpha.rpc';
import { AlphaMqService } from './alpha.mq';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'alpha',
        transport: Transport.REDIS,
        options: {
          host: REDIS_HOST,
          port: REDIS_PORT,
        },
      },
    ]),
  ],
  providers: [AlphaRpcService, AlphaMqService],
  exports: [AlphaRpcService, AlphaMqService],
})
export class AlphaModule {}

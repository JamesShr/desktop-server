import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { REDIS_HOST, REDIS_PORT } from '@/config';
import { BetaRpcService } from './beta.rpc';
import { BetaMqService } from './beta.mq';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'beta',
        transport: Transport.REDIS,
        options: {
          host: REDIS_HOST,
          port: REDIS_PORT,
        },
      },
    ]),
  ],
  providers: [BetaRpcService, BetaMqService],
  exports: [BetaRpcService, BetaMqService],
})
export class BetaModule {}

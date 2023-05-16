import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { REDIS_HOST, REDIS_PORT } from '@/config';
import { BetaRpcService } from './beta.rpc';

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
  providers: [BetaRpcService],
  exports: [BetaRpcService],
})
export class BetaModule {}

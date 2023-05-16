import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { REDIS_HOST, REDIS_PORT } from '@/config';
import { AlphaRpcService } from './alpha.rpc';

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
  providers: [AlphaRpcService],
  exports: [AlphaRpcService],
})
export class AlphaModule {}

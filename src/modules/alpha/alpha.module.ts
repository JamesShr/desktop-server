import { Module } from '@nestjs/common';
import { AlphaController } from './alpha.controller';
import { AlphaService } from './alpha.service';
import { AlphaRpcController } from './alpha.rpc';

@Module({
  controllers: [AlphaController, AlphaRpcController],
  providers: [AlphaService],
})
export class AlphaModule {}

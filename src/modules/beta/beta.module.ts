import { Module } from '@nestjs/common';
import { BetaService } from './beta.service';
import { BetaController } from './beta.controller';
import { BetaRpcController } from './beta.rpc';

@Module({
  providers: [BetaService],
  controllers: [BetaController, BetaRpcController],
})
export class BetaModule {}

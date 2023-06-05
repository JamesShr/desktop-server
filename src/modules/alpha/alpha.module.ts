import { Module } from '@nestjs/common';
import { AlphaController } from './alpha.controller';
import { AlphaService } from './alpha.service';
import { AlphaRpcController } from './alpha.rpc';
import { BetaModule } from '@/modules/microservices/beta/beta.module';
import { AlphaMqServiceImpl } from './alpha.mq';
@Module({
  imports: [BetaModule],
  controllers: [AlphaController, AlphaRpcController],
  providers: [AlphaService, AlphaMqServiceImpl],
})
export class AlphaModule {}

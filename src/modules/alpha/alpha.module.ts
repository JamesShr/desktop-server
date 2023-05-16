import { Module } from '@nestjs/common';
import { AlphaController } from './alpha.controller';
import { AlphaService } from './alpha.service';
import { AlphaRpcController } from './alpha.rpc';
import { BetaModule } from '@/modules/microservices/beta/beta.module';

@Module({
  imports: [BetaModule],
  controllers: [AlphaController, AlphaRpcController],
  providers: [AlphaService],
})
export class AlphaModule {}

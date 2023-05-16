import { Module } from '@nestjs/common';
import { BetaService } from './beta.service';
import { BetaController } from './beta.controller';
import { BetaRpcController } from './beta.rpc';
import { AlphaModule } from '@/modules/microservices/alpha/alpha.module';

@Module({
  imports: [AlphaModule],
  providers: [BetaService],
  controllers: [BetaController, BetaRpcController],
})
export class BetaModule {}

import { Module } from '@nestjs/common';
import { AlphaModule } from '@/modules/microservices/alpha/alpha.module';
import { BetaModule } from '@/modules/microservices/beta/beta.module';

@Module({
  imports: [AlphaModule, BetaModule],
})
export class MicroservicesModule {}

import { Module } from '@nestjs/common';
import { AlphaModule } from '../alpha/alpha.module';
import { BetaModule } from '../beta/beta.module';

@Module({
  imports: [AlphaModule, BetaModule],
})
export class MicroservicesModule {}

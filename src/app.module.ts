import { Module } from '@nestjs/common';
// import { ormConfig } from '@/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@/app.controller';
import { CommonModule } from '@/modules/common/common.module';

// import { AlphaModule } from './modules/alpha/alpha.module';
// import { BetaModule } from './modules/beta/beta.module';
// import { MicroservicesModule } from './modules/microservices/microservices.module';
import { SnmpModule } from './modules/snmp/snmp.module';
import { IpModule } from './modules/ip/ip.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot(ormConfig),
    CommonModule,
    SnmpModule,
    IpModule,
    // MicroservicesModule,
    // AlphaModule,
    // BetaModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

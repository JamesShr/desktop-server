import { Module } from '@nestjs/common';
import { ormConfig } from '@/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@/app.controller';
import { CommonModule } from '@/modules/common/common.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    CommonModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }

import { NestFactory } from '@nestjs/core';
import morgan from 'morgan';
import { AppModule } from '@/app.module';
import { PORT_HTTP, INFO_VERSION, REDIS_URL } from '@/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  LoggerService,
  LOGGER_SERVICE,
} from '@/modules/common/services/logger/logger.service';
import { HttpExceptionFilter } from '@/modules/common/exceptions/httpException.filter';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { INestApplication } from '@nestjs/common';
import {initMorgan} from './utils/morgan';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule, {
    cors: true,
  });
  const logger = app.get<LoggerService>(LOGGER_SERVICE);

  app.useGlobalFilters(new HttpExceptionFilter());
  initMorgan(app,logger);

  const config = new DocumentBuilder()
    .setTitle('General Api Gateway')
    .setDescription('General Api Gateway API documentation')
    .setVersion(INFO_VERSION)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/document', app, document);
  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: REDIS_URL,
    },
  });
  await app.startAllMicroservices();
  await app.listen(PORT_HTTP, () => {
    logger.system().info(`service listen on port ${PORT_HTTP}`, {
      label: 'Bootstrap',
      meta: { label: 'Bootstrap' },
    });
  });
}

bootstrap();

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

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new HttpExceptionFilter());

  const logger = app.get<LoggerService>(LOGGER_SERVICE);
  morgan.token('json', (req: any, res: any) =>
    JSON.stringify({
      method: req.method,
      url: req.url,
      reqbody: req.body,
      statusCode: res.statusCode,
      resBody: res.body,
      pid: process.pid,
      ip: req.connection.remoteAddress,
      user: req.user,
      inputTraffic: req.socket.bytesRead,
      outputTraffic: req.socket.bytesWritten,
    }),
  );
  app.use(
    morgan((tokens, req, res) => tokens.json(req, res), {
      skip: (req, res) => res.statusCode >= 400,
      stream: {
        write: (text: string) => {
          const log = text.replace(/\n$/, '');
          const json = JSON.parse(log);
          if (json.reqbody.password) {
            json.reqbody.password = '*****';
          }
          logger.system().http({
            level: 'http',
            message: `${json.method} ${json.url} ${json.statusCode}`,
            ...json,
          });
        },
      },
    }),
  );
  app.use(
    morgan((tokens, req, res) => tokens.json(req, res), {
      skip: (req, res) => res.statusCode < 400,
      stream: {
        write: (text: string) => {
          const log = text.replace(/\n$/, '');
          const json = JSON.parse(log);
          if (json.reqbody.password) {
            json.reqbody.password = '*****';
          }
          logger.system().error({
            level: 'error',
            message: `${json.method} ${json.url} ${json.statusCode}`,
            ...json,
          });
        },
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Server Template')
    .setDescription('Server Template API documentation')
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
    logger.system().info(`server listen on port ${PORT_HTTP}`, {
      label: 'Bootstrap',
      meta: { label: 'Bootstrap' },
    });
  });
}

bootstrap();

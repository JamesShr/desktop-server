import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as morgan from 'morgan';
import { AppModule } from '@/app.module';
import { SERVER_PORT, INFO_VERSION } from '@/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoggerService, LOGGER_SERVICE } from '@/modules/common/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const logger = app.get<LoggerService>(LOGGER_SERVICE);
  morgan.token('json', (req: any, res: any) => JSON.stringify({
    method: req.method,
    url: req.url,
    reqbody: req.body,
    statusCode: res.statusCode,
    resBody: res.body,
    pid: process.pid,
    ip: req.connection.remoteAddress,
    user: req.user
  }));
  app.use(
    morgan((tokens, req, res) => tokens.json(req, res), {
      skip: (req, res) => res.statusCode >= 400,
      stream: {
        write: (text: string) => {
          const log = text.replace(/\n$/, '');
          const json = JSON.parse(log);
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
    .setVersion(INFO_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/document', app, document);

  await app.listen(SERVER_PORT, () => {
    logger.system().info(`server listen on port ${SERVER_PORT}`,
      { label: 'Bootstrap', meta: { label: 'Bootstrap' } });
  });
}

bootstrap();

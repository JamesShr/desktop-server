import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as morgan from 'morgan';
import { AppModule } from '@/app.module';
import { SERVER_PORT, INFO_VERSION } from '@/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(
    morgan('dev', {
      skip: (req, res) => res.statusCode >= 400,
      stream: {
        write: (text: string) => {
          Logger.log(text.replace(/\n$/, ''));
        },
      },
    }),
  );
  app.use(
    morgan('dev', {
      skip: (req, res) => res.statusCode < 400,
      stream: {
        write: (text: string) => {
          Logger.log(text.replace(/\n$/, ''));
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
    Logger.log(`server listen on port ${SERVER_PORT}`);
  });
}

bootstrap();

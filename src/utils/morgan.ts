import morgan from 'morgan';
import { INestApplication } from '@nestjs/common';
import { LoggerService } from '@/modules/common/services/logger/logger.service';

export function initMorgan(
  app: INestApplication,
  logger: LoggerService,
): INestApplication {
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
          if (json.reqbody) {
            if (json.reqbody.password) {
              json.reqbody.password = '*****';
            }
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
          if (json.reqbody) {
            if (json.reqbody.password) {
              json.reqbody.password = '*****';
            }
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
  return app;
}

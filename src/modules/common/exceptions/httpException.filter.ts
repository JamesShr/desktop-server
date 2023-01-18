import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { errorCodeMessage } from '@/utils/errorCodeMessage';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const timestamp = new Date().getTime();

    const responseObject = {
      code: status,
      error: errorCodeMessage(status),
      message: exception.response.message,
      timestamp,
      // ...exception
    };
    response.status(status).json(responseObject);
  }
}

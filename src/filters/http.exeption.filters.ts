import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const res = exception.getResponse();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      isSuccess: 'false',
      timestamp: new Date().toISOString(),
      path: request.url,
      error: res,
    });
  }
}

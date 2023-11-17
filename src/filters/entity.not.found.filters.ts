import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Response } from 'express';

/**
 * Custom exception filter to convert EntityNotFoundError from TypeOrm to NestJs responses
 * @see also @https://docs.nestjs.com/exception-filters
 */
@Catch(EntityNotFoundError, Error)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const res = exception.getResponse();

    return response.status(status).json({
      statusCode: status,
      isSuccess: 'false',
      timestamp: new Date().toISOString(),
      error: res,
    });
  }
}

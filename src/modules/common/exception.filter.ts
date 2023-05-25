import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errorResponse: any = exception.getResponse();
    let message = exception.message;
    if (errorResponse?.message?.length) {
      message = errorResponse?.message?.reduce(
        (str: string, msg: string, i: number, arr: string[]) =>
          str + msg + (i !== arr?.length - 1 ? ', ' : ''),
        '',
      );
    }

    response.status(status).json({
      status: false,
      message,
    });
  }
}

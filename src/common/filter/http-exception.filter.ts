import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { ApiException } from '../exception/api.exception';
import * as moment from 'moment';

export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception: HttpException, host: ArgumentsHost): any {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    if (exception instanceof ApiException) {

      response.status(200).json({
        code: exception.getErrorCode(),
        message: exception.getErrorMessage(),
        data: {},
        timestamp: moment().format('X'),
      });

    } else {

      response.status(200).json({
        code: 50000,
        message: exception.message,
        data: {},
        timestamp: moment().format('X'),
      });
    }
  }
}

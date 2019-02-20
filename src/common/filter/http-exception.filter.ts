import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { ApiException } from '../exception/api.exception';
import { ApiErrorCode } from '../enums/api-error-code.enum';
import * as moment from 'moment';

export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception: HttpException, host: ArgumentsHost): any {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof ApiException) {

      response.status(200).json({
        code: exception.getErrorCode(),
        message: exception.getErrorMessage(),
        data: {},
        timestamp: Number(moment().format('X')),
      });

    } else {

      const statusCode = exception.getStatus();

      if (statusCode === 404) {

        response.status(200).json({
          code: ApiErrorCode.API_ROUTE_NOT_FOUND,
          message: '该接口不存在',
          data: {},
          timestamp: Number(moment().format('X')),
        });

      } else {

        response.status(200).json({
          code: ApiErrorCode.API_BAD_GATEWAY,
          message: exception.message,
          data: {},
          timestamp: Number(moment().format('X')),
        });
      }
    }
  }
}

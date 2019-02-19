import { Injectable, NestInterceptor, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Response } from '../interface/response.interface';
import { ApiErrorCode } from '../enums/api-error-code.enum';
import { ApiException } from '../exception/api.exception';
import * as moment from 'moment';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, call$: Observable<T>): Observable<Response<T>> | Promise<Observable<Response<T>>> {
    return call$.pipe(map(data => ({
      code: 0,
      data,
      message: 'success',
      timestamp: Number(moment().format('X')),
    }))/*, catchError(err => throwError(new ApiException('操作失败', ApiErrorCode.API_BAD_GATEWAY, 200)))*/);
  }
}

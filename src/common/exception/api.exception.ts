import { HttpException } from '@nestjs/common';
import { ApiErrorCode } from '../enums/api-error-code.enum';

export class ApiException extends HttpException {

  private readonly errorMessage: string;
  private readonly errorCode: ApiErrorCode;

  constructor(errorMessage: string, errorcode = ApiErrorCode.API_BAD_GATEWAY, statusCode = 200) {
    super(errorMessage, statusCode);
    this.errorMessage = errorMessage;
    this.errorCode = errorcode;
  }

  getErrorCode(): ApiErrorCode {
    return this.errorCode;
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
}

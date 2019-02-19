import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiException } from './common/exception/api.exception';
import { ApiErrorCode } from './common/enums/api-error-code.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello() {
    // throw new Error();
    // throw new ApiException('用户名错误');
    // return this.appService.getHello();

    return [];
  }
}

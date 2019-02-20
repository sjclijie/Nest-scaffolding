import { Controller, Get, HttpService } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiException } from './common/exception/api.exception';
import { ApiErrorCode } from './common/enums/api-error-code.enum';
import { timeInterval } from 'rxjs/operators';
import { ConfigService } from './config/config.service';
import { map } from 'rxjs/operators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private configService: ConfigService, private readonly httpService: HttpService) {
  }

  @Get()
  async getHello() {
    // throw new Error();
    // throw new ApiException('用户名错误');
    // return this.appService.getHello();

    console.log(3);

    console.log(this.configService);

    const result = await (this.httpService.get('http://api.fnxy.net.cn/v1/hello').toPromise());

    console.log(result.data);

    return result.data;
  }
}

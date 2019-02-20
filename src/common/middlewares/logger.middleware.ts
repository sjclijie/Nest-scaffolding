import { NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import { Logger } from '@nestjs/common';

export class LoggerMiddleware implements NestMiddleware {
  resolve(...args: any[]): MiddlewareFunction | Promise<MiddlewareFunction> {
    return (req, res, next) => {

      let start = +new Date();

      console.log(1);

      next();

      console.log(2);

      let logObj = {
        method: req.method,
        url: req.originalUrl,
        uuid: req.headers['x-uuid'] || '-',
        ua: req.headers['user-agent'] || '-',
        remoteAddr: req.headers['x-forwarded-for'] || req.ip || req.ips || '-',
        referer: req.headers.referer || '-',
        requestBody: req.body || {},
        time: `${+new Date() - start}ms`,
      };

      Logger.log(JSON.stringify(logObj));
    };
  }
}

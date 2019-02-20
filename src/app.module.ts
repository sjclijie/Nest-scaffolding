import { Module, NestModule, MiddlewareConsumer, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

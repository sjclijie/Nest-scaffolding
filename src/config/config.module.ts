import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import * as path from 'path';

@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(path.join(__dirname, '../', `env/${process.env.NODE_ENV}.env`)),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {
}

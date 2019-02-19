import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from 'joi';

export interface EnvConfig {
  [prop: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
    console.log('ConfigService constructor ... ', this.envConfig);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {

    const envConfigSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string().valid(['development', 'production', 'test']),
      PORT: Joi.number().default(8088),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(envConfig, envConfigSchema);

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedEnvConfig;
  }

  get port(): number {
    return Number(this.envConfig.PORT);
  }
}

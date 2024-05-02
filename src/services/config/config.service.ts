import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';

import { IConfigService } from './config.service.interface';
import { injectKeys } from '../../shared/constants/injectKeys';
import { ILoggerService } from '../logger/logger.interface';

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;
  constructor(@inject(injectKeys.ILoggerService) private loggerService: ILoggerService) {
    const result: DotenvConfigOutput = config();
    if (result.error) {
      this.loggerService.error('[ConfigService] Can not read .env');
    } else {
      this.loggerService.info('[ConfigService] The configuration of .env has been loaded');
      this.config = result.parsed as DotenvParseOutput;
    }
  }

  get(key: string): string {
    return this.config[key];
  }
}

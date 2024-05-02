import { inject, injectable } from 'inversify';
import mongoose from 'mongoose';

import { injectKeys } from '../../shared/constants/injectKeys';
import { IConfigService } from '../config/config.service.interface';
import { ILoggerService } from '../logger/logger.interface';

@injectable()
export class DatabaseService implements DatabaseService {
  constructor(
    @inject(injectKeys.IConfigService) private configService: IConfigService,
    @inject(injectKeys.ILoggerService) private loggerService: ILoggerService,
  ) {}

  async connect(): Promise<void> {
    mongoose
      .connect(this.configService.get('DATABASE'))
      .then(() => {
        this.loggerService.info('[Database] Connected');
      })
      .catch((err) => {
        this.loggerService.error(`[Database] Connected ${err.message}`);
      });
  }

  async disconnect(): Promise<void> {
    mongoose
      .disconnect()
      .then(() => {
        this.loggerService.info('[Database] Disconnected');
      })
      .catch((err) => {
        this.loggerService.error(`[Database] Disconnected ${err.message}`);
      });
  }
}

import { inject, injectable } from 'inversify';
import express, { Express, json } from 'express';
import { Server } from 'http';
import morgan from 'morgan';
import { injectKeys } from './constants/injectKeys';
import { IConfigService } from './services/config/config.service.interface';
import { ILoggerService } from './services/logger/logger.interface';

@injectable()
export class App {
  app: Express;
  server: Server;
  port: string;

  constructor(
    @inject(injectKeys.ILoggerService) private logger: ILoggerService,
    @inject(injectKeys.IConfigService) private config: IConfigService,
  ) {
    this.app = express();
    this.port = this.config.get('PORT');
  }

  useMiddleWares(): void {
    this.app.use(json());
    this.app.use(morgan('dev'));
  }

  startServer(): void {
    this.server = this.app.listen(this.port, () => {
      this.logger.info(`The server has been running on http://localhost:${this.port}`);
    });
  }

  closeServer(): void {
    this.server.close();
  }

  async init(): Promise<void> {
    this.useMiddleWares();
    this.startServer();
  }
}
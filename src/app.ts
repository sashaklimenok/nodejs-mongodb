import { inject, injectable } from 'inversify';
import express, { Express, json } from 'express';
import { Server } from 'http';
import morgan from 'morgan';
import { injectKeys } from './shared/constants/injectKeys';
import { IConfigService } from './services/config/config.service.interface';
import { ILoggerService } from './services/logger/logger.interface';
import { IAuthController } from './modules/auth/controller/auth.controller.interface';
import { notFoundMiddleware } from './shared/middlewares/not-found.middleware';
import { IExceptionFilter } from './shared/exception-filter/exception.filter.interface';
import { IDatabaseService } from './services/database/database.interface';

@injectable()
export class App {
  app: Express;
  server: Server;
  port: string;

  constructor(
    @inject(injectKeys.ILoggerService) private logger: ILoggerService,
    @inject(injectKeys.IConfigService) private config: IConfigService,
    @inject(injectKeys.IAuthController) private authController: IAuthController,
    @inject(injectKeys.IExceptionFilter) private exceptionFilter: IExceptionFilter,
    @inject(injectKeys.IDatabaseService) private databaseService: IDatabaseService,
  ) {
    this.app = express();
    this.port = this.config.get('PORT');
  }

  useMiddleWares(): void {
    this.app.use(json());
    this.app.use(morgan('dev'));
  }

  useExceptionFilters(): void {
    this.app.use(this.exceptionFilter.catch);
  }

  useControllers(): void {
    this.app.use('/api/v1/auth', this.authController.router);
    this.app.use(notFoundMiddleware);
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
    await this.databaseService.connect();
    this.useMiddleWares();
    this.useControllers();
    this.useExceptionFilters();
    this.startServer();
  }
}

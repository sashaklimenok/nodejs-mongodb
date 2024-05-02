import 'reflect-metadata';

import { Container, ContainerModule } from 'inversify';
import { App } from './app';
import { injectKeys } from './shared/constants/injectKeys';
import { LoggerService } from './services/logger/logger.service';
import { ConfigService } from './services/config/config.service';
import { AuthController } from './modules/auth/controller/auth.controller';
import { ExceptionFilter } from './shared/exception-filter/exception.filter';
import { ILoggerService } from './services/logger/logger.interface';
import { IConfigService } from './services/config/config.service.interface';
import { IExceptionFilter } from './shared/exception-filter/exception.filter.interface';
import { IAuthController } from './modules/auth/controller/auth.controller.interface';
import { IAuthService } from './modules/auth/service/auth.service.interface';
import { AuthService } from './modules/auth/service/auth.service';
import { IDatabaseService } from './services/database/database.interface';
import { DatabaseService } from './services/database/database.service';

const compositionRoot = new ContainerModule((bind) => {
  bind<App>(injectKeys.Application).to(App);
  bind<ILoggerService>(injectKeys.ILoggerService).to(LoggerService);
  bind<IConfigService>(injectKeys.IConfigService).to(ConfigService);
  bind<IExceptionFilter>(injectKeys.IExceptionFilter).to(ExceptionFilter);
  bind<IDatabaseService>(injectKeys.IDatabaseService).to(DatabaseService);

  // Auth Module
  bind<IAuthController>(injectKeys.IAuthController).to(AuthController);
  bind<IAuthService>(injectKeys.IAuthService).to(AuthService);
});

const bootstrap = (): { appContainer: Container; app: App } => {
  const appContainer = new Container();
  appContainer.load(compositionRoot);

  const app = appContainer.get<App>(injectKeys.Application);
  app.init();

  return { appContainer, app };
};

export const { appContainer, app } = bootstrap();

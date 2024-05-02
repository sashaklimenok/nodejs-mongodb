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
import { IUserService } from './modules/user/service/user.service.interface';
import { UserService } from './modules/user/service/user.service';
import { IUserRepository } from './modules/user/repository/user.repository.interface';
import { userRepository } from './modules/user/repository/user.repository';

const compositionRoot = new ContainerModule((bind) => {
  bind<App>(injectKeys.Application).to(App);
  bind<ILoggerService>(injectKeys.ILoggerService).to(LoggerService);
  bind<IConfigService>(injectKeys.IConfigService).to(ConfigService);
  bind<IExceptionFilter>(injectKeys.IExceptionFilter).to(ExceptionFilter);
  bind<IDatabaseService>(injectKeys.IDatabaseService).to(DatabaseService);

  // Auth Module
  bind<IAuthController>(injectKeys.IAuthController).to(AuthController);
  bind<IAuthService>(injectKeys.IAuthService).to(AuthService);

  // User Module
  bind<IUserService>(injectKeys.IUserService).to(UserService);
  bind<IUserRepository>(injectKeys.IUserRepository).to(userRepository);
});

const bootstrap = (): { appContainer: Container; app: App } => {
  const appContainer = new Container();
  appContainer.load(compositionRoot);

  const app = appContainer.get<App>(injectKeys.Application);
  app.init();

  return { appContainer, app };
};

export const { appContainer, app } = bootstrap();

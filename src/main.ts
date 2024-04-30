import 'reflect-metadata';

import { Container, ContainerModule } from 'inversify';
import { App } from './app';
import { injectKeys } from './constants/injectKeys';
import { LoggerService } from './services/logger/logger.service';
import { ConfigService } from './services/config/config.service';

const compositionRoot = new ContainerModule((bind) => {
  bind<App>(injectKeys.Application).to(App);
  bind<LoggerService>(injectKeys.ILoggerService).to(LoggerService);
  bind<ConfigService>(injectKeys.IConfigService).to(ConfigService);
});

const bootstrap = () => {
  const appContainer = new Container();
  appContainer.load(compositionRoot);

  const app = appContainer.get<App>(injectKeys.Application);
  app.init();

  return { appContainer, app };
};

export const { appContainer } = bootstrap();

export const injectKeys = {
  Application: Symbol.for('Application'),
  ILoggerService: Symbol.for('ILoggerService'),
  IConfigService: Symbol.for('IConfigService'),
  IExceptionFilter: Symbol.for('IExceptionFilter'),

  //Controllers
  IAuthController: Symbol.for('IAuthController'),
};

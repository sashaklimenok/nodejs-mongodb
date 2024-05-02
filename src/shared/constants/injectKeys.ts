export const injectKeys = {
  Application: Symbol.for('Application'),
  ILoggerService: Symbol.for('ILoggerService'),
  IConfigService: Symbol.for('IConfigService'),
  IExceptionFilter: Symbol.for('IExceptionFilter'),
  IDatabaseService: Symbol.for('IDatabaseService'),

  // Auth Module
  IAuthController: Symbol.for('IAuthController'),
  IAuthService: Symbol.for('IAuthService'),
};

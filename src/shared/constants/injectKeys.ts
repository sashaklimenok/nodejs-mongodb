export const injectKeys = {
  Application: Symbol.for('Application'),
  ILoggerService: Symbol.for('ILoggerService'),
  IConfigService: Symbol.for('IConfigService'),
  IExceptionFilter: Symbol.for('IExceptionFilter'),
  IDatabaseService: Symbol.for('IDatabaseService'),
  IHashingService: Symbol.for('HashingService'),

  // Auth Module
  IAuthController: Symbol.for('IAuthController'),
  IAuthService: Symbol.for('IAuthService'),

  // User Module
  IUserService: Symbol.for('IUserService'),
  IUserRepository: Symbol.for('IUserRepository'),
};

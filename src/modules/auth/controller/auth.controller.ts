import { inject, injectable } from 'inversify';
import { Controller } from '../../../shared/controller/controller';
import { injectKeys } from '../../../shared/constants/injectKeys';
import { ILoggerService } from '../../../services/logger/logger.interface';
import { ExpressHandler } from '../../../types/express-handlers';
import { IAuthController } from './auth.controller.interface';
import { HTTPError } from '../../../shared/http-error/http-errors';

@injectable()
export class AuthController extends Controller implements IAuthController {
  constructor(@inject(injectKeys.ILoggerService) logger: ILoggerService) {
    super(logger);

    this.bindRoutes([
      {
        path: '/sign-up',
        method: 'post',
        handler: this.signUp,
      },
      {
        path: '/sign-in',
        method: 'post',
        handler: this.signIn,
      },
      {
        path: '/sign-out',
        method: 'get',
        handler: this.signOut,
      },
    ]);
  }

  signUp: ExpressHandler = async (req, res, next): Promise<void> => {
    this.ok(res, 'Sign Up Method');
  };

  signIn: ExpressHandler = async (req, res, next): Promise<void> => {
    this.ok(res, 'Sign In Method');
  };

  signOut: ExpressHandler = async (req, res, next): Promise<void> => {
    this.ok(res, 'sign Out Method');
  };
}

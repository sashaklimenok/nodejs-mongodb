import { inject, injectable } from 'inversify';
import { Response, Request } from 'express';
import { Controller } from '../../../shared/controller/controller';
import { injectKeys } from '../../../shared/constants/injectKeys';
import { ILoggerService } from '../../../services/logger/logger.interface';
import { ExpressHandler } from '../../../types/express-handlers';
import { IAuthController } from './auth.controller.interface';
import { AuthSignUpDto } from '../dto/auth.sign-up.dto copy';
import { AuthSignInDto } from '../dto/auth.sign-in.dto';
import { IAuthService } from '../service/auth.service.interface';

@injectable()
export class AuthController extends Controller implements IAuthController {
  constructor(
    @inject(injectKeys.ILoggerService) logger: ILoggerService,
    @inject(injectKeys.IAuthService) private authService: IAuthService,
  ) {
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

  signUp = async (req: Request<{}, {}, AuthSignUpDto>, res: Response): Promise<void> => {
    console.log(req.body);
    this.ok(res, 'Sign Up Method');
  };

  signIn = async (req: Request<{}, {}, AuthSignInDto>, res: Response): Promise<void> => {
    console.log(req.body);
    this.ok(res, 'Sign In Method');
  };

  signOut: ExpressHandler = async (req, res): Promise<void> => {
    this.ok(res, 'sign Out Method');
  };
}

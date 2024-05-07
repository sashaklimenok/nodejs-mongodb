import { inject, injectable } from 'inversify';
import { Response, Request, NextFunction } from 'express';
import { Controller } from '../../../shared/controller/controller';
import { injectKeys } from '../../../shared/constants/injectKeys';
import { ILoggerService } from '../../../services/logger/logger.interface';
import { ExpressHandler } from '../../../types/express-handlers';
import { IAuthController } from './auth.controller.interface';
import { AuthSignUpDto } from '../dto/auth.sign-up.dto';
import { AuthSignInDto } from '../dto/auth.sign-in.dto';
import { IAuthService } from '../service/auth.service.interface';
import { ValidateMiddleware } from '../../../shared/middlewares/validated.middleware';
import { IUserService } from '../../user/service/user.service.interface';
import { HTTPError } from '../../../shared/http-error/http-errors';
import { isDevEnvironment } from '../../../shared/utils/environment';

@injectable()
export class AuthController extends Controller implements IAuthController {
  constructor(
    @inject(injectKeys.ILoggerService) logger: ILoggerService,
    @inject(injectKeys.IAuthService) private authService: IAuthService,
    @inject(injectKeys.IUserService) private userService: IUserService,
  ) {
    super(logger);

    this.bindRoutes([
      {
        path: '/sign-up',
        method: 'post',
        middlewares: [new ValidateMiddleware(AuthSignUpDto)],
        handler: this.signUp,
      },
      {
        path: '/sign-in',
        method: 'post',
        middlewares: [new ValidateMiddleware(AuthSignInDto)],
        handler: this.signIn,
      },
      {
        path: '/sign-out',
        method: 'get',
        handler: this.signOut,
      },
    ]);
  }

  signUp = async (
    req: Request<{}, {}, AuthSignUpDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const isExists = await this.userService.isExist(req.body.email);
    if (!isExists) {
      const user = await this.userService.create(req.body);
      const token = this.authService.generateToken(user.id);
      res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
        secure: !isDevEnvironment(),
      });

      this.created(res, user);
    } else {
      next(new HTTPError(400, 'Email has already exists'));
    }
  };

  signIn = async (
    req: Request<{}, {}, AuthSignInDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const user = await this.authService.signInUser(req.body);
    if (user) {
      const token = this.authService.generateToken(user.id);
      res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
        secure: !isDevEnvironment(),
      });
      this.ok(res, user);
    } else {
      next(new HTTPError(401, 'Not authorized'));
    }
  };

  signOut: ExpressHandler = async (req, res): Promise<void> => {
    res.cookie('jwt', '', { maxAge: 0 });
    this.ok(res, 'Logout');
    this.ok(res, 'sign Out Method');
  };
}

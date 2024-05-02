import { IMiddleware } from '../../types/IMiddleware';
import { ExpressHandler } from '../../types/express-handlers';
import { HTTPError } from '../http-error/http-errors';

export class AuthGuard implements IMiddleware {
  constructor() {
    this.handle = this.handle.bind(this);
  }

  handle: ExpressHandler = (req, res, next) => {
    if (req.user) {
      return next();
    }

    return next(new HTTPError(401, 'Not Authorized'));
  };
}

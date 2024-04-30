import { Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { IController, IRoute } from './controller.interface';
import { injectKeys } from '../../constants/injectKeys';
import { ILoggerService } from '../../services/logger/logger.interface';

@injectable()
export abstract class Controller implements IController {
  private readonly _router: Router;
  constructor(@inject(injectKeys.ILoggerService) private logger: ILoggerService) {
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  created<T>(res: Response, message: T): Response {
    return res.status(201).json(message);
  }

  send<T>(res: Response, code: number, message: T): Response {
    return res.status(code).json(message);
  }

  ok<T>(res: Response, message: T): Response {
    return this.send<T>(res, 200, message);
  }

  bindRoutes(routes: IRoute[]): void {
    routes.forEach(({ method, path, handler, middlewares }) => {
      this.logger.info(`[Controller] [${method}] ${path}`);

      const mappedMiddlewares = middlewares?.map((middleware) => middleware.handle.bind(this));
      const mappedHandler = handler.bind(this);

      const execution = mappedMiddlewares ? [...mappedMiddlewares, mappedHandler] : mappedHandler;

      this._router[method](path, execution);
    });
  }
}

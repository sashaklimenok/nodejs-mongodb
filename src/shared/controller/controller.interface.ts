import { Router, Response } from 'express';
import { ExpressHandler } from '../../types/express-handlers';
import { IMiddleware } from '../../types/IMiddleware';

export interface IRoute {
  path: string;
  handler: ExpressHandler;
  method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
  middlewares?: IMiddleware[];
}

export interface IController {
  router: Router;
  bindRoutes(routes: IRoute[]): void;
  created<T>(res: Response, message: T): Response;
  ok<T>(res: Response, message: T): Response;
  send<T>(res: Response, code: number, message: T): Response;
}

import { Router } from 'express';
import { ExpressHandler } from '../../../types/express-handlers';

export interface IAuthController {
  router: Router;
  signUp: ExpressHandler;
  signIn: ExpressHandler;
  signOut: ExpressHandler;
}

import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IExceptionFilter } from './exception.filter.interface';
import { injectKeys } from '../constants/injectKeys';
import { ILoggerService } from '../../services/logger/logger.interface';
import { HTTPError } from '../http-error/http-errors';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
  constructor(@inject(injectKeys.ILoggerService) private logger: ILoggerService) {
    this.catch = this.catch.bind(this);
  }

  catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof HTTPError) {
      this.logger.error(`[${err.context}] Error ${err.statusCode}: ${err.message}`);
      res.status(err.statusCode).send({ error: err.message });
    } else {
      this.logger.error(`${err.message}`);
      res.status(500).send({ err: err.message });
    }
  }
}

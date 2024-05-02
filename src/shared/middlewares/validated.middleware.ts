import { NextFunction, Request, Response } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { IMiddleware } from '../../types/IMiddleware';

export class ValidateMiddleware implements IMiddleware {
  constructor(private classToValidate: ClassConstructor<object>) {
    this.handle = this.handle.bind(this);
  }

  handle(request: Request, response: Response, next: NextFunction): void {
    const instance = plainToClass(this.classToValidate, request.body);
    validate(instance, { validationError: { target: false, value: false } }).then((errors) => {
      if (errors.length) {
        response.status(400).json({ errors });
      } else {
        next();
      }
    });
  }
}

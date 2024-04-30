import { NextFunction, Request, Response } from 'express';

export const notFoundMiddleware = (
  _: Request,
  response: Response,
): Response<any, Record<string, any>> => {
  return response.status(404).json({
    message: 'Not Found',
  });
};

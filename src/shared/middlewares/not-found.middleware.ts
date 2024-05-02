import { ExpressHandler } from '../../types/express-handlers';

export const notFoundMiddleware: ExpressHandler = (_, response) => {
  return response.status(404).json({
    message: 'Not Found',
  });
};

export class HTTPError extends Error {
  statusCode: number;
  context?: string;

  constructor(statusCode: number, message: string, context = '') {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.context = context;
  }
}

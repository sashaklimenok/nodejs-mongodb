import { injectable } from 'inversify';
import { IUserService } from './user.service.interface';

@injectable()
export class UserService implements IUserService {
  create(): Promise<void> {
    return Promise.resolve();
  }

  get(): Promise<void> {
    return Promise.resolve();
  }

  delete(): Promise<void> {
    return Promise.resolve();
  }

  update(): Promise<void> {
    return Promise.resolve();
  }
}

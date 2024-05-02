import { injectable } from 'inversify';
import { IUserService } from './user.service.interface';

@injectable()
export class UserService implements IUserService {
  create: () => Promise<void>;
  get: () => Promise<void>;
  update: () => Promise<void>;
  delete: () => Promise<void>;
}

import { injectable } from 'inversify';
import { IUserRepository } from './user.repository.interface';

@injectable()
export class userRepository implements IUserRepository {
  create: () => Promise<void>;
  get: () => Promise<void>;
  update: () => Promise<void>;
  delete: () => Promise<void>;
}

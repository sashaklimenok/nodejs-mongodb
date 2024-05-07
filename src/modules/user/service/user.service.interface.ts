import { CreateUserDto } from '../dto/create-user.dto';
import { IUser } from '../interfaces/IUser';

export interface IUserService {
  create: (user: CreateUserDto) => Promise<IUser>;
  isExist: (email: string) => Promise<boolean>;
  get: () => Promise<void>;
  update: () => Promise<void>;
  delete: () => Promise<void>;
}

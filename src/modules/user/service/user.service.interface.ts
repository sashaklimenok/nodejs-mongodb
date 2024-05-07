import { CreateUserDto } from '../dto/create-user.dto';
import { IUser, IUserWithPassword } from '../interfaces/IUser';

export interface IUserService {
  create: (user: CreateUserDto) => Promise<IUser>;
  isExist: (email: string) => Promise<boolean>;
  getByEmail: (email: string) => Promise<IUserWithPassword | null>;
  update: () => Promise<void>;
  delete: () => Promise<void>;
}

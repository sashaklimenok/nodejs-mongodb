import { CreateUserDto } from '../dto/create-user.dto';
import { IUser } from '../interfaces/IUser';

export interface IUserRepository {
  create: (user: CreateUserDto) => Promise<IUser>;
  get: (email: string) => Promise<IUser | null>;
  update: () => Promise<void>;
  delete: (id: string) => Promise<void>;
}

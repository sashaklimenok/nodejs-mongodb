import { CreateUserDto } from '../dto/create-user.dto';
import { IUser, IUserWithPassword } from '../interfaces/IUser';

export interface IUserRepository {
  create: (user: CreateUserDto) => Promise<IUser>;
  getByEmail: (email: string) => Promise<IUserWithPassword | null>;
  update: () => Promise<void>;
  delete: (id: string) => Promise<void>;
}

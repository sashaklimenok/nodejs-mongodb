import { injectable } from 'inversify';
import { IUserRepository } from './user.repository.interface';
import { IUser } from '../interfaces/IUser';
import { UserModel } from '../models/user.model';
import { CreateUserDto } from '../dto/create-user.dto';

@injectable()
export class userRepository implements IUserRepository {
  async get(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email });
  }

  async create(user: CreateUserDto): Promise<IUser> {
    const userModel = new UserModel(user);
    await userModel.save();

    return {
      id: userModel._id,
      email: userModel.email,
      gender: userModel.gender,
      avatar: userModel.avatar,
    };
  }

  update: () => Promise<void>;
  delete: (id: string) => Promise<void>;
}

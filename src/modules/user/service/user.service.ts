import { inject, injectable } from 'inversify';
import { IUserService } from './user.service.interface';
import { IUser, IUserWithPassword } from '../interfaces/IUser';
import { injectKeys } from '../../../shared/constants/injectKeys';
import { IUserRepository } from '../repository/user.repository.interface';
import { HTTPError } from '../../../shared/http-error/http-errors';
import { CreateUserDto } from '../dto/create-user.dto';
import { IHashingService } from '../../../services/hashing/hashing.service.interface';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(injectKeys.IUserRepository) private userRepository: IUserRepository,
    @inject(injectKeys.IHashingService) private hashingService: IHashingService,
  ) {}

  async isExist(email: string): Promise<boolean> {
    const isExists = await this.userRepository.getByEmail(email);
    return Boolean(isExists);
  }

  async create({ email, password, gender, avatar }: CreateUserDto): Promise<IUser> {
    return await this.userRepository.create({
      email,
      password: await this.hashingService.hash(password),
      gender,
      avatar:
        avatar ?? gender === 'female'
          ? 'https://avatar.iran.liara.run/public/girl'
          : 'https://avatar.iran.liara.run/public/boy',
    });
  }

  async getByEmail(email: string): Promise<IUserWithPassword | null> {
    return await this.userRepository.getByEmail(email);
  }

  delete(): Promise<void> {
    return Promise.resolve();
  }

  update(): Promise<void> {
    return Promise.resolve();
  }
}

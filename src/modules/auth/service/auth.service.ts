import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { AuthSignInDto } from '../dto/auth.sign-in.dto';
import { AuthSignUpDto } from '../dto/auth.sign-up.dto';
import { IAuthService } from './auth.service.interface';
import { injectKeys } from '../../../shared/constants/injectKeys';
import { IUserService } from '../../user/service/user.service.interface';
import { IUser } from '../../user/interfaces/IUser';
import { IConfigService } from '../../../services/config/config.service.interface';
import { Types } from 'mongoose';
import { IHashingService } from '../../../services/hashing/hashing.service.interface';

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(injectKeys.IUserService) private userService: IUserService,
    @inject(injectKeys.IConfigService) private configService: IConfigService,
    @inject(injectKeys.IHashingService) private hashingService: IHashingService,
  ) {}
  async signUpUser(dto: AuthSignUpDto): Promise<IUser> {
    return await this.userService.create({ ...dto });
  }

  async signInUser(dto: AuthSignInDto): Promise<IUser | null> {
    const user = await this.userService.getByEmail(dto.email);
    const isPasswordCorrect = await this.hashingService.compare(dto.password, user?.password ?? '');

    if (user && isPasswordCorrect) {
      return user;
    }

    return null;
  }

  generateToken(userId: Types.ObjectId): string {
    return jwt.sign({ userId }, this.configService.get('JWT_SECRET'), { expiresIn: '15d' });
  }
}

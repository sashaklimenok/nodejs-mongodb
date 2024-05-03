import { inject, injectable } from 'inversify';
import { AuthSignInDto } from '../dto/auth.sign-in.dto';
import { AuthSignUpDto } from '../dto/auth.sign-up.dto';
import { IAuthService } from './auth.service.interface';
import { injectKeys } from '../../../shared/constants/injectKeys';
import { IUserService } from '../../user/service/user.service.interface';

@injectable()
export class AuthService implements IAuthService {
  constructor(@inject(injectKeys.IUserService) private userService: IUserService) {}
  async signUpUser(dto: AuthSignUpDto): Promise<void> {
    console.log(dto);
  }

  async signInUser(dto: AuthSignInDto): Promise<void> {
    console.log(dto);
  }
}

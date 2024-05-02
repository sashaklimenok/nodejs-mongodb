import { injectable } from 'inversify';
import { AuthSignInDto } from '../dto/auth.sign-in.dto';
import { AuthSignUpDto } from '../dto/auth.sign-up.dto';
import { IAuthService } from './auth.service.interface';

@injectable()
export class AuthService implements IAuthService {
  async signUpUser(dto: AuthSignUpDto): Promise<void> {
    console.log(dto);
  }

  async signInUser(dto: AuthSignInDto): Promise<void> {
    console.log(dto);
  }

  async isExistsUser(dto: AuthSignInDto): Promise<boolean> {
    return true;
  }
}

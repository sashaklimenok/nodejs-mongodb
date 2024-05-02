import { AuthSignInDto } from '../dto/auth.sign-in.dto';
import { AuthSignUpDto } from '../dto/auth.sign-up.dto';

export interface IAuthService {
  signUpUser: (dto: AuthSignUpDto) => Promise<void>;
  signInUser: (dto: AuthSignInDto) => Promise<void>;
  isExistsUser: (dto: AuthSignInDto) => Promise<boolean>;
}

import { injectable } from 'inversify';
import { AuthSignInDto } from '../dto/auth.sign-in.dto';
import { AuthSignUpDto } from '../dto/auth.sign-up.dto copy';
import { IAuthService } from './auth.service.interface';
import { AuthEntity } from '../entity/auth.entity';

@injectable()
export class AuthService implements IAuthService {
  async signUpUser(dto: AuthSignUpDto): Promise<void> {
    const entity = new AuthEntity(dto.email);
    const hashedPassword = await entity.setPassword(dto.password);
    console.log(dto);
  }

  async signInUser(dto: AuthSignInDto): Promise<void> {
    console.log(dto);
  }

  async isExistsUser(dto: AuthSignInDto): Promise<boolean> {
    return true;
  }
}

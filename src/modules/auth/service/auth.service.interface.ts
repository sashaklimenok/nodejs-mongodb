import { Types } from 'mongoose';
import { IUser } from '../../user/interfaces/IUser';
import { AuthSignInDto } from '../dto/auth.sign-in.dto';
import { AuthSignUpDto } from '../dto/auth.sign-up.dto';

export interface IAuthService {
  signUpUser: (dto: AuthSignUpDto) => Promise<IUser>;
  signInUser: (dto: AuthSignInDto) => Promise<IUser | null>;
  generateToken(userId: Types.ObjectId): string;
}

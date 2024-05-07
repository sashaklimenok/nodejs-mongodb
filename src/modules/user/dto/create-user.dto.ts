import { GenderType } from '../interfaces/IUser';

export class CreateUserDto {
  email: string;
  gender: GenderType;
  password: string;
  avatar?: string;
}

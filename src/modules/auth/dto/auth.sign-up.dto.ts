import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { GenderType } from '../../user/interfaces/IUser';

export class AuthSignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(3)
  password: string;

  @IsString()
  @IsNotEmpty()
  gender: GenderType;
}

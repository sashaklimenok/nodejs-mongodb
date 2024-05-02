import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthSignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(3)
  password: string;
}

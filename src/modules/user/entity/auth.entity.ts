import { hash } from 'bcryptjs';

export class AuthEntity {
  private _password: string;
  constructor(private readonly _email: string) {}

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  async setPassword(pass: string): Promise<void> {
    this._password = await hash(pass, 10);
  }
}

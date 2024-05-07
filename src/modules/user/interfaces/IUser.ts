import { Types } from 'mongoose';

export type GenderType = 'male' | 'female';

export interface IUser {
  id: Types.ObjectId;
  email: string;
  gender: GenderType;
  avatar?: string;
}

export interface IUserWithPassword extends IUser {
  password: string;
}

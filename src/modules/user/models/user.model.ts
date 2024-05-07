import { Schema, model } from 'mongoose';
import { IUserWithPassword } from '../interfaces/IUser';

const userSchema = new Schema<IUserWithPassword>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 3 },
  gender: { type: String, required: true, enum: ['male', 'female'] },
  avatar: { type: String, default: '' },
});

export const UserModel = model('UserModel', userSchema);

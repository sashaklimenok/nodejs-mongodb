import { Schema, model } from 'mongoose';

interface IUser {
  email: string;
  password: string;
  gender: 'male' | 'female';
  avatar?: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 3 },
  gender: { type: String, required: true, enum: ['male', 'female'] },
  avatar: { type: String, default: '' },
});

export const UserModel = model('User', userSchema);

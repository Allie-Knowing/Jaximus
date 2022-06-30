import { User } from '../model/user';

export interface UserRepository {
  findOne(userId: number);
  userInfo(userId: number): Promise<User>;
  updateExpoToken(userId: number, expoToken: string): void;
  deleteUser(userId: number): Promise<void>;
}

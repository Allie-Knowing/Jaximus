import { Userinfo } from 'src/presentation/auth/auth.dto';
import { User } from '../model/user';

export interface UserRepository {
  findOne(userId: number): any;
  userInfo(userId: number): Promise<User>;
  updateExpoToken(userId: number, expoToken: string): void;
  deleteUser(userId: number): Promise<void>;
  findByEmail(email: string): Promise<User>;
  save(dto: Userinfo, provider: string): Promise<User>;
}

import { User } from '../model/user';

export interface UserRepository {
  findOne(userId: number);
  userInfo(userId: number): Promise<User>;
}

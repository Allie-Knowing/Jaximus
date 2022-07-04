import { UserTypeOrmEntity } from 'src/infrastructure/entities/user.entity';
import { User } from '../model/user';

export interface UserRepository {
  findOne(userId: number): any;
  userInfo(userId: number): Promise<User>;
  updateExpoToken(userId: number, expoToken: string): void;
  deleteUser(userId: number): Promise<void>;
}

import { User } from '../model/user';

export interface BlockRepository {
  save(userId: User, blockUserId: User): void;
}

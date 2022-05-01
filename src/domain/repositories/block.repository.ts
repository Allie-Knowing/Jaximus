import { UserTypeOrmEntity } from 'src/infrastructure/entities/user.entity';

export interface BlockRepository {
  save(userId: UserTypeOrmEntity, blockUserId: UserTypeOrmEntity): void;
}

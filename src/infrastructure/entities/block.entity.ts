import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserTypeOrmEntity } from './user.entity';

@Entity('block')
export class BlockTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserTypeOrmEntity, (user) => user.blocker)
  @JoinColumn({ name: 'user_id' })
  userId: UserTypeOrmEntity;

  @ManyToOne(() => UserTypeOrmEntity, (user) => user.blocking)
  @JoinColumn({ name: 'block_user_id' })
  blockUserId: UserTypeOrmEntity;
}

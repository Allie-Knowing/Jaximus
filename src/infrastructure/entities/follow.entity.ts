import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserTypeOrmEntity } from './user.entity';

@Entity('follow')
export class FollowTypeOrmEntity {
  @PrimaryColumn()
  @ManyToOne(() => UserTypeOrmEntity, (user) => user.follower)
  @JoinColumn({ name: 'follower' })
  follower: number;

  @PrimaryColumn()
  @ManyToOne(() => UserTypeOrmEntity, (user) => user.following)
  @JoinColumn({ name: 'following' })
  following: number;
}

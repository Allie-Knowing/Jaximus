import { User } from 'src/domain/model/user';
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ActionPointTypeOrmEntity } from './action-point.entity';
import { BlockTypeOrmEntity } from './block.entity';
import { CommentTypeOrmEntity } from './comment.entity';
import { FollowTypeOrmEntity } from './follow.entity';
import { IqPaymentHistoryTypeOrmEntity } from './iq-payment-history.entity';
import { IqTypeOrmEntity } from './iq.entity';
import { LikeTypeOrmEntity } from './like.entity';
import { TierTypeOrmEntity } from './tier.entity';
import { VideoTypeOrmEntity } from './video.entity';

@Entity('user')
export class UserTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  provider: string;

  @Column({ length: 320 })
  email: string;

  @Column({ length: 2000 })
  profile: string;

  @Column({ length: 30 })
  name: string;

  @Column({ default: 0 })
  adoptionCnt: number;

  @Column({ nullable: true, length: 1024 })
  expoToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => LikeTypeOrmEntity, (like) => like.user)
  likes: LikeTypeOrmEntity[];

  @OneToMany(() => VideoTypeOrmEntity, (video) => video.user)
  videos: VideoTypeOrmEntity[];

  @OneToMany(() => CommentTypeOrmEntity, (comment) => comment.user)
  comments: CommentTypeOrmEntity[];

  @OneToMany(() => ActionPointTypeOrmEntity, (actionPoint) => actionPoint.user)
  actionPoint: ActionPointTypeOrmEntity[];

  @OneToMany(() => IqPaymentHistoryTypeOrmEntity, (iqPaymentHistory) => iqPaymentHistory.user)
  iqPaymentHistory: IqPaymentHistoryTypeOrmEntity[];

  @OneToMany(() => BlockTypeOrmEntity, (block) => block.userId)
  blocker: BlockTypeOrmEntity[];

  @OneToMany(() => BlockTypeOrmEntity, (block) => block.blockUserId)
  blocking: BlockTypeOrmEntity[];

  @OneToMany(() => FollowTypeOrmEntity, (follow) => follow.follower)
  follower: FollowTypeOrmEntity[];

  @OneToMany(() => FollowTypeOrmEntity, (follow) => follow.following)
  following: FollowTypeOrmEntity[];

  @OneToOne(() => IqTypeOrmEntity, (iq) => iq.userId)
  iq: IqTypeOrmEntity;

  @OneToOne(() => TierTypeOrmEntity, (tier) => tier.userId)
  tier: TierTypeOrmEntity;

  public static of(user: User): UserTypeOrmEntity {
    return {
      ...user,
      likes: [],
      videos: [],
      comments: [],
      iq: null,
      tier: null,
      actionPoint: [],
      iqPaymentHistory: [],
      blocker: [],
      blocking: [],
      follower: [],
      following: [],
    };
  }
}

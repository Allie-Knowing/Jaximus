import { User } from 'src/domain/model/user';
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ActionPointTypeOrmEntity } from './action_point.entity';
import { CommentTypeOrmEntity } from './comment.entity';
import { IqTypeOrmEntity } from './iq.entity';
import { LikeTypeOrmEntity } from './like.entity';
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

  @OneToOne(() => IqTypeOrmEntity, (iq) => iq.userId)
  iq: IqTypeOrmEntity;

  @OneToMany(() => ActionPointTypeOrmEntity, (actionPoint) => actionPoint.user)
  actionPoint: ActionPointTypeOrmEntity[];

  public static of(user: User): UserTypeOrmEntity {
    return { ...user, likes: [], videos: [], comments: [], iq: null, actionPoint: null };
  }
}

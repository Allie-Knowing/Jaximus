import { User } from 'src/domain/model/user';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommentTypeOrmEntity } from './comment.entity';
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

  @OneToMany(() => LikeTypeOrmEntity, (like) => like.user)
  likes: LikeTypeOrmEntity[];

  @OneToMany(() => VideoTypeOrmEntity, (video) => video.user)
  videos: VideoTypeOrmEntity[];

  @OneToMany(() => CommentTypeOrmEntity, (comment) => comment.user)
  comments: CommentTypeOrmEntity[];

  public static of(user: User): UserTypeOrmEntity {
    return { ...user, likes: [], videos: [], comments: [] };
  }
}

import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserTypeOrmEntity } from './user.entity';
import { VideoTypeOrmEntity } from './video.entity';

@Entity('like')
export class LikeTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserTypeOrmEntity, (user) => user.likes)
  @JoinColumn({ name: 'user_id' })
  user: UserTypeOrmEntity;

  @ManyToOne(() => VideoTypeOrmEntity, (video) => video.likes)
  @JoinColumn({ name: 'video_id' })
  video: VideoTypeOrmEntity;
}

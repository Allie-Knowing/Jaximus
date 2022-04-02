import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserTypeOrmEntity } from './user.entity';
import { VideoTypeOrmEntity } from './video.entity';

@Entity('comment')
export class CommentTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  content: string;

  @Column({ default: false })
  isAdoption: boolean;

  @Column()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => VideoTypeOrmEntity, (video) => video.comments)
  @JoinColumn({ name: 'video_id' })
  video: VideoTypeOrmEntity;

  @ManyToOne(() => UserTypeOrmEntity, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: UserTypeOrmEntity;
}

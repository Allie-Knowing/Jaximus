import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VideoTypeOrmEntity } from './video.entity';

@Entity('comment')
export class CommentTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  content: string;

  @ManyToOne(() => VideoTypeOrmEntity, (video) => video.comments)
  @JoinColumn({ name: 'video_id' })
  video: VideoTypeOrmEntity;
}

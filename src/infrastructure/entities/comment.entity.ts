import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VideoTypeOrmEntity } from './video.entity';

@Entity('comment')
export class CommentTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  content: string;

  @OneToMany(() => CommentTypeOrmEntity, (comment) => comment.parentComment)
  childComments: CommentTypeOrmEntity[];

  @ManyToOne(() => VideoTypeOrmEntity, (video) => video.comments)
  @JoinColumn({ name: 'video_id' })
  video: VideoTypeOrmEntity;

  @ManyToOne(() => CommentTypeOrmEntity, (comment) => comment.childComments)
  @JoinColumn({ name: 'parent_id' })
  parentComment: CommentTypeOrmEntity;
}

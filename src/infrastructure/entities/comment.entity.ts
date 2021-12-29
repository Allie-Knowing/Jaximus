import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Video } from './video.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  content: string;

  @OneToMany(() => Comment, (comment) => comment.parentComment)
  childComments: Comment[];

  @ManyToOne(() => Video, (video) => video.comments)
  @JoinColumn({ name: 'video_id' })
  video: Video;

  @ManyToOne(() => Comment, (comment) => comment.childComments)
  @JoinColumn({ name: 'parent_id' })
  parentComment: Comment;
}

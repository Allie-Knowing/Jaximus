import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { HashTag } from './hash-tag.entity';
import { Like } from './like.entity';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 2000 })
  video_url: string;

  @OneToMany(() => Like, (like) => like.video)
  likes: Like[];

  @OneToMany(() => Video, (video) => video.question)
  answers: Video[];

  @OneToMany(() => HashTag, (hashTag) => hashTag.question)
  hashTags: HashTag[];

  @OneToMany(() => Comment, (comment) => comment.video)
  comments: Comment[];

  @ManyToOne(() => Video, (video) => video.answers)
  @JoinColumn({ name: 'question_id' })
  question: Video;
}

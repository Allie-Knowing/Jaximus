import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Video } from './video.entity';

@Entity()
export class HashTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  title: string;

  @ManyToOne(() => Video, (video) => video.hashTags)
  @JoinColumn({ name: 'question_id' })
  question: Video;
}

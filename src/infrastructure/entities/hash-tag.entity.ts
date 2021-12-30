import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VideoTypeOrmEntity } from './video.entity';

@Entity('hash_tag')
export class HashTagTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  title: string;

  @ManyToOne(() => VideoTypeOrmEntity, (video) => video.hashTags)
  @JoinColumn({ name: 'question_id' })
  question: VideoTypeOrmEntity;
}

import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommentTypeOrmEntity } from './comment.entity';
import { HashTagTypeOrmEntity } from './hash-tag.entity';
import { LikeTypeOrmEntity } from './like.entity';
import { UserTypeOrmEntity } from './user.entity';

@Entity('video')
export class VideoTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 2000, name: 'video_url' })
  videoUrl: string;

  @Column()
  idAdoption: boolean;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => LikeTypeOrmEntity, (like) => like.video)
  likes: LikeTypeOrmEntity[];

  @OneToMany(() => VideoTypeOrmEntity, (video) => video.question)
  answers: VideoTypeOrmEntity[];

  @OneToMany(() => HashTagTypeOrmEntity, (hashTag) => hashTag.question)
  hashTags: HashTagTypeOrmEntity[];

  @OneToMany(() => CommentTypeOrmEntity, (comment) => comment.video)
  comments: CommentTypeOrmEntity[];

  @ManyToOne(() => VideoTypeOrmEntity, (video) => video.answers)
  @JoinColumn({ name: 'question_id' })
  question: VideoTypeOrmEntity;

  @ManyToOne(() => UserTypeOrmEntity, (user) => user.videos)
  @JoinColumn({ name: 'user_id' })
  user: UserTypeOrmEntity;
}

import { Video } from 'src/domain/model/video';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommentTypeOrmEntity } from './comment.entity';
import { HashTagTypeOrmEntity } from './hash-tag.entity';
import { LikeTypeOrmEntity } from './like.entity';
import { UserTypeOrmEntity } from './user.entity';

@Entity('video')
export class VideoTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 2000 })
  videoUrl: string;

  @Column({ default: false })
  isAdoption: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column({ length: 2000 })
  thumbnail: string;

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

  public static of(video: Video): VideoTypeOrmEntity {
    return { ...video, likes: [], answers: [], hashTags: [], comments: [], question: null, user: null };
  }
}

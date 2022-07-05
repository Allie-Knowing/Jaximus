import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommentTypeOrmEntity } from './comment.entity';
import { UserTypeOrmEntity } from './user.entity';
import { VideoTypeOrmEntity } from './video.entity';

@Entity('report')
export class ReportTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserTypeOrmEntity, (user) => user.reports)
  @JoinColumn({ name: 'user_id' })
  user: UserTypeOrmEntity;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => VideoTypeOrmEntity, (video) => video.reports)
  @JoinColumn({ name: 'video_id' })
  video: VideoTypeOrmEntity;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => CommentTypeOrmEntity, (comment) => comment.reports)
  @JoinColumn({ name: 'comment_id' })
  comment: CommentTypeOrmEntity;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}

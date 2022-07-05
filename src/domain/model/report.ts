import { Expose } from 'class-transformer';
import { ReportTypeOrmEntity } from 'src/infrastructure/entities/report.entity';

export class Report {
  id: number;

  @Expose({ name: 'user_id' })
  userId: number;

  description: string;

  @Expose({ name: 'video_id' })
  videoId: number;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'comment_id' })
  commentId: number;

  @Expose({ name: 'deleted_at' })
  deletedAt: Date;

  constructor(obj: ReportTypeOrmEntity) {
    this.id = obj.id;
    this.userId = obj.user.id;
    this.description = obj.description;
    this.videoId = obj.video.id;
    this.createdAt = obj.createdAt;
    this.commentId = !obj.comment ? null : obj.comment.id;
    this.deletedAt = obj.deletedAt;
  }
}

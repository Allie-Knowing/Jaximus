import { Expose } from 'class-transformer';

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

  constructor(obj) {
    return Object.assign(this, obj);
  }
}

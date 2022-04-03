import { Expose, Transform } from 'class-transformer';

export class Video {
  id: number;
  description: string;
  title: string;
  deletedAt: Date;
  profile: string;
  @Expose({ name: 'video_url' })
  videoUrl: string;
  @Expose({ name: 'created_at' })
  createdAt: Date;
  @Expose({ name: 'is_adoption' })
  isAdoption: boolean;
  @Transform(({ value }) => parseInt(value))
  @Expose({ name: 'like_cnt' })
  likeCnt: number;
  @Transform(({ value }) => parseInt(value))
  @Expose({ name: 'comment_cnt' })
  commentCnt: number;
  @Expose({ name: 'hash_tag' })
  hashTags: string[];
  @Expose({ name: 'question_id' })
  questionId: number;
  @Expose({ name: 'user_id' })
  userId: number;

  constructor(obj) {
    return Object.assign(this, obj);
  }
}

import { Expose } from 'class-transformer';

export class Video {
  id: number;
  description: string;
  title: string;
  @Expose({ name: 'video_url' })
  videoUrl: string;
  @Expose({ name: 'created_at' })
  createdAt: Date;
  @Expose({ name: 'is_adoption' })
  isAdoption: boolean;
  @Expose({ name: 'like_cnt' })
  likeCnt: number;
  @Expose({ name: 'comment_cnt' })
  commentCnt: number;
  @Expose({ name: 'hash_tag' })
  hashTags: string[];
  @Expose({ name: 'question_id' })
  questionId: number;
  profile: string;
  @Expose({ name: 'user_id' })
  userId: number;
  deletedAt: Date;

  constructor(obj) {
    return Object.assign(this, obj);
  }
}

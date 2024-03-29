import { Expose, Transform } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';

export class Video {
  id: number;

  @IsString()
  description: string;

  @IsString()
  title: string;

  deletedAt: Date;

  profile: string;

  thumbnail: string;

  compensation: number;

  @Transform(({ value }) => {
    if (value) return parseInt(value);
  })
  views: number;

  @IsString()
  @Expose({ name: 'video_url' })
  videoUrl: string;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'is_adoption' })
  isAdoption: boolean;

  @Transform(({ value }) => {
    if (value) return parseInt(value);
  })
  @Expose({ name: 'like_cnt' })
  likeCnt: number;

  @Transform(({ value }) => {
    if (value) return parseInt(value);
  })
  @Expose({ name: 'comment_cnt' })
  commentCnt: number;

  @IsArray()
  @Expose({ name: 'hash_tag' })
  hashTags: string[];

  @Expose({ name: 'question_id' })
  questionId: number;

  @Expose({ name: 'user_id' })
  userId: number;

  @Expose({ name: 'is_mine' })
  isMine: boolean;

  @Expose({ name: 'is_like' })
  isLike: boolean;

  @Transform(({ value }) => {
    if (value) return parseInt(value);
  })
  @Expose({ name: 'answer_cnt' })
  answerCnt: number;

  constructor(obj) {
    return Object.assign(this, obj);
  }
}

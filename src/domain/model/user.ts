import { Expose, Transform } from 'class-transformer';

export class User {
  id: number;

  provider: string;

  email: string;

  profile: string;

  name: string;

  @Expose({ name: 'expo_token' })
  expoToken: string;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  updatedAt: Date;

  @Expose({ name: 'deleted_at' })
  deletedAt: Date;

  @Transform(({ value }) => {
    if (value) return parseInt(value);
  })
  @Expose({ name: 'like_cnt' })
  likeCnt: number;

  @Transform(({ value }) => {
    if (value) return parseInt(value);
  })
  @Expose({ name: 'video_cnt' })
  videoCnt: number;

  @Transform(({ value }) => {
    if (value) return parseInt(value);
  })
  @Expose({ name: 'answer_video_cnt' })
  answerVideoCnt: number;

  @Transform(({ value }) => {
    if (value) return parseInt(value);
  })
  @Expose({ name: 'follower_cnt' })
  followerCnt: number;

  @Transform(({ value }) => {
    if (value) return parseInt(value);
  })
  @Expose({ name: 'following_cnt' })
  followingCnt: number;

  @Expose({ name: 'adoption_cnt' })
  adoptionCnt: number;

  constructor(obj) {
    return Object.assign(this, obj);
  }
}

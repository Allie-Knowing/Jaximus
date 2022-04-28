import { Expose, Transform } from 'class-transformer';

export class User {
  id: number;

  provider: string;

  email: string;

  profile: string;

  name: string;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  updatedAt: Date;

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

  @Expose({ name: 'adoption_cnt' })
  adoptionCnt: number;

  constructor(obj) {
    return Object.assign(this, obj);
  }
}

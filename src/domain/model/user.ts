import { Expose } from "class-transformer";

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
  @Expose({ name: 'like_cnt' })
  likeCnt: number;
  @Expose({ name: 'video_cnt' })
  videoCnt: number;

  constructor(obj) {
    return Object.assign(this, obj);
  }
}

import { Expose } from 'class-transformer';

export class Comment {
  id: number;
  content: string;
  @Expose({ name: 'is_adoption' })
  isAdoption: boolean;
  profile: string;
  @Expose({ name: 'user_id' })
  userId: number;
  @Expose({ name: 'update_at' })
  updateAt: Date;

  constructor(obj) {
    return Object.assign(this, obj);
  }
}

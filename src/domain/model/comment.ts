import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class Comment {

  id: number;

  @IsString()
  content: string;

  @Expose({ name: 'is_adoption' })
  isAdoption: boolean;

  profile: string;

  @Expose({ name: 'user_id' })
  userId: number;

  @Expose({ name: 'update_at' })
  updateAt: Date;

  @IsNumber()
  videoId: number;

  constructor(obj) {
    return Object.assign(this, obj);
  }
}

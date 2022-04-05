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

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  updatedAt: Date;

  @IsNumber()
  videoId: number;

  @Expose({ name: 'is_mine' })
  isMine: boolean;

  @Expose({ name: 'is_like' })
  isLike: boolean;

  constructor(obj) {
    return Object.assign(this, obj);
  }
}

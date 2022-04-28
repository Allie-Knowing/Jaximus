import { Expose } from 'class-transformer';

export class Tier {
  @Expose({ name: 'user_id' })
  userId: number;

  @Expose({ name: 'category_id' })
  categoryId: number;

  @Expose({ name: 'updated_at' })
  updatedAt: Date;
}

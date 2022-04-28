import { Expose } from 'class-transformer';

export class ActionPoint {
  id: number;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'user_id' })
  userId: number;

  @Expose({ name: 'category_id' })
  categoryId: number;
}

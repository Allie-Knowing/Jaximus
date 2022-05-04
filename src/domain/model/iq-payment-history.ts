import { Expose } from 'class-transformer';

export class IqPaymentHistory {
  id: number;
  amount: number;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'user_id' })
  userId: number;

  @Expose({ name: 'category_id' })
  categoryId: number;
}

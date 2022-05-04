import { Expose, Transform } from 'class-transformer';

export class GetPaymentHistoryPresenter {
  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'payment_type' })
  paymentType: string;

  @Transform(({ value }) => {
    if (value) return parseInt(value);
  })
  amount: number;

  constructor(obj) {
    return Object.assign(this, obj);
  }
}

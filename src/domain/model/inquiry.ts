import { Expose } from 'class-transformer';

export class Inquiry {
  id: number;

  title: string;

  description: string;

  @Expose({ name: 'user_id' })
  userId: number;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'inquiry_category_id' })
  inquiryCategoryId: number;

  constructor(obj) {
    return Object.assign(this, obj);
  }
}

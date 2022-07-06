import { Expose } from 'class-transformer';
import { InquiryTypeOrmEntity } from 'src/infrastructure/entities/inquiry.entity';

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

  constructor(obj: InquiryTypeOrmEntity) {
    this.id = obj.id;
    this.title = obj.title;
    this.description = obj.description;
    this.userId = obj.user.id;
    this.createdAt = obj.createdAt;
    this.inquiryCategoryId = obj.inquiryCategory.id;
  }
}

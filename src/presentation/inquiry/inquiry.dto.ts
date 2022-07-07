import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateInquiryDto {
  @IsString()
  category: string;

  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class InquiryResponseDto {
  id: number;

  @Expose({ name: 'user_id' })
  userId: number;

  title: string;

  description: string;

  category: string;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  email: string;

  constructor(obj) {
    return Object.assign(this, obj);
  }
}

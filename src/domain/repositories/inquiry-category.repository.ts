import { InquiryCategory } from '../model/inquiry-category';

export interface InquiryCategoryRepository {
  findOne(title: string): Promise<InquiryCategory>;
}

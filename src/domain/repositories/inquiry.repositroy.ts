import { CreateInquiryDto, InquiryResponseDto } from 'src/presentation/inquiry/inquiry.dto';
import { Inquiry } from '../model/inquiry';
import { InquiryCategory } from '../model/inquiry-category';
import { User } from '../model/user';

export interface InquiryRepository {
  findOne(inquiryId: number): Promise<Inquiry>;
  findAll(): Promise<InquiryResponseDto[]>;
  save(dto: CreateInquiryDto, user: User, inquiryCategory: InquiryCategory): Promise<void>;
  deleteInquiry(inquiryId: number): Promise<void>;
}

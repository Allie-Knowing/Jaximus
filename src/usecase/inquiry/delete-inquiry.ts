import { InquiryRepository } from 'src/domain/repositories/inquiry.repositroy';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class DeleteInquiryUsecase {
  constructor(private readonly inquiryRepository: InquiryRepository, private readonly exceptionsService: ExceptionsService) {}

  async execute(inquiryId: number) {
    const inquiry = await this.inquiryRepository.findOne(inquiryId);
    
    if (!inquiry) {
      this.exceptionsService.inquiryCategoryNotFoundException();
    }

    return await this.inquiryRepository.deleteInquiry(inquiryId);
  }
}

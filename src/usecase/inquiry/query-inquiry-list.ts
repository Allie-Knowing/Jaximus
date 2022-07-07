import { InquiryRepository } from 'src/domain/repositories/inquiry.repositroy';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class QueryInquiryListUsecase {
  constructor(private readonly inquiryRepository: InquiryRepository, exceptionsService: ExceptionsService) {}

  async execute() {
    return await this.inquiryRepository.findAll();
  }
}

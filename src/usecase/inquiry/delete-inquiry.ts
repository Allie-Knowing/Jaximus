import { InquiryRepository } from 'src/domain/repositories/inquiry.repositroy';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class DeleteInquiryUsecase {
  constructor(private readonly inquiryRepository: InquiryRepository, exceptionsService: ExceptionsService) {}
}

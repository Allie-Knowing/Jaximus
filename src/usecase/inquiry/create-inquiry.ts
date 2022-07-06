import { InquiryRepository } from 'src/domain/repositories/inquiry.repositroy';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class CreateInquiryUsecase {
  constructor(
    private readonly inquiryRepository: InquiryRepository,
    userRepository: UserRepository,
    exceptionsService: ExceptionsService,
  ) {}
}

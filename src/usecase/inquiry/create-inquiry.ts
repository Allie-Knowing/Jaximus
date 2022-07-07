import { InquiryCategoryRepository } from 'src/domain/repositories/inquiry-category.repository';
import { InquiryRepository } from 'src/domain/repositories/inquiry.repositroy';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { CreateInquiryDto } from 'src/presentation/inquiry/inquiry.dto';

export class CreateInquiryUsecase {
  constructor(
    private readonly inquiryRepository: InquiryRepository,
    private readonly inquiryCategoryRepository: InquiryCategoryRepository,
    private readonly userRepository: UserRepository,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async execute(dto: CreateInquiryDto, userId: number) {
    const user = await this.userRepository.findOne(userId);

    if (!user) {
      this.exceptionsService.userNotFoundException();
    }

    const inquiryCategory = await this.inquiryCategoryRepository.findOne(dto.category);

    if (!inquiryCategory) {
      this.exceptionsService.inquiryCategoryNotFoundException();
    }

    return await this.inquiryRepository.save(dto, user, inquiryCategory);
  }
}

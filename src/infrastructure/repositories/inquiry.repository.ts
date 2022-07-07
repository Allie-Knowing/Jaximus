import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inquiry } from 'src/domain/model/inquiry';
import { InquiryCategory } from 'src/domain/model/inquiry-category';
import { User } from 'src/domain/model/user';
import { InquiryRepository } from 'src/domain/repositories/inquiry.repositroy';
import { CreateInquiryDto, InquiryResponseDto } from 'src/presentation/inquiry/inquiry.dto';
import { Repository } from 'typeorm';
import { InquiryTypeOrmEntity } from '../entities/inquiry.entity';
import { UserTypeOrmEntity } from '../entities/user.entity';

@Injectable()
export class DatabaseInquiryRepository implements InquiryRepository {
  constructor(
    @InjectRepository(InquiryTypeOrmEntity)
    private readonly inquiryEntityRepository: Repository<InquiryTypeOrmEntity>,
  ) {}

  async findOne(inquiryId: number): Promise<Inquiry> {
    const inquiry = await this.inquiryEntityRepository.findOne(inquiryId, { relations: ['user', 'inquiryCategory'] });
    return inquiry ? new Inquiry(inquiry) : null;
  }

  async findAll(): Promise<InquiryResponseDto[]> {
    const inquiryList = await this.inquiryEntityRepository
      .createQueryBuilder('inquiry')
      .select('inquiry.id', 'id')
      .addSelect('inquiry.title', 'title')
      .addSelect('inquiry.description', 'description')
      .addSelect('inquiry.createdAt', 'createdAt')
      .addSelect('inquiry.user_id', 'userId')
      .addSelect('user.email', 'email')
      .addSelect('inquiryCategory.title', 'category')
      .leftJoin('inquiry.user', 'user')
      .leftJoin('inquiry.inquiryCategory', 'inquiryCategory')
      .getRawMany();

    return inquiryList.map((inquiry: InquiryTypeOrmEntity) => new InquiryResponseDto(new Inquiry(inquiry)));
  }

  async save(dto: CreateInquiryDto, user: User, inquiryCategory: InquiryCategory): Promise<void> {
    await this.inquiryEntityRepository.save({
      user: UserTypeOrmEntity.of(user),
      title: dto.title,
      description: dto.description,
      inquiryCategory: inquiryCategory,
    });
  }

  async deleteInquiry(inquiryId: number): Promise<void> {
    await this.inquiryEntityRepository.delete(inquiryId);
  }
}

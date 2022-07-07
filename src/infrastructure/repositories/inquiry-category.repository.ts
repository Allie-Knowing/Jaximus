import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InquiryCategoryRepository } from 'src/domain/repositories/inquiry-category.repository';
import { Repository } from 'typeorm';
import { InquiryCategoryTypeOrmEntity } from '../entities/inquiry-category.entity';

@Injectable()
export class DatabaseInquiryCategoryRepository implements InquiryCategoryRepository {
  constructor(
    @InjectRepository(InquiryCategoryTypeOrmEntity)
    private readonly inquiryCategoryEntityRepository: Repository<InquiryCategoryTypeOrmEntity>,
  ) {}

  async findOne(title: string) {
    return await this.inquiryCategoryEntityRepository.findOne({ where: { title: title } });
  }
}

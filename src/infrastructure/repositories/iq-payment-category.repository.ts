import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IqPaymentCategoryRepository } from 'src/domain/repositories/iq-payment-category';
import { Repository } from 'typeorm';
import { IqPaymentCategoryTypeOrmEntity } from '../entities/iq-payment-category.entity';

@Injectable()
export class DatabaseIqPaymentCategoryRepository implements IqPaymentCategoryRepository {
  constructor(
    @InjectRepository(IqPaymentCategoryTypeOrmEntity)
    private readonly paymentCategoryTypeOrmEntity: Repository<IqPaymentCategoryTypeOrmEntity>,
  ) {}
  getEntityById(id: number): Promise<IqPaymentCategoryTypeOrmEntity> {
    return this.paymentCategoryTypeOrmEntity.findOne(id);
  }
}

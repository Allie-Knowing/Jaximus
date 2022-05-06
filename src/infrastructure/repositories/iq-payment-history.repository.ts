import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IqPaymentHistoryRepository } from 'src/domain/repositories/iq-payment-history';
import { GetPaymentHistoryPresenter } from 'src/presentation/wallet/payment-history.presenter';
import { Repository } from 'typeorm';

import { IqPaymentHistoryTypeOrmEntity } from '../entities/iq-payment-history.entity';

@Injectable()
export class DatabaseIqPaymentHistoryRepository implements IqPaymentHistoryRepository {
  constructor(
    @InjectRepository(IqPaymentHistoryTypeOrmEntity)
    private readonly paymentHistoryTypeOrmEntity: Repository<IqPaymentHistoryTypeOrmEntity>,
  ) {}
  async getIqPaymentHistories(userId: number, page: number, size: number): Promise<GetPaymentHistoryPresenter[]> {
    const paymentHistories: any[] = await this.paymentHistoryTypeOrmEntity
      .createQueryBuilder('history')
      .select('history.createdAt', 'createdAt')
      .addSelect('history.id', 'id')
      .addSelect('category.name', 'paymentType')
      .addSelect('history.amount', 'amount')
      .innerJoin('history.iqPaymentCategory', 'category')
      .where('history.user = :userId', { userId })
      .offset((page - 1) * size)
      .limit(size)
      .orderBy('history.createdAt', 'DESC')
      .getRawMany();

    return Promise.all(
      paymentHistories.map(async (p) => {
        return new GetPaymentHistoryPresenter(p);
      }),
    );
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IqPaymentHistoryRepository } from 'src/domain/repositories/iq-payment-history';
import { GetPaymentHistoryPresenter } from 'src/presentation/wallet/payment-history.presenter';
import { Repository } from 'typeorm';
import { IqPaymentCategoryTypeOrmEntity } from '../entities/iq-payment-category.entity';

import { IqPaymentHistoryTypeOrmEntity } from '../entities/iq-payment-history.entity';
import { UserTypeOrmEntity } from '../entities/user.entity';

@Injectable()
export class DatabaseIqPaymentHistoryRepository implements IqPaymentHistoryRepository {
  constructor(
    @InjectRepository(IqPaymentHistoryTypeOrmEntity)
    private readonly paymentHistoryTypeOrmEntity: Repository<IqPaymentHistoryTypeOrmEntity>,
  ) {}
  findByUserIdAndPaymentCategory(userId: number, categoryId: number): Promise<IqPaymentHistoryTypeOrmEntity> {
    return this.paymentHistoryTypeOrmEntity
      .createQueryBuilder('history')
      .select()
      .where('history.user = :userId', { userId })
      .andWhere('history.iqPaymentCategory = :categoryId', { categoryId })
      .getRawOne();
  }

  async answerVideoEvent(user: UserTypeOrmEntity, iqPaymentCategory: IqPaymentCategoryTypeOrmEntity): Promise<void> {
    const paymentHistory: IqPaymentHistoryTypeOrmEntity = this.paymentHistoryTypeOrmEntity.create({
      user: user,
      amount: 3000,
      iqPaymentCategory,
    });

    await this.paymentHistoryTypeOrmEntity.save(paymentHistory);
  }

  async questionVideoEvent(user: UserTypeOrmEntity, iqPaymentCategory: IqPaymentCategoryTypeOrmEntity): Promise<void> {
    const paymentHistory: IqPaymentHistoryTypeOrmEntity = this.paymentHistoryTypeOrmEntity.create({
      user: user,
      amount: 1000,
      iqPaymentCategory,
    });

    await this.paymentHistoryTypeOrmEntity.save(paymentHistory);
  }

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
      .orderBy('history.id', 'DESC')
      .getRawMany();

    return Promise.all(
      paymentHistories.map(async (p) => {
        return new GetPaymentHistoryPresenter(p);
      }),
    );
  }
}

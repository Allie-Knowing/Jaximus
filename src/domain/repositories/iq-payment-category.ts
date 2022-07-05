import { IqPaymentCategoryTypeOrmEntity } from 'src/infrastructure/entities/iq-payment-category.entity';

export interface IqPaymentCategoryRepository {
  getEntityById(id: number): Promise<IqPaymentCategoryTypeOrmEntity>;
}

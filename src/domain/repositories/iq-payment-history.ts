import { IqPaymentCategoryTypeOrmEntity } from 'src/infrastructure/entities/iq-payment-category.entity';
import { IqPaymentHistoryTypeOrmEntity } from 'src/infrastructure/entities/iq-payment-history.entity';
import { UserTypeOrmEntity } from 'src/infrastructure/entities/user.entity';
import { GetPaymentHistoryPresenter } from 'src/presentation/wallet/payment-history.presenter';

export interface IqPaymentHistoryRepository {
  questionVideoEvent(user: UserTypeOrmEntity, iqPaymentCategory: IqPaymentCategoryTypeOrmEntity): void;
  answerVideoEvent(user: UserTypeOrmEntity, iqPaymentCategory: IqPaymentCategoryTypeOrmEntity): Promise<void>;
  getIqPaymentHistories(userId: number, page: number, size: number): Promise<GetPaymentHistoryPresenter[]>;
  findByUserIdAndPaymentCategory(userId: number, categoryId: number): Promise<IqPaymentHistoryTypeOrmEntity>;
}

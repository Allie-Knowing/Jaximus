import { GetPaymentHistoryPresenter } from 'src/presentation/wallet/payment-history.presenter';

export interface IqPaymentHistoryRepository {
  getIqPaymentHistories(userId: number, page: number, size: number): Promise<GetPaymentHistoryPresenter[]>;
}

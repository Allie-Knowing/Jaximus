import { IException } from 'src/domain/exceptions/exceptions.interface';
import { IqPaymentHistoryRepository } from 'src/domain/repositories/iq-payment-history';
import { GetPaymentHistoryPresenter } from 'src/presentation/wallet/payment-history.presenter';

export class GetPaymentHistoryUsecase {
  constructor(private readonly paymentHistoryRepository: IqPaymentHistoryRepository, private readonly exceptionService: IException) {}

  async execute(userId: number, page: number, size: number): Promise<GetPaymentHistoryPresenter[]> {
    const paymentHistory = await this.paymentHistoryRepository.getIqPaymentHistories(userId, page, size);

    if (paymentHistory.length === 0) this.exceptionService.paymentHistoryNotFoundException();

    return paymentHistory;
  }
}

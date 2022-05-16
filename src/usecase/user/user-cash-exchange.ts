import { IException } from 'src/domain/exceptions/exceptions.interface';
import { Iq } from 'src/domain/model/iq';
import { CashExchangeRepository } from 'src/domain/repositories/cash-exchange.repository';
import { IqRepository } from 'src/domain/repositories/iq.repository';
import { UserCashExchangeDto } from 'src/presentation/user/user.dto';

export class UserCashExchangeUsecase {
  constructor(
    private readonly cashExchangeRepository: CashExchangeRepository,
    private readonly iqRepository: IqRepository,
    private readonly exceptionService: IException,
  ) {}

  async execute(cashExchangeDto: UserCashExchangeDto, userId: number): Promise<void> {
    const iq: Iq = await this.iqRepository.getIq(userId);

    if (cashExchangeDto.cash > iq.curCnt) this.exceptionService.notEnoughIqException();

    this.cashExchangeRepository.cashExchange(cashExchangeDto, userId);
  }
}

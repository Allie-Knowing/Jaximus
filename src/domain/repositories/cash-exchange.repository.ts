import { UserCashExchangeDto } from 'src/presentation/user/user.dto';

export interface CashExchangeRepository {
  cashExchange(cashExchangeDto: UserCashExchangeDto, userId: number): Promise<void>;
}

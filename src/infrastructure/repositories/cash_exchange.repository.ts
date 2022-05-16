import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CashExchangeRepository } from 'src/domain/repositories/cash-exchange.repository';
import { UserCashExchangeDto } from 'src/presentation/user/user.dto';
import { Repository } from 'typeorm';
import { CashExchangeTypeOrmEntity } from '../entities/cash_exchange.entity';
import { UserTypeOrmEntity } from '../entities/user.entity';

@Injectable()
export class DatabaseCashExchangeRepository implements CashExchangeRepository {
  constructor(
    @InjectRepository(CashExchangeTypeOrmEntity)
    private readonly cashExchangeEntityRepository: Repository<CashExchangeTypeOrmEntity>,
    @InjectRepository(UserTypeOrmEntity)
    private readonly userEntityRepository: Repository<UserTypeOrmEntity>,
  ) {}

  async cashExchange(cashExchangeDto: UserCashExchangeDto, userId: number) {
    const user: UserTypeOrmEntity = await this.userEntityRepository.findOne(userId);

    await this.cashExchangeEntityRepository.save({
      cash: cashExchangeDto.cash,
      bank: cashExchangeDto.bank,
      accountOwner: cashExchangeDto.accountOwner,
      accountNumber: cashExchangeDto.accountNumber,
      user,
    });
  }
}

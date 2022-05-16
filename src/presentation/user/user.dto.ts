import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class UserCashExchangeDto {
  @IsNumber()
  cash: number;

  @IsString()
  bank: string;

  @IsString()
  @Expose({ name: 'account_owner' })
  accountOwner: string;

  @IsString()
  @Expose({ name: 'account_number' })
  accountNumber: string;
}

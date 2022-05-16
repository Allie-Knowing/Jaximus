import { User } from './user';

export class CashExchange {
  id: number;
  cash: number;
  bank: string;
  accountOwner: string;
  accountNumber: string;
  createdAt: Date;
  user: User;
}

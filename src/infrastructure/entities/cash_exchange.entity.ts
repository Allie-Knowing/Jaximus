import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserTypeOrmEntity } from './user.entity';

@Entity('cash_exchange')
export class CashExchangeTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  cash: number;

  @Column({ length: 20 })
  bank: string;

  @Column({ length: 10 })
  accountOwner: string;

  @Column({ length: 100 })
  accountNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserTypeOrmEntity, (user) => user.cashExchange)
  @JoinColumn({ name: 'user_id' })
  user: UserTypeOrmEntity;
}

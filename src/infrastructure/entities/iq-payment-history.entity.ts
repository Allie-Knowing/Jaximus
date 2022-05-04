import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IqPaymentCategoryTypeOrmEntity } from './iq-payment-category.entity';
import { UserTypeOrmEntity } from './user.entity';

@Entity('iq_payment_history')
export class IqPaymentHistoryTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserTypeOrmEntity, (user) => user.iqPaymentHistory)
  @JoinColumn({ name: 'user_id' })
  user: UserTypeOrmEntity;

  @ManyToOne(() => IqPaymentCategoryTypeOrmEntity, (iqPaymentCategory) => iqPaymentCategory.iqPaymentHistory)
  @JoinColumn({ name: 'category_id' })
  iqPaymentCategory: IqPaymentCategoryTypeOrmEntity;
}

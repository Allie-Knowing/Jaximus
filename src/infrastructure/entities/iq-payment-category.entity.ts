import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IqPaymentHistoryTypeOrmEntity } from './iq-payment-history.entity';

@Entity('iq_payment_category')
export class IqPaymentCategoryTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @OneToMany(() => IqPaymentHistoryTypeOrmEntity, (iqPaymentHistory) => iqPaymentHistory.iqPaymentCategory)
  iqPaymentHistory: IqPaymentHistoryTypeOrmEntity[];
}

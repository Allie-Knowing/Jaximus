import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { UserTypeOrmEntity } from './user.entity';

@Entity('iq')
export class IqTypeOrmEntity {
  @PrimaryColumn()
  @OneToOne(() => UserTypeOrmEntity, (user) => user.iq)
  @JoinColumn({ name: 'user_id' })
  userId: number;

  @Column({ type: 'bigint' })
  curCnt: number;

  @Column({ type: 'bigint' })
  totCnt: number;
}

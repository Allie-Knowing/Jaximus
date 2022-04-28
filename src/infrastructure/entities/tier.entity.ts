import { Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { TierCategoryTypeOrmEntity } from './tier-category.entity';
import { UserTypeOrmEntity } from './user.entity';

@Entity('tier')
export class TierTypeOrmEntity {
  @PrimaryColumn()
  @OneToOne(() => UserTypeOrmEntity, (user) => user.iq)
  @JoinColumn({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => TierCategoryTypeOrmEntity, (tierCategory) => tierCategory.tier)
  @JoinColumn({ name: 'category_id' })
  tierCategory: TierCategoryTypeOrmEntity;

  @UpdateDateColumn()
  updatedAt: Date;
}

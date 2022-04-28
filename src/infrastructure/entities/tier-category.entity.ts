import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TierTypeOrmEntity } from './tier.entity';

@Entity('tier_category')
export class TierCategoryTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column()
  nextTotIq: number;

  @Column()
  nextAdoptionCnt: number;

  @Column({ length: 2000 })
  imageUrl: string;

  @OneToMany(() => TierTypeOrmEntity, (tier) => tier.tierCategory)
  tier: TierTypeOrmEntity[];
}

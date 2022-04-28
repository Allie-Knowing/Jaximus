import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tier } from 'src/domain/model/tier';
import { TierRepository } from 'src/domain/repositories/tier.repository';
import { Repository } from 'typeorm';
import { TierTypeOrmEntity } from '../entities/tier.entity';

@Injectable()
export class DatabaseTierRepository implements TierRepository {
  constructor(
    @InjectRepository(TierTypeOrmEntity)
    private readonly tierEntityRepository: Repository<TierTypeOrmEntity>,
  ) {}
  async findWalletInfo(userId: number): Promise<Tier> {
    const tier: any = await this.tierEntityRepository
      .createQueryBuilder('tier')
      .select('tierCategory.name', 'categoryName')
      .addSelect('tierCategory.imageUrl', 'imageUrl')
      .addSelect('tierCategory.nextTotIq', 'nextTotIq')
      .addSelect('tierCategory.nextAdoptionCnt', 'nextAdoptionCnt')
      .addSelect('user.adoptionCnt', 'adoptionCnt')
      .addSelect('iq.curCnt', 'curCnt')
      .addSelect('iq.totCnt', 'totCnt')
      .where('tier.userId = :userId', { userId })
      .leftJoin('tier.tierCategory', 'tierCategory')
      .innerJoin('tier.userId', 'user')
      .innerJoin('user.iq', 'iq')
      .getRawOne();

    if (!tier) return;

    return new Tier(tier);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionPointRepository } from 'src/domain/repositories/action-point.repository';
import { GetActionPointPresenter } from 'src/presentation/wallet/action-point.presenter';
import { Repository } from 'typeorm';
import { ActionPointTypeOrmEntity } from '../entities/action-point.entity';

@Injectable()
export class DatabaseActionPointRepository implements ActionPointRepository {
  constructor(
    @InjectRepository(ActionPointTypeOrmEntity)
    private readonly actionPointEntityRepository: Repository<ActionPointTypeOrmEntity>,
  ) {}
  async actionPointCalc(userId: number): Promise<GetActionPointPresenter> {
    return await this.actionPointEntityRepository
      .createQueryBuilder('action')
      .select('SUM(category.score)', 'actionPoint')
      .innerJoin('action.actionPointCategory', 'category')
      .where('action.user = :userId', { userId })
      .andWhere('action.created_at BETWEEN ADDDATE(now(), -1) AND now()')
      .getRawOne();
  }
}

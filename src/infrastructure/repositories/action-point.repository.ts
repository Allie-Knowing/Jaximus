import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/model/user';
import { ActionPointRepository } from 'src/domain/repositories/action-point.repository';
import { GetActionPointPresenter } from 'src/presentation/wallet/action-point.presenter';
import { Repository } from 'typeorm';
import { ActionPointCategoryTypeOrmEntity } from '../entities/action-point-category.entity';
import { ActionPointTypeOrmEntity } from '../entities/action-point.entity';

@Injectable()
export class DatabaseActionPointRepository implements ActionPointRepository {
  constructor(
    @InjectRepository(ActionPointTypeOrmEntity)
    private readonly actionPointEntityRepository: Repository<ActionPointTypeOrmEntity>,
    @InjectRepository(ActionPointCategoryTypeOrmEntity)
    private readonly actionPointCategoryRepository: Repository<ActionPointCategoryTypeOrmEntity>,
  ) {}
  async saveActionPoint(user: User, actionPointCategoryId: number): Promise<void> {
    const actionPointCategory = await this.actionPointCategoryRepository.findOne(actionPointCategoryId);
    const actionPoint = this.actionPointEntityRepository.create({ user, actionPointCategory });

    await this.actionPointEntityRepository.save(actionPoint);
  }
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

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Iq } from 'src/domain/model/iq';
import { IqRepository } from 'src/domain/repositories/iq.repository';
import { Repository } from 'typeorm';
import { IqTypeOrmEntity } from '../entities/iq.entity';

@Injectable()
export class DatabaseIqRepository implements IqRepository {
  constructor(
    @InjectRepository(IqTypeOrmEntity)
    private readonly iqEntityRepository: Repository<IqTypeOrmEntity>,
  ) {}
  answerVideoEvent(userId: number): void {
    this.iqEntityRepository
      .createQueryBuilder()
      .update(IqTypeOrmEntity)
      .set({ curCnt: () => `cur_cnt + 3000` })
      .where('user_id = :user_id', { user_id: userId })
      .execute();
  }

  questionVideoEvent(userId: number): void {
    this.iqEntityRepository
      .createQueryBuilder()
      .update(IqTypeOrmEntity)
      .set({ curCnt: () => `cur_cnt + 1000` })
      .where('user_id = :user_id', { user_id: userId })
      .execute();
  }

  async getIq(userId: number): Promise<Iq> {
    const iq = await this.iqEntityRepository
      .createQueryBuilder('iq')
      .select('iq.userId')
      .addSelect('iq.curCnt')
      .addSelect('iq.totCnt')
      .where('iq.user_id = :user_id', { user_id: userId })
      .getOne();

    return new Iq(iq);
  }

  async iqExpenditure(userId: number, compensation: number): Promise<void> {
    await this.iqEntityRepository
      .createQueryBuilder()
      .update(IqTypeOrmEntity)
      .set({ curCnt: () => `cur_cnt - ${compensation}` })
      .where('user_id = :user_id', { user_id: userId })
      .execute();
  }
}

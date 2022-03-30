import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUserInfoPresenter, GetUserQuestionListPresenter } from 'src/domain/repositories/dto/user.dto';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { Repository } from 'typeorm';
import { UserTypeOrmEntity } from '../entities/user.entity';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly userEntityRepository: Repository<UserTypeOrmEntity>,
  ) {}

  findOne(userId: number) {
    return this.userEntityRepository.findOne(userId);
  }

  userInfo(userId: number): Promise<GetUserInfoPresenter> {
    return this.userEntityRepository
      .createQueryBuilder('user')
      .select('user.name', 'name')
      .addSelect('user.profile', 'profile')
      .addSelect('COUNT(video.id)', 'videoCnt')
      .where('user.id = :user_id', { user_id: userId })
      .innerJoin('user.videos', 'video')
      .groupBy('user.id')
      .getRawOne();
  }
}

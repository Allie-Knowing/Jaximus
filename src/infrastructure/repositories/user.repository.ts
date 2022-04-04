import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/model/user';
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

  async userInfo(userId: number): Promise<User> {
    const user: any = await this.userEntityRepository
      .createQueryBuilder('user')
      .select('user.name', 'name')
      .addSelect('user.profile', 'profile')
      .addSelect('COUNT(video.id)', 'videoCnt')
      .where('user.id = :user_id', { user_id: userId })
      .leftJoin('user.videos', 'video')
      .groupBy('user.id')
      .getRawOne();

    return new User(user);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/model/user';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { Repository } from 'typeorm';
import { CommentTypeOrmEntity } from '../entities/comment.entity';
import { UserTypeOrmEntity } from '../entities/user.entity';
import { VideoTypeOrmEntity } from '../entities/video.entity';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly userEntityRepository: Repository<UserTypeOrmEntity>,
    @InjectRepository(VideoTypeOrmEntity)
    private readonly videoEntityRepository: Repository<VideoTypeOrmEntity>,
    @InjectRepository(CommentTypeOrmEntity)
    private readonly commentEntityRepository: Repository<CommentTypeOrmEntity>,
  ) {}

  updateExpoToken(userId: number, expoToken: string): void {
    this.userEntityRepository.update(userId, { expoToken });
  }

  findOne(userId: number) {
    return this.userEntityRepository.findOne(userId);
  }

  async userInfo(userId: number): Promise<User> {
    const user: any = await this.userEntityRepository
      .createQueryBuilder('user')
      .select('user.name', 'name')
      .addSelect('user.profile', 'profile')
      .addSelect('user.email', 'email')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(1)')
          .from('video', 'video')
          .where('video.user = :user_id', { user_id: userId })
          .andWhere('video.question IS NULL');
      }, 'videoCnt')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(1)')
          .from('video', 'video')
          .where('video.user = :user_id', { user_id: userId })
          .andWhere('video.question IS NOT NULL');
      }, 'answerVideoCnt')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(1)')
          .from('user', 'user')
          .innerJoin('user.follower', 'following')
          .where('user.id = :user_id', { user_id: userId });
      }, 'followerCnt')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(1)')
          .from('user', 'user')
          .innerJoin('user.following', 'follower')
          .where('user.id = :user_id', { user_id: userId });
      }, 'followingCnt')
      .where('user.id = :user_id', { user_id: userId })
      .groupBy('user.id')
      .getRawOne();

    return new User(user);
  }

  async deleteUser(userId: number): Promise<void> {
    const user: any = this.userEntityRepository.createQueryBuilder('user').select().where('user.id = :id', { id: userId }).getOne();

    await this.videoEntityRepository.softDelete({ user: user });
    await this.commentEntityRepository.softDelete({ user: user });

    await this.userEntityRepository.softDelete({ id: userId });
  }
}

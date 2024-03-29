import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/model/user';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { Userinfo } from 'src/presentation/auth/auth.dto';
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

  async findOne(userId: number) {
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
    const now = new Date();

    await this.videoEntityRepository
      .createQueryBuilder()
      .update(VideoTypeOrmEntity)
      .set({ deletedAt: now })
      .where('user_id = :user_id', { user_id: userId })
      .execute();

    await this.commentEntityRepository
      .createQueryBuilder()
      .update(CommentTypeOrmEntity)
      .set({ deletedAt: now })
      .where('user_id = :user_id', { user_id: userId })
      .execute();

    await this.userEntityRepository.softDelete({ id: userId });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userEntityRepository
      .createQueryBuilder('user')
      .select('user.id', 'id')
      .addSelect('user.deleted_at', 'deletedAt')
      .addSelect('user.provider', 'provider')
      .where('email = :email', { email: email })
      .withDeleted()
      .getRawOne();

    return user ? user : null;
  }

  async save(userinfo: Userinfo, provider: string): Promise<User> {
    const user = await this.userEntityRepository.save({
      ...userinfo,
      provider,
    });

    return new User({ ...user, id: user.id, deletedAt: user.deletedAt });
  }
}

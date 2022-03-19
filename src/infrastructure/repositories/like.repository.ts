import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeRepository } from 'src/domain/repositories/like.repository';
import { Repository } from 'typeorm';
import { LikeTypeOrmEntity } from '../entities/like.entity';

@Injectable()
export class DatabaseLikeRepository implements LikeRepository {
  constructor(
    @InjectRepository(LikeTypeOrmEntity)
    private readonly likeEntityRepository: Repository<LikeTypeOrmEntity>,
  ) {}

  async createLike(videoId: number, userId: number): Promise<void> {
    await this.likeEntityRepository
      .createQueryBuilder('like')
      .insert()
      .into(LikeTypeOrmEntity)
      .values({ user_id: userId, video_id: videoId })
      .execute();
  }

  async findOne(videoId: number, userId: number): Promise<boolean> {
    const like = await this.likeEntityRepository
      .createQueryBuilder('like')
      .select('like.id')
      .where('like.user_id = :user_id', { user_id: userId })
      .andWhere('like.video_id = :video_id', { video_id: videoId })
      .getOne();
    if (like) {
      return true;
    }
    return false;
  }
}

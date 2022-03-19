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

  findOne(videoId: number, userId: number) {
    return this.likeEntityRepository
      .createQueryBuilder('like')
      .select('like.id')
      .where('user.id = :user_id', { user_id: userId })
      .andWhere('video.id = :video_id', { video_id: videoId })
      .leftJoin('like.user', 'user')
      .leftJoin('like.video', 'video')
      .getOne();
  }
}

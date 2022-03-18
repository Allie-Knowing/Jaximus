import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserReqeust } from 'src/domain/interfaces/request.interface';
import { LikeRepository } from 'src/domain/repositories/like.repository';
import { Repository } from 'typeorm';
import { LikeTypeOrmEntity } from '../entities/like.entity';

@Injectable()
export class DatabaseLikeRepository implements LikeRepository {
  constructor(
    @InjectRepository(LikeTypeOrmEntity)
    private readonly likeEntityRepository: Repository<LikeTypeOrmEntity>,
    @Inject(REQUEST) private readonly request: IUserReqeust,
  ) {}

  async createLike(videoId: number): Promise<void> {
    const userId = this.request.user.userId;

    await this.likeEntityRepository
      .createQueryBuilder('like')
      .insert()
      .into(LikeTypeOrmEntity)
      .values({ user_id: userId, video_id: videoId })
      .execute();
  }
}

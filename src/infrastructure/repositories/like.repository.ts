import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeRepository } from 'src/domain/repositories/like.repository';
import { Repository } from 'typeorm';
import { LikeTypeOrmEntity } from '../entities/like.entity';
import { UserTypeOrmEntity } from '../entities/user.entity';
import { VideoTypeOrmEntity } from '../entities/video.entity';

@Injectable()
export class DatabaseLikeRepository implements LikeRepository {
  constructor(
    @InjectRepository(LikeTypeOrmEntity)
    private readonly likeEntityRepository: Repository<LikeTypeOrmEntity>,

    @InjectRepository(VideoTypeOrmEntity)
    private readonly videoEntityRepository: Repository<VideoTypeOrmEntity>,

    @InjectRepository(UserTypeOrmEntity)
    private readonly userEntityRepository: Repository<UserTypeOrmEntity>,
  ) {}

  async createLike(videoId: number, userId: number): Promise<void> {
    const user: UserTypeOrmEntity = await this.userEntityRepository.findOne(userId);
    const video: VideoTypeOrmEntity = await this.videoEntityRepository.findOne(videoId);

    await this.likeEntityRepository.save({
      user,
      video,
    });
  }

  async findOne(videoId: number, userId: number) {
    return await this.likeEntityRepository
      .createQueryBuilder('like')
      .select('like.id')
      .where('like.user_id = :user_id', { user_id: userId })
      .andWhere('like.video_id = :video_id', { video_id: videoId })
      .getOne();
  }
}

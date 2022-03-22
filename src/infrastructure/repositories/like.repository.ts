import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/model/user';
import { Video } from 'src/domain/model/video';
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
  ) {}

  save(user: User, video: Video) {
    const like: LikeTypeOrmEntity = this.likeEntityRepository.create({
      user: UserTypeOrmEntity.of(user),
      video: VideoTypeOrmEntity.of(video),
    });

    return this.likeEntityRepository.save(like);
  }

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

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from 'src/domain/model/video';
import { GetVideoCommentList } from 'src/domain/repositories/dto/video.dto';
import { VideoRepository } from 'src/domain/repositories/video.repository';
import { Repository } from 'typeorm';
import { GetQuestionListPresenter } from '../../presentation/video/video.presenter';
import { HashTagTypeOrmEntity } from '../entities/hash-tag.entity';
import { UserTypeOrmEntity } from '../entities/user.entity';
import { VideoTypeOrmEntity } from '../entities/video.entity';

@Injectable()
export class DatabaseVideoRepository implements VideoRepository {
  constructor(
    @InjectRepository(VideoTypeOrmEntity)
    private readonly videoEntityRepository: Repository<VideoTypeOrmEntity>,

    @InjectRepository(UserTypeOrmEntity)
    private readonly userEntityRepository: Repository<UserTypeOrmEntity>,

    @InjectRepository(HashTagTypeOrmEntity)
    private readonly hashTagEntityRepository: Repository<HashTagTypeOrmEntity>,
  ) {}

  getQuestionList(): Promise<GetQuestionListPresenter[]> {
    return this.videoEntityRepository
      .createQueryBuilder('video')
      .leftJoin('video.comments', 'comment')
      .leftJoin('video.likes', 'like')
      .innerJoin('video.user', 'user')
      .select('video.id', 'video_id')
      .addSelect('video.video_url', 'video_url')
      .addSelect('video.title', 'title')
      .addSelect('video.description', 'description')
      .addSelect('video.created_at', 'created_at')
      .addSelect('user.id', 'user_id')
      .addSelect('user.profile', 'profile')
      .addSelect('COUNT(comment.id)', 'comment_cnt')
      .addSelect('COUNT(like.id)', 'like_cnt')
      .groupBy('video.id')
      .getRawMany();
  }

  async save(video: Video): Promise<void> {
    const user: UserTypeOrmEntity = await this.userEntityRepository.findOne(video.userId);

    const videoEntity: VideoTypeOrmEntity = await this.videoEntityRepository.save({
      description: video.description,
      title: video.title,
      videoUrl: video.videoUrl,
      user,
    });

    await Promise.all(
      video.hashTags.map((title) =>
        this.hashTagEntityRepository.save({
          title,
          question: videoEntity,
        }),
      ),
    );
  }

  async getVideoCommentList(video_id: number): Promise<GetVideoCommentList[]> {
    return this.videoEntityRepository
      .createQueryBuilder('video')
      .select('video.id', 'video_id')
      .addSelect('video.video_url', 'video_url')
      .addSelect('video.title', 'title')
      .addSelect('SUBSTR(video.created_at, 1, 10)', 'created_at')
      .addSelect('COUNT(like.id)', 'like_cnt')
      .addSelect('user.profile', 'profile')
      .addSelect('user.id', 'user_id')
      .where('video.question = :video_id', { video_id: video_id })
      .leftJoin('video.user', 'user')
      .leftJoin('video.likes', 'like')
      .groupBy('video.id')
      .getRawMany();
  }
}

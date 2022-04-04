import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from 'src/domain/model/video';
import { VideoRepository } from 'src/domain/repositories/video.repository';
import { CreateVideoAnswerDto } from 'src/presentation/answer/answer.dto';
import { CreateQuestionDto } from 'src/presentation/question/question.dto';
import { Repository } from 'typeorm';
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

  findOne(videoId: number) {
    return this.videoEntityRepository.findOne(videoId);
  }

  async findQuestionList(page: number, size: number): Promise<Video[]> {
    const videos: any[] = await this.videoEntityRepository
      .createQueryBuilder('video')
      .leftJoin('video.comments', 'comment')
      .leftJoin('video.likes', 'like')
      .innerJoin('video.user', 'user')
      .select('video.id', 'id')
      .addSelect('video.videoUrl', 'videoUrl')
      .addSelect('video.title', 'title')
      .addSelect('video.description', 'description')
      .addSelect('video.createdAt', 'createdAt')
      .addSelect('user.id', 'userId')
      .addSelect('user.profile', 'profile')
      .addSelect('COUNT(comment.id)', 'commentCnt')
      .addSelect('COUNT(like.id)', 'likeCnt')
      .offset((page - 1) * size)
      .limit(size)
      .where('video.question IS NULL')
      .groupBy('video.id')
      .getRawMany();
    return videos.map((video) => new Video(video));
  }

  async save(video: CreateQuestionDto, userId: number): Promise<void> {
    const user: UserTypeOrmEntity = await this.userEntityRepository.findOne(userId);

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

  async findVideoAnswerList(questionId: number, page: number, size: number): Promise<Video[]> {
    const videos: any[] = await this.videoEntityRepository
      .createQueryBuilder('video')
      .select('video.id', 'id')
      .addSelect('video.video_url', 'videoUrl')
      .addSelect('video.title', 'title')
      .addSelect('SUBSTR(video.created_at, 1, 10)', 'createdAt')
      .addSelect('COUNT(like.id)', 'likeCnt')
      .addSelect('user.profile', 'profile')
      .addSelect('video.is_adoption', 'isAdoption')
      .addSelect('user.id', 'userId')
      .offset((page - 1) * size)
      .limit(size)
      .where('video.question = :question_id', { question_id: questionId })
      .leftJoin('video.user', 'user')
      .leftJoin('video.likes', 'like')
      .groupBy('video.id')
      .getRawMany();
    return videos.map((video) => new Video(video));
  }

  async createVideoAnswer(request: CreateVideoAnswerDto, userId: number, question: VideoTypeOrmEntity): Promise<void> {
    const user: UserTypeOrmEntity = await this.userEntityRepository.findOne(userId);

    await this.videoEntityRepository.save({
      title: request.title,
      videoUrl: request.videoUrl,
      question,
      user,
    });
  }

  async videoAdoption(videoId: number): Promise<void> {
    await this.videoEntityRepository
      .createQueryBuilder()
      .update(VideoTypeOrmEntity)
      .set({ isAdoption: true })
      .where('id = :id', { id: videoId })
      .execute();
  }

  async findQuestion(questionId: number): Promise<VideoTypeOrmEntity> {
    return this.videoEntityRepository
      .createQueryBuilder('video')
      .select()
      .where('video.id = :question_id', { question_id: questionId })
      .andWhere('video.question IS NULL')
      .getOne();
  }

  findUsersQuestion(questionId: number, userId: number) {
    return this.videoEntityRepository
      .createQueryBuilder('video')
      .select('video.id')
      .where('video.question = :question_id', { question_id: questionId })
      .andWhere('video.user_id = :user_id', { user_id: userId })
      .getOne();
  }

  findUsersVideo(videoId: number, userId: number) {
    return this.videoEntityRepository
      .createQueryBuilder('video')
      .select('video.id')
      .where('video.id = :video_id', { video_id: videoId })
      .andWhere('video.user_id = :user_id', { user_id: userId })
      .getOne();
  }

  async userQuestionList(userId: number): Promise<Video[]> {
    const videos: any[] = await this.videoEntityRepository
      .createQueryBuilder('video')
      .select('video.id', 'id')
      .addSelect('video.video_url', 'videoUrl')
      .where('video.user_id = :user_id', { user_id: userId })
      .andWhere('video.question IS NULL')
      .getRawMany();
    return videos.map((video) => new Video(video));
  }

  async deleteQuestion(videoId: number): Promise<void> {
    await this.videoEntityRepository.softDelete(videoId);
  }

  async deleteVideoAnswer(questionId: any): Promise<void> {
    await this.videoEntityRepository.softDelete({ question: questionId });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from 'src/domain/model/video';
import { VideoRepository } from 'src/domain/repositories/video.repository';
import { CreateVideoAnswerDto } from 'src/presentation/answer/answer.dto';
import { CreateQuestionDto } from 'src/presentation/question/question.dto';
import { Repository } from 'typeorm';
import { HashTagTypeOrmEntity } from '../entities/hash-tag.entity';
import { LikeTypeOrmEntity } from '../entities/like.entity';
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

    @InjectRepository(LikeTypeOrmEntity)
    private readonly likeEntityRepository: Repository<LikeTypeOrmEntity>,
  ) {}

  async findQuestionList(userId: number, page: number, size: number): Promise<Video[]> {
    const videos: any[] = await this.videoEntityRepository
      .createQueryBuilder('video')
      .leftJoin('video.comments', 'comment')
      .leftJoin('video.likes', 'like')
      .leftJoin('video.hashTags', 'hash_tag')
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

    return Promise.all(
      videos.map(async (video) => {
        video.isMine = video.userId == userId ? true : false;
        video.isLike = !!(await this.findLike(userId, video.id));
        return new Video(video);
      }),
    );
  }

  async save(video: CreateQuestionDto, userId: number): Promise<void> {
    const user: UserTypeOrmEntity = await this.userEntityRepository.findOne(userId);
    const thumbnail = video.videoUrl;
    thumbnail.replace('mov', 'png');
    thumbnail.replace('mp4', 'png');

    const videoEntity: VideoTypeOrmEntity = await this.videoEntityRepository.save({
      description: video.description,
      title: video.title,
      videoUrl: video.videoUrl,
      thumbnail,
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

  async findVideoAnswerList(questionId: number, userId: number, page: number, size: number): Promise<Video[]> {
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

    return Promise.all(
      videos.map(async (video) => {
        video.isMine = video.userId == userId ? true : false;
        video.isLike = !!(await this.findLike(userId, video.id));
        return new Video(video);
      }),
    );
  }

  async findQuestionDetail(videoId: number, userId: number): Promise<Video> {
    const video: any = await this.videoEntityRepository
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
      .where('video.question IS NULL')
      .andWhere('video.id = :video_id', { video_id: videoId })
      .groupBy('video.id')
      .getRawOne();

    video.isMine = video.userId == userId ? true : false;
    video.isLike = !!(await this.findLike(userId, video.id));
    return new Video(video);
  }

  async createVideoAnswer(request: CreateVideoAnswerDto, userId: number, questionId: number): Promise<void> {
    const user: UserTypeOrmEntity = await this.userEntityRepository.findOne(userId);
    const question: VideoTypeOrmEntity = await this.videoEntityRepository.findOne(questionId);

    await this.videoEntityRepository.save({
      title: request.title,
      videoUrl: request.videoUrl,
      thumbnail: request.videoUrl.split('.')[0] + '.png',
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

  async findOne(id: number): Promise<Video> {
    const question = await this.videoEntityRepository.createQueryBuilder('video').select().where('video.id = :id', { id }).getOne();
    return question ? new Video(question) : null;
  }

  findUsersQuestion(questionId: number, userId: number) {
    return this.videoEntityRepository
      .createQueryBuilder('video')
      .select()
      .where('video.id = :question_id', { question_id: questionId })
      .andWhere('video.user_id = :user_id', { user_id: userId })
      .andWhere('video.question IS NULL')
      .getOne();
  }

  findUsersVideo(videoId: number, userId: number) {
    return this.videoEntityRepository
      .createQueryBuilder('video')
      .select()
      .where('video.id = :id', { id: videoId })
      .andWhere('video.user_id = :user_id', { user_id: userId })
      .getOne();
  }

  async userQuestionList(userId: number, page: number, size: number): Promise<Video[]> {
    const videos: any[] = await this.videoEntityRepository
      .createQueryBuilder('video')
      .leftJoin('video.comments', 'comment')
      .leftJoin('video.likes', 'like')
      .innerJoin('video.user', 'user')
      .select('video.id', 'id')
      .addSelect('video.title')
      .addSelect('video.description')
      .addSelect('video.video_url', 'videoUrl')
      .addSelect('video.thumbnail', 'thumbnail')
      .addSelect('video.created_at', 'createdAt')
      .addSelect('user.id')
      .addSelect('user.profile')
      .addSelect('COUNT(comment.id)', 'commentCnt')
      .addSelect('COUNT(like.id)', 'likeCnt')
      .offset((page - 1) * size)
      .limit(size)
      .where('video.user_id = :user_id', { user_id: userId })
      .andWhere('video.question IS NULL')
      .groupBy('video.id')
      .getRawMany();
    return videos.map((video) => new Video(video));
  }

  async deleteQuestion(videoId: number): Promise<void> {
    await this.videoEntityRepository.softDelete(videoId);
  }

  async deleteVideoAnswer(questionId: any): Promise<void> {
    await this.videoEntityRepository.softDelete({ question: questionId });
  }

  private findLike(userId: number, videoId: number) {
    return this.likeEntityRepository
      .createQueryBuilder('like')
      .select()
      .where('like.user_id = :user_id', { user_id: userId })
      .andWhere('like.video_id = :video_id', { video_id: videoId })
      .getOne();
  }
}

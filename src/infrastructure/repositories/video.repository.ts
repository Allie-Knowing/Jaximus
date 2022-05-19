import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from 'src/domain/model/video';
import { VideoRepository } from 'src/domain/repositories/video.repository';
import { CreateVideoAnswerDto } from 'src/presentation/answer/answer.dto';
import { GetAnswerCountPresenter } from 'src/presentation/question/get-answer-count.presenter';
import { CreateQuestionDto } from 'src/presentation/question/question.dto';
import { Repository } from 'typeorm';
import { BlockTypeOrmEntity } from '../entities/block.entity';
import { HashTagTypeOrmEntity } from '../entities/hash-tag.entity';
import { IqTypeOrmEntity } from '../entities/iq.entity';
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

    @InjectRepository(IqTypeOrmEntity)
    private readonly iqEntityRepository: Repository<IqTypeOrmEntity>,

    @InjectRepository(BlockTypeOrmEntity)
    private readonly blockEntityRepository: Repository<BlockTypeOrmEntity>,
  ) {}
  async findAnswerCount(videoId: number): Promise<GetAnswerCountPresenter> {
    const count: any = await this.videoEntityRepository
      .createQueryBuilder('video')
      .select('COUNT(1)', 'videoAnswerCnt')
      .where('video.question_id = :videoId', { videoId })
      .getRawOne();

    return new GetAnswerCountPresenter(count);
  }

  findVideoOwner(videoId: number): Promise<{ userId: number }> {
    return this.videoEntityRepository
      .createQueryBuilder('video')
      .select('user.id', 'userId')
      .innerJoin('video.user', 'user')
      .where('video.id = :video_id', { video_id: videoId })
      .getRawOne();
  }

  async findQuestionVideoList(videoIds: number[], userId: number): Promise<Video[]> {
    return Promise.all(
      videoIds.map(async (videoId) => {
        const video: any = await this.videoEntityRepository
          .createQueryBuilder('video')
          .leftJoin('video.comments', 'comment')
          .leftJoin('video.likes', 'like')
          .leftJoin('video.hashTags', 'hash_tag')
          .innerJoin('video.user', 'user')
          .select('video.id', 'id')
          .addSelect('video.videoUrl', 'videoUrl')
          .addSelect('video.title', 'title')
          .addSelect('video.is_adoption', 'isAdoption')
          .addSelect('video.description', 'description')
          .addSelect('video.createdAt', 'createdAt')
          .addSelect('user.id', 'userId')
          .addSelect('user.profile', 'profile')
          .addSelect('COUNT(distinct comment.id)', 'commentCnt')
          .addSelect('COUNT(distinct like.id)', 'likeCnt')
          .where('video.question IS NULL')
          .andWhere('video.id = :video_id', { video_id: videoId })
          .orderBy('video.createdAt', 'DESC')
          .groupBy('video.id')
          .getRawOne();

        if (!video) return;

        video.isMine = video.userId == userId ? true : false;
        video.isLike = !!(await this.findLike(userId, video.id));
        return new Video(video);
      }),
    );
  }

  async findQuestionList(userId: number, page: number, size: number): Promise<Video[]> {
    const subquery = this.blockEntityRepository
      .createQueryBuilder('block')
      .select('block.blockUserId', 'blockUserId')
      .where('block.userId = :userId', { userId });
    const videos: any[] = await this.videoEntityRepository
      .createQueryBuilder('video')
      .leftJoin('video.comments', 'comment')
      .leftJoin('video.likes', 'like')
      .leftJoin('video.hashTags', 'hash_tag')
      .innerJoin('video.user', 'user')
      .select('video.id', 'id')
      .addSelect('video.videoUrl', 'videoUrl')
      .addSelect('video.title', 'title')
      .addSelect('video.is_adoption', 'isAdoption')
      .addSelect('video.description', 'description')
      .addSelect('video.createdAt', 'createdAt')
      .addSelect('user.id', 'userId')
      .addSelect('user.profile', 'profile')
      .addSelect('COUNT(distinct comment.id)', 'commentCnt')
      .addSelect('COUNT(distinct like.id)', 'likeCnt')
      .offset((page - 1) * size)
      .limit(size)
      .where('video.question IS NULL')
      .andWhere('user.id NOT IN' + '(' + subquery.getQuery() + ')', { userId })
      .orderBy('video.createdAt', 'DESC')
      .groupBy('video.id')
      .getRawMany();

    if (!videos) return;
    function shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }

      return array;
    }
    shuffle(videos);

    return Promise.all(
      videos.map(async (video) => {
        video.isMine = video.userId == userId ? true : false;
        video.isLike = !!(await this.findLike(userId, video.id));
        return new Video(video);
      }),
    );
  }

  async save(video: CreateQuestionDto, userId: number): Promise<VideoTypeOrmEntity> {
    const user: UserTypeOrmEntity = await this.userEntityRepository.findOne(userId);

    const videoEntity: VideoTypeOrmEntity = await this.videoEntityRepository.save({
      description: video.description,
      title: video.title,
      videoUrl: video.videoUrl,
      //compensation: video.compensation,
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

    return videoEntity;
  }

  async findVideoAnswerList(questionId: number, userId: number, page: number, size: number): Promise<Video[]> {
    const videos: any[] = await this.videoEntityRepository
      .createQueryBuilder('video')
      .select('video.id', 'id')
      .addSelect('video.video_url', 'videoUrl')
      .addSelect('video.title', 'title')
      .addSelect('video.is_adoption', 'isAdoption')
      .addSelect('SUBSTR(video.created_at, 1, 10)', 'createdAt')
      .addSelect('user.id', 'userId')
      .addSelect('user.profile', 'profile')
      .addSelect('COUNT(distinct like.id)', 'likeCnt')
      .offset((page - 1) * size)
      .limit(size)
      .where('video.question = :question_id', { question_id: questionId })
      .andWhere('video.isAdoption = 0')
      .orderBy('video.createdAt', 'DESC')
      .leftJoin('video.user', 'user')
      .leftJoin('video.likes', 'like')
      .groupBy('video.id')
      .getRawMany();

    if (videos.length === 0 && page !== 1) return;

    const adoptionVideoAnswer = await this.findAdoptionVideoAnswer(questionId, userId);

    if (adoptionVideoAnswer) videos.unshift(adoptionVideoAnswer);

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
      .addSelect('video.is_adoption', 'isAdoption')
      .addSelect('video.description', 'description')
      .addSelect('video.createdAt', 'createdAt')
      .addSelect('user.id', 'userId')
      .addSelect('user.profile', 'profile')
      .addSelect('COUNT(distinct comment.id)', 'commentCnt')
      .addSelect('COUNT(distinct like.id)', 'likeCnt')
      .where('video.question IS NULL')
      .andWhere('video.id = :video_id', { video_id: videoId })
      .groupBy('video.id')
      .getRawOne();

    if (!video) return;

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

  async videoAdoption(videoId: number, userId: number): Promise<void> {
    await this.videoEntityRepository
      .createQueryBuilder()
      .update(VideoTypeOrmEntity)
      .set({ isAdoption: true })
      .where('id = :id', { id: videoId })
      .execute();

    await this.userEntityRepository
      .createQueryBuilder()
      .update(UserTypeOrmEntity)
      .set({ adoptionCnt: () => `adoption_cnt + 1` })
      .where('id = :id', { id: userId })
      .execute();

    await this.compensation(videoId);
  }

  private async compensation(videoId: number) {
    const video: any = await this.videoEntityRepository
      .createQueryBuilder('video')
      .select('video.compensation', 'compensation')
      .addSelect('video.user_id', 'userId')
      .andWhere('video.id = :id', { id: videoId })
      .getRawOne();

    await this.iqEntityRepository
      .createQueryBuilder('iq')
      .update(IqTypeOrmEntity)
      .set({ curCnt: () => `cur_cnt + ${video.compensation}`, totCnt: () => `tot_cnt + ${video.compensation}` })
      .where('user_id = :user_id', { user_id: video.userId })
      .execute();
  }

  async findOne(id: number): Promise<Video> {
    const question = await this.videoEntityRepository
      .createQueryBuilder('video')
      .select()
      .addSelect('user.id', 'user_id')
      .innerJoin('video.user', 'user')
      .where('video.id = :id', { id })
      .getOne();
    return question ? new Video(question) : null;
  }

  async findUsersQuestion(questionId: number, userId: number): Promise<Video> {
    const question: any = await this.videoEntityRepository
      .createQueryBuilder('video')
      .select()
      .where('video.id = :question_id', { question_id: questionId })
      .andWhere('video.user_id = :user_id', { user_id: userId })
      .andWhere('video.question IS NULL')
      .getOne();

    if (!question) return;

    return new Video(question);
  }

  async findUsersVideo(videoId: number, userId: number): Promise<Video> {
    const video: any = await this.videoEntityRepository
      .createQueryBuilder('video')
      .select()
      .where('video.id = :id', { id: videoId })
      .andWhere('video.user_id = :user_id', { user_id: userId })
      .getOne();

    if (!video) return;

    return new Video(video);
  }

  async userQuestionList(userId: number, page: number, size: number): Promise<Video[]> {
    const videos: any[] = await this.videoEntityRepository
      .createQueryBuilder('video')
      .leftJoin('video.comments', 'comment')
      .leftJoin('video.likes', 'like')
      .innerJoin('video.user', 'user')
      .select('video.id', 'id')
      .addSelect('video.title')
      .addSelect('video.is_adoption', 'isAdoption')
      .addSelect('video.description')
      .addSelect('video.video_url', 'videoUrl')
      .addSelect('video.thumbnail', 'thumbnail')
      .addSelect('video.created_at', 'createdAt')
      .addSelect('video.views', 'views')
      .addSelect('user.id', 'userId')
      .addSelect('user.profile')
      .addSelect('COUNT(distinct comment.id)', 'commentCnt')
      .addSelect('COUNT(distinct like.id)', 'likeCnt')
      .offset((page - 1) * size)
      .limit(size)
      .where('video.user_id = :user_id', { user_id: userId })
      .andWhere('video.question IS NULL')
      .orderBy('video.created_at', 'DESC')
      .groupBy('video.id')
      .getRawMany();

    if (!videos) return;

    return Promise.all(
      videos.map(async (video) => {
        video.isMine = video.userId == userId ? true : false;
        video.isLike = !!(await this.findLike(userId, video.id));
        return new Video(video);
      }),
    );
  }

  async userAnswerList(userId: number, page: number, size: number): Promise<Video[]> {
    const videos: any[] = await this.videoEntityRepository
      .createQueryBuilder('video')
      .leftJoin('video.question', 'question')
      .leftJoin('question.comments', 'comment')
      .leftJoin('question.likes', 'like')
      .innerJoin('question.user', 'user')
      .select('question.id', 'id')
      .addSelect('question.title', 'video_title')
      .addSelect('question.is_adoption', 'isAdoption')
      .addSelect('question.description', 'video_description')
      .addSelect('question.video_url', 'videoUrl')
      .addSelect('question.thumbnail', 'thumbnail')
      .addSelect('question.created_at', 'createdAt')
      .addSelect('question.views', 'views')
      .addSelect('user.id', 'userId')
      .addSelect('user.profile')
      .addSelect('COUNT(distinct comment.id)', 'commentCnt')
      .addSelect('COUNT(distinct like.id)', 'likeCnt')
      .offset((page - 1) * size)
      .limit(size)
      .where('video.user_id = :user_id', { user_id: userId })
      .andWhere('video.question IS NOT NULL')
      .orderBy('video.created_at', 'DESC')
      .groupBy('question.id')
      .getRawMany();

    if (!videos) return;

    return Promise.all(
      videos.map(async (video) => {
        video.isMine = video.userId == userId ? true : false;
        video.isLike = !!(await this.findLike(userId, video.id));
        return new Video(video);
      }),
    );
  }

  async deleteVideo(videoId: number): Promise<void> {
    await this.videoEntityRepository.softDelete(videoId);
  }

  private findLike(userId: number, videoId: number) {
    return this.likeEntityRepository
      .createQueryBuilder('like')
      .select()
      .where('like.user_id = :user_id', { user_id: userId })
      .andWhere('like.video_id = :video_id', { video_id: videoId })
      .getOne();
  }

  async findAdoptionVideoAnswer(questionId: number, userId: number): Promise<Video> {
    const videoAnswer: any = await this.videoEntityRepository
      .createQueryBuilder('video')
      .select('video.id', 'id')
      .addSelect('video.video_url', 'videoUrl')
      .addSelect('video.title', 'title')
      .addSelect('SUBSTR(video.created_at, 1, 10)', 'createdAt')
      .addSelect('COUNT(distinct like.id)', 'likeCnt')
      .addSelect('user.profile', 'profile')
      .addSelect('video.is_adoption', 'isAdoption')
      .addSelect('user.id', 'userId')
      .where('video.question = :question_id', { question_id: questionId })
      .andWhere('video.is_adoption = 1')
      .leftJoin('video.user', 'user')
      .leftJoin('video.likes', 'like')
      .groupBy('video.id')
      .getRawOne();

    if (!videoAnswer) return;
    videoAnswer.isMine = videoAnswer.userId == userId ? true : false;
    return new Video(videoAnswer);
  }

  async findVideoAnswerDetail(videoId: number, userId: number): Promise<Video> {
    const videoAnswer: any = await this.videoEntityRepository
      .createQueryBuilder('video')
      .select('video.id', 'id')
      .addSelect('video.video_url', 'videoUrl')
      .addSelect('video.title', 'title')
      .addSelect('video.is_adoption', 'isAdoption')
      .addSelect('SUBSTR(video.created_at, 1, 10)', 'createdAt')
      .addSelect('user.id', 'userId')
      .addSelect('user.profile', 'profile')
      .addSelect('COUNT(distinct like.id)', 'likeCnt')
      .where('video.id = :video_id', { video_id: videoId })
      .leftJoin('video.user', 'user')
      .leftJoin('video.likes', 'like')
      .groupBy('video.id')
      .getRawOne();

    if (!videoAnswer) return;
    videoAnswer.isMine = videoAnswer.userId == userId ? true : false;
    videoAnswer.isLike = !!(await this.findLike(userId, videoAnswer.id));

    return new Video(videoAnswer);
  }

  async checkVideoAnswer(videoId: number): Promise<Video> {
    const videoAnswer: any = await this.videoEntityRepository
      .createQueryBuilder('video')
      .select('video.id', 'id')
      .addSelect('video.question_id', 'questionId')
      .addSelect('video.is_adoption', 'isAdoption')
      .addSelect('video.user_id', 'userId')
      .where('video.id = :id', { id: videoId })
      .andWhere('video.question IS NOT NULL')
      .getRawOne();

    if (!videoAnswer) return;

    return new Video(videoAnswer);
  }

  async checkAdoption(questionId: number) {
    return await this.videoEntityRepository
      .createQueryBuilder('video')
      .select()
      .where('video.question_id = :question_id', { question_id: questionId })
      .andWhere('video.is_adoption = 1 OR comment.is_adoption = 1 AND comment.video_id = :question_id', { question_id: questionId })
      .leftJoin('video.comments', 'comment')
      .getCount();
  }

  async isMine(questionId: number, userId: number) {
    return await this.videoEntityRepository
      .createQueryBuilder('video')
      .select()
      .where('video.id = :question_id', { question_id: questionId })
      .andWhere('video.user_id = :user_id', { user_id: userId })
      .getOne();
  }

  async videoViews(videoId: number): Promise<void> {
    await this.videoEntityRepository
      .createQueryBuilder()
      .update(VideoTypeOrmEntity)
      .set({ views: () => `views + 1` })
      .where('id = :id', { id: videoId })
      .execute();
  }
}

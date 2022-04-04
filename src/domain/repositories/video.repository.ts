import { VideoTypeOrmEntity } from 'src/infrastructure/entities/video.entity';
import { CreateVideoAnswerDto } from 'src/presentation/answer/answer.dto';
import { CreateQuestionDto } from 'src/presentation/question/question.dto';
import { Video } from '../model/video';

export interface VideoRepository {
  save(video: CreateQuestionDto, userId: number): Promise<void>;
  findOne(videoId: number);
  findQuestionList(page: number, size: number): Promise<Video[]>;
  findVideoAnswerList(questionId: number, page: number, size: number): Promise<Video[]>;
  createVideoAnswer(request: CreateVideoAnswerDto, userId: number, question: VideoTypeOrmEntity): Promise<void>;
  videoAdoption(videoId: number): Promise<void>;
  userQuestionList(userId: number): Promise<Video[]>;
  deleteQuestion(videoId: number): Promise<void>;
  deleteVideoAnswer(questionId): Promise<void>;
  findUsersQuestion(videoId: number, userId: number);
  checkQuestion(questionId: number): Promise<number>;
  findUsersVideo(videoId: number, userId: number);
}

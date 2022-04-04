import { Video } from '../model/video';
import { CreateVideoAnswerDto } from './dto/answer.dto';

export interface VideoRepository {
  save(video: Video): Promise<void>;
  findOne(videoId: number);
  findQuestionList(page: number, size: number): Promise<Video[]>;
  findVideoAnswerList(questionId: number, page: number, size: number): Promise<Video[]>;
  createVideoAnswer(request: CreateVideoAnswerDto, userId: number, questionId: number): Promise<void>;
  videoAdoption(videoId: number): Promise<void>;
  userQuestionList(userId: number): Promise<Video[]>;
  deleteQuestion(videoId: number): Promise<void>;
  deleteVideoAnswer(questionId): Promise<void>;
  findUsersQuestion(videoId: number, userId: number);
  findQuestion(questionId: number): Promise<Video>;
  findUsersVideo(videoId: number, userId: number);
}

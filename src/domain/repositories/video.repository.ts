import { Video } from '../model/video';
import { GetUserQuestionListPresenter } from './dto/user.dto';

export interface VideoRepository {
  save(video: Video): Promise<void>;
  findOne(videoId: number);
  getQuestionList(): Promise<Video[]>;
  getVideoAnswerList(questionId: number): Promise<Video[]>;
  createVideoAnswer(video: Video): Promise<void>;
  videoAdoption(videoId: number): Promise<void>;
  userQuestionList(userId: number): Promise<GetUserQuestionListPresenter[]>;
  deleteQuestion(videoId: number): Promise<void>;
  deleteVideoAnswer(questionId): Promise<void>;
  findUsersQuestion(videoId: number, userId: number);
  findQuestion(questionId: number): Promise<Video>;
  findUsersVideo(videoId: number, userId: number);
}

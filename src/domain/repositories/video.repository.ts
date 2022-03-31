import { Video } from '../model/video';
import { GetUserQuestionListPresenter } from './dto/user.dto';
import { GetVideoAnswerList } from './dto/video.dto';

export interface VideoRepository {
  save(video: Video): Promise<void>;
  findOne(videoId: number);
  getQuestionList(): Promise<Video[]>;
  getVideoAnswerList(questionId: number): Promise<GetVideoAnswerList[]>;
  createVideoAnswer(video: Video): Promise<void>;
  videoAdoption(videoId: number): Promise<void>;
  findQuestion(questionId: number);
  matchUser(userId: number);
  userQuestionList(userId: number): Promise<GetUserQuestionListPresenter[]>;
}

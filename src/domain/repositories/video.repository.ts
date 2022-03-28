import { Video } from '../model/video';
import { GetVideoCommentList } from './dto/video.dto';

export interface VideoRepository {
  save(video: Video): Promise<void>;
  findOne(videoId: number);
  getQuestionList(): Promise<Video[]>;
  getVideoCommentList(videoId: number): Promise<GetVideoCommentList[]>;
  createVideoComment(video: Video): Promise<void>;
  videoAdoption(videoId: number): Promise<void>;
  findQuestion(questionId: number);
}

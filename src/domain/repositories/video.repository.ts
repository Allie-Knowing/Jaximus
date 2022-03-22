import { Video } from '../model/video';
import { GetVideoCommentList } from './dto/video.dto';
import { QuestionList } from './dto/video.dto';

export interface VideoRepository {
  save(video: Video): Promise<void>;
  findOne(videoId: number);
  getQuestionList(): Promise<QuestionList[]>;
  getVideoCommentList(videoId: number): Promise<GetVideoCommentList[]>;
  createVideoComment(video: Video): Promise<void>;
}

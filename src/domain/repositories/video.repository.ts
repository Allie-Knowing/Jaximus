import { Video } from '../model/video';
import { GetVideoCommentList } from './dto/video.dto';
import { QuestionList } from './dto/video.dto';


export interface VideoRepository {
  save(video: Video): Promise<void>;
  getQuestionList(): Promise<QuestionList[]>;
  getVideoCommentList(video_id: number): Promise<GetVideoCommentList[]>;
  createVideoComment(video: Video): Promise<void>;
}
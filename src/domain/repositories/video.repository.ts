import { GetQuestionListPresenter } from 'src/presentation/video/video.presenter';
import { Video } from '../model/video';
import { GetVideoCommentList } from './dto/video.dto';

export interface VideoRepository {
  save(video: Video): Promise<void>;
  getQuestionList(): Promise<GetQuestionListPresenter[]>;
  getVideoCommentList(video_id: number): Promise<GetVideoCommentList[]>;
}

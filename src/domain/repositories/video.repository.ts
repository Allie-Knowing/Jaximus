import { GetQuestionListPresenter } from 'src/presentation/video/video.presenter';
import { Video } from '../model/video';

export interface VideoRepository {
  save(video: Video): Promise<void>;
  getQuestionList(): Promise<GetQuestionListPresenter[]>;
}

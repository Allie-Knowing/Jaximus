import { GetQuestionListPresenter } from 'src/infrastructure/controllers/video/video.presenter';
import { Video } from '../model/video';

export interface VideoRepository {
  save(video: Video): Promise<void>;
  getQuestionList(): Promise<GetQuestionListPresenter[]>;
}

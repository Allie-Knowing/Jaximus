import { Video } from '../model/video';
import { QuestionList } from './dto/video.dto';

export interface VideoRepository {
  save(video: Video): Promise<void>;
  getQuestionList(): Promise<QuestionList[]>;
  createVideoComment(video: Video): Promise<void>;
}

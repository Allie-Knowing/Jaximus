import { Video } from '../model/video';

export interface VideoRepository {
  save(video: Video): Promise<void>;
  createVideoComment(video: Video): Promise<void>;
}

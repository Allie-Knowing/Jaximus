import { User } from '../model/user';
import { Video } from '../model/video';

export interface LikeRepository {
  findOne(videoId: number, userId: number);
  save(user: User, video: Video);
  deleteLike(videoId: number, userId: number): Promise<void>;
}

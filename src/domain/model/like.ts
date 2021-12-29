import { UserM } from './user';
import { VideoM } from './video';

export class LikeM {
  id: number;
  user: UserM;
  video: VideoM;
}

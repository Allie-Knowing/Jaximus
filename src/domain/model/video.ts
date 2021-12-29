import { CommentM } from './comment';
import { HashTagM } from './hash-tag';
import { LikeM } from './like';

export class VideoM {
  id: number;
  description: string;
  title: string;
  video_url: string;
  likes: LikeM[];
  answers: VideoM[];
  hashTags: HashTagM[];
  comments: CommentM[];
  question: VideoM;
}

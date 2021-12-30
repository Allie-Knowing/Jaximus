import { Comment } from './comment';
import { HashTag } from './hash-tag';
import { Like } from './like';

export class Video {
  id: number;
  description: string;
  title: string;
  video_url: string;
  likes: Like[];
  answers: Video[];
  hashTags: HashTag[];
  comments: Comment[];
  question: Video;
}

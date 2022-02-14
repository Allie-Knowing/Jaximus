import { Comment } from './comment';
import { HashTag } from './hash-tag';
import { Like } from './like';

export class Video {
  id: number;
  description: string;
  title: string;
  videoUrl: string;
  likes: Like[];
  answers: Video[];
  hashTags: string[];
  comments: Comment[];
  question: Video;
  userId: number;
}

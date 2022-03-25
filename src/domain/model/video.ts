import { Comment } from './comment';
import { Like } from './like';

export class Video {
  id: number;
  description: string;
  title: string;
  videoUrl: string;
  createdAt: Date;
  isAdoption: boolean;
  likes: Like[];
  answers: Video[];
  hashTags: string[];
  comments: Comment[];
  question: Video;
  userId: number;
}

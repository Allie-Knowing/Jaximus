import { Video } from './video';

export class Comment {
  id: number;
  content: string;
  childComments: Comment[];
  video: Video;
  parentComment: Comment;
}

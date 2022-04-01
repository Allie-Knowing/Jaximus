import { Video } from './video';

export class Comment {
  id: number;
  content: string;
  isAdoption: boolean;
  childComments: Comment[];
  video: Video;
  parentComment: Comment;
  userId: number;
  deletedAt: Date;
}

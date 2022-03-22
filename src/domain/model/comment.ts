import { Video } from './video';

export class Comment {
  id: number;
  content: string;
  idAdoption: boolean;
  childComments: Comment[];
  video: Video;
  parentComment: Comment;
}

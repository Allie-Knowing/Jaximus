import { VideoM } from './video';

export class CommentM {
  id: number;
  content: string;
  childComments: CommentM[];
  video: VideoM;
  parentComment: CommentM;
}

import { Video } from '../model/video';

export interface CommentRepository {
  findOne(commentId: number);
  commentAdoption(commentId: number): Promise<void>;
  deleteCommentAnswer(commentId: number): Promise<void>;
  findComment(commentId: number, userId: number);
  createCommentAnswer(content: string, question: Video, userId: number): Promise<void>;
}

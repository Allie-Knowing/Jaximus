import { Comment } from '../model/comment';

export interface CommentRepository {
  findOne(commentId: number);
  commentAdoption(commentId: number): Promise<void>;
  deleteCommentAnswer(commentId: number): Promise<void>;
  findComment(commentId: number, userId: number);
  createCommentAnswer(content: string, questionId: number, userId: number): Promise<void>;
  findTextAnswer(questionId: number, page: number, size: number): Promise<Comment[]>;
}

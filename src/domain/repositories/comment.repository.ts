import { Comment } from '../model/comment';

export interface CommentRepository {
  findOne(commentId: number): Promise<Comment>;
  commentAdoption(commentId: number, videoId: number, userId: number): Promise<void>;
  deleteCommentAnswer(commentId: number): Promise<void>;
  findComment(commentId: number, userId: number);
  createCommentAnswer(content: string, questionId: number, userId: number): Promise<void>;
  findTextAnswer(questionId: number, userId: number, page: number, size: number): Promise<Comment[]>;
}

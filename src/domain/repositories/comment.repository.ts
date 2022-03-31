export interface CommentRepository {
  findOne(commentId: number);
  commentAdoption(commentId: number): Promise<void>;
  deleteCommentAnswer(commentId: number): Promise<void>;
  findComment(commentId: number, userId: number);
}

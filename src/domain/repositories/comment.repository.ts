export interface CommentRepository {
  findOne(commentId: number);
  commentAdoption(commentId: number): Promise<void>;
  deleteCommentAnswer(commentId: number): Promise<void>;
  matchUser(userId: number);
}

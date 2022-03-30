export interface CommentRepository {
  findOne(commentId: number);
  commentAdoption(commentId: number): Promise<void>;
  deleteAnswerComment(commentId: number): Promise<void>;
  matchUser(userId: number);
}

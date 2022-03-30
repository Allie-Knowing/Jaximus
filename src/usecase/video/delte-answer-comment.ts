import { IException } from 'src/domain/exceptions/exceptions.interface';
import { CommentRepository } from 'src/domain/repositories/comment.repository';

export class DeleteAnswerCommentUsecase {
  constructor(private readonly commentRepository: CommentRepository, private readonly exceptionsService: IException) {}

  async execute(commentId: number, userId: number) {
    const comment = await this.commentRepository.findOne(commentId);
    if (!comment) this.exceptionsService.commentNotFoundException();

    const matchUser = await this.commentRepository.matchUser(userId);
    if (matchUser === 0) this.exceptionsService.forbiddenException();

    this.commentRepository.deleteAnswerComment(commentId);
  }
}

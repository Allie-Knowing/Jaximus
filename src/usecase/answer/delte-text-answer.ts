import { IException } from 'src/domain/exceptions/exceptions.interface';
import { CommentRepository } from 'src/domain/repositories/comment.repository';

export class DeleteTextAnswerUsecase {
  constructor(private readonly commentRepository: CommentRepository, private readonly exceptionsService: IException) {}

  async execute(commentId: number, userId: number) {
    const comment = await this.commentRepository.findComment(commentId, userId);
    if (!comment) this.exceptionsService.commentNotFoundException();

    this.commentRepository.deleteCommentAnswer(commentId);
  }
}

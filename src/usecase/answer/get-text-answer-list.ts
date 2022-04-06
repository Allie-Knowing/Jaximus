import { IException } from 'src/domain/exceptions/exceptions.interface';
import { Comment } from 'src/domain/model/comment';
import { CommentRepository } from 'src/domain/repositories/comment.repository';

export class GetTextAnswerListUsecase {
  constructor(private readonly commentRepository: CommentRepository, private readonly exceptionService: IException) {}

  async execute(questionId: number, userId: number, page: number, size: number): Promise<Comment[]> {
    const textAnswer = await this.commentRepository.findTextAnswer(questionId, userId, page, size);
    if (textAnswer.length === 0) throw this.exceptionService.textAnswerNotFoundException();

    return textAnswer;
  }
}

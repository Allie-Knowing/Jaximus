import { IException } from 'src/domain/exceptions/exceptions.interface';
import { CommentRepository } from 'src/domain/repositories/comment.repository';
import { VideoRepository } from 'src/domain/repositories/video.repository';

export class CreateCommentAnswerUsecase {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly videoRepository: VideoRepository,
    private readonly exceptionsService: IException,
  ) {}

  async execute(content: string, questionId: number, userId: number) {
    const question = await this.videoRepository.findQuestion(questionId);
    if (!question) this.exceptionsService.questionNotFoundException();

    this.commentRepository.createCommentAnswer(content, question, userId);
  }
}

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
    const video = await this.videoRepository.findOne(questionId);
    if (!video) this.exceptionsService.videoNotFoundException();

    const checkQuestion = await this.videoRepository.checkQuestion(video.id);
    if (checkQuestion === 0) this.exceptionsService.itIsNotQuestionException();

    this.commentRepository.createCommentAnswer(content, video, userId);
  }
}

import { IException } from 'src/domain/exceptions/exceptions.interface';
import { VideoRepository } from 'src/domain/repositories/video.repository';

export class DeleteVideoAnswerUsecase {
  constructor(private readonly videoRepository: VideoRepository, private readonly exceptionsService: IException) {}

  async execute(questionId: number, userId: number) {
    const question = await this.videoRepository.findQuestion(questionId);
    if (!question) this.exceptionsService.questionNotFoundException();

    const matchUser = await this.videoRepository.matchUser(userId);
    if (matchUser === 0) this.exceptionsService.forbiddenException();

    this.videoRepository.deleteVideoAnswer(questionId);
  }
}

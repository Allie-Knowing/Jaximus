import { IException } from 'src/domain/exceptions/exceptions.interface';
import { VideoRepository } from 'src/domain/repositories/video.repository';

export class DeleteVideoAnswerUsecase {
  constructor(private readonly videoRepository: VideoRepository, private readonly exceptionsService: IException) {}

  async execute(questionId: number, userId: number) {
    const question = await this.videoRepository.findUsersQuestion(questionId, userId);
    if (!question) this.exceptionsService.questionNotFoundException();

    this.videoRepository.deleteVideoAnswer(questionId);
  }
}

import { IException } from 'src/domain/exceptions/exceptions.interface';
import { Video } from 'src/domain/model/video';
import { VideoRepository } from 'src/domain/repositories/video.repository';

export class CreateVideoAnswerUsecase {
  constructor(private readonly videoRepository: VideoRepository, private readonly exceptionsService: IException) {}

  async execute(userId: number, video: Video, questionId: number) {
    const question = await this.videoRepository.findQuestion(questionId);
    if (question === 0) this.exceptionsService.questionNotFoundException();

    this.videoRepository.createVideoAnswer({ ...video, userId, questionId });
  }
}

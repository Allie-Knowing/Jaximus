import { IException } from 'src/domain/exceptions/exceptions.interface';
import { VideoRepository } from 'src/domain/repositories/video.repository';

export class DeleteQuestionUsecase {
  constructor(private readonly videoRepository: VideoRepository, private readonly exceptionsService: IException) {}

  async execute(videoId: number, userId: number) {
    const video = await this.videoRepository.findOne(videoId);
    if (!video) this.exceptionsService.videoNotFoundException();

    const matchUser = await this.videoRepository.matchUser(userId);
    if (matchUser === 0) this.exceptionsService.forbiddenException();

    this.videoRepository.deleteQuestion(videoId);
  }
}

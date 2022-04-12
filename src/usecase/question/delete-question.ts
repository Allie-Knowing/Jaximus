import { IException } from 'src/domain/exceptions/exceptions.interface';
import { VideoRepository } from 'src/domain/repositories/video.repository';

export class DeleteQuestionUsecase {
  constructor(private readonly videoRepository: VideoRepository, private readonly exceptionsService: IException) {}

  async execute(videoId: number, userId: number) {
    const video = await this.videoRepository.findUsersQuestion(videoId, userId);
    if (!video) this.exceptionsService.videoNotFoundException();

    this.videoRepository.deleteVideo(videoId);
  }
}

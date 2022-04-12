import { IException } from 'src/domain/exceptions/exceptions.interface';
import { VideoRepository } from 'src/domain/repositories/video.repository';

export class DeleteVideoAnswerUsecase {
  constructor(private readonly videoRepository: VideoRepository, private readonly exceptionsService: IException) {}

  async execute(videoId: number, userId: number) {
    const question = await this.videoRepository.findUsersVideo(videoId, userId);

    if (!question) this.exceptionsService.questionNotFoundException();

    this.videoRepository.deleteVideo(videoId);
  }
}

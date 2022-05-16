import { IException } from 'src/domain/exceptions/exceptions.interface';
import { VideoRepository } from 'src/domain/repositories/video.repository';

export class VideoViewsUsecase {
  constructor(private readonly videoRepository: VideoRepository, private readonly exceptionService: IException) {}

  async execute(videoId: number) {
    const video = await this.videoRepository.findOne(videoId);

    if (!video) this.exceptionService.questionNotFoundException();

    this.videoRepository.videoViews(videoId);
  }
}

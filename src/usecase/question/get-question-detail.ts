import { IException } from 'src/domain/exceptions/exceptions.interface';
import { Video } from 'src/domain/model/video';
import { VideoRepository } from 'src/domain/repositories/video.repository';

export class GetQuestionDetailUsecase {
  constructor(private readonly videoRepository: VideoRepository, private readonly exceptionsService: IException) {}

  async execute(videoId: number, userId: number): Promise<Video> {
    const video = await this.videoRepository.findQuestionDetail(videoId, userId);
    if (!video) this.exceptionsService.videoNotFoundException();

    return video;
  }
}

import { IException } from 'src/domain/exceptions/exceptions.interface';
import { LikeRepository } from 'src/domain/repositories/like.repository';
import { VideoRepository } from 'src/domain/repositories/video.repository';

export class DeleteLikeUsecase {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly videoRepository: VideoRepository,
    private readonly exceptionsService: IException,
  ) {}

  async execute(videoId: number, userId: number) {
    const video = await this.videoRepository.findOne(videoId);

    if (!video) this.exceptionsService.videoNotFoundException();

    this.likeRepository.deleteLike(videoId, videoId);
  }
}

import { IException } from 'src/domain/exceptions/exceptions.interface';
import { VideoRepository } from 'src/domain/repositories/video.repository';

export class VideoAdoptionUsecase {
  constructor(private readonly videoRepository: VideoRepository, private readonly exceptionsService: IException) {}

  async execute(videoId: number) {
    const video = await this.videoRepository.findOne(videoId);

    if (!video) this.exceptionsService.videoNotFoundException();
    if (video.isAdoption) this.exceptionsService.adoptionAlreadyExistException();

    this.videoRepository.videoAdoption(videoId);
  }
}

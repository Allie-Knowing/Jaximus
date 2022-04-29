import { IException } from 'src/domain/exceptions/exceptions.interface';
import { VideoRepository } from 'src/domain/repositories/video.repository';

export class VideoAdoptionUsecase {
  constructor(private readonly videoRepository: VideoRepository, private readonly exceptionsService: IException) {}

  async execute(videoId: number, userId: number) {
    const videoAnswer = await this.videoRepository.checkVideoAnswer(videoId);

    if (!videoAnswer) this.exceptionsService.videoNotFoundException();
    if (videoAnswer.isAdoption) this.exceptionsService.adoptionAlreadyExistException();

    const isOwnerQuestion = await this.videoRepository.isMine(videoAnswer.questionId, userId);

    if (!isOwnerQuestion) this.exceptionsService.videoIsNotYoursException();

    const checkAdoption = await this.videoRepository.checkAdoption(videoAnswer.questionId);

    if (checkAdoption !== 0) this.exceptionsService.questionIsAlreadyAdoptedException();

    this.videoRepository.videoAdoption(videoId, videoAnswer.userId);
  }
}

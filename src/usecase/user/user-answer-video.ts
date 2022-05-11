import { IException } from 'src/domain/exceptions/exceptions.interface';
import { Video } from 'src/domain/model/video';
import { VideoRepository } from 'src/domain/repositories/video.repository';

export class UserAnswerListUsecase {
  constructor(private readonly videoRepository: VideoRepository, private readonly exceptionService: IException) {}

  async execute(userId: number, page: number, size: number): Promise<Video[]> {
    const userAnswerList = await this.videoRepository.userAnswerList(userId, page, size);
    if (userAnswerList.length === 0) this.exceptionService.userAnswerNotFoundException();

    return userAnswerList;
  }
}

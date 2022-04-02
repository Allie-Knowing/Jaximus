import { IException } from 'src/domain/exceptions/exceptions.interface';
import { Video } from 'src/domain/model/video';
import { VideoRepository } from 'src/domain/repositories/video.repository';

export class UserQuestionListUsecase {
  constructor(private readonly videoRepository: VideoRepository, private readonly exceptionService: IException) {}

  async execute(userId: number): Promise<Video[]> {
    const userQuestionList = await this.videoRepository.userQuestionList(userId);
    if (userQuestionList.length === 0) this.exceptionService.userQuestionNotFoundException();

    return userQuestionList;
  }
}

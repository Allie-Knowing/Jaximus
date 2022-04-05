import { IException } from 'src/domain/exceptions/exceptions.interface';
import { Video } from 'src/domain/model/video';
import { VideoRepository } from 'src/domain/repositories/video.repository';

export class GetVideoAnswerListUseCase {
  constructor(private readonly videoRepository: VideoRepository, private readonly exceptionsService: IException) {}

  async execute(questionId: number, userId: number, page: number, size: number): Promise<Video[]> {
    const videoAnswerList = await this.videoRepository.findVideoAnswerList(questionId, userId, page, size);
    if (videoAnswerList.length === 0) this.exceptionsService.videoAnswerNotFoundException();
    return videoAnswerList;
  }
}

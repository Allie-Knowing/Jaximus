import { IException } from 'src/domain/exceptions/exceptions.interface';
import { GetVideoAnswerList } from 'src/domain/repositories/dto/video.dto';
import { VideoRepository } from 'src/domain/repositories/video.repository';

export class GetVideoAnswerListUseCases {
  constructor(private readonly videoRepository: VideoRepository, private readonly exceptionsService: IException) {}

  async execute(questionId: number): Promise<GetVideoAnswerList[]> {
    const videoAnswerList = await this.videoRepository.getVideoAnswerList(questionId);
    if (videoAnswerList.length === 0) this.exceptionsService.videoAnswerNotFoundException();
    return videoAnswerList;
  }
}

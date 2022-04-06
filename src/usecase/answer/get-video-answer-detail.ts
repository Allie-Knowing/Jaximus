import { IException } from 'src/domain/exceptions/exceptions.interface';
import { Video } from 'src/domain/model/video';
import { VideoRepository } from 'src/domain/repositories/video.repository';

export class GetVideoAnswerDetailUsecase {
  constructor(private readonly videoRepository: VideoRepository, private readonly exceptionsService: IException) {}

  async execute(questionId: number, userId: number): Promise<Video> {
    const videoAnswer = await this.videoRepository.findVideoAnswerDetail(questionId, userId);
    if (!videoAnswer) this.exceptionsService.videoAnswerNotFoundException();
    return videoAnswer;
  }
}

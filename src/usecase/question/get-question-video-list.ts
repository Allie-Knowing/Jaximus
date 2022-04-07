import { IException } from 'src/domain/exceptions/exceptions.interface';
import { Video } from 'src/domain/model/video';
import { VideoRepository } from 'src/domain/repositories/video.repository';

export class GetQuestionVideoListUsecase {
  constructor(private readonly videoRepository: VideoRepository, private readonly exceptionsService: IException) {}

  async execute(videoIds: number[], userId: number): Promise<Video[]> {
    const questions = await this.videoRepository.findQuestionVideoList(videoIds, userId);
    if (questions.length === 0) this.exceptionsService.questionNotFoundException();
    return questions;
  }
}

import { IException } from 'src/domain/exceptions/exceptions.interface';
import { Video } from 'src/domain/model/video';
import { VideoRepository } from 'src/domain/repositories/video.repository';

export class GetQuestionListUsecase {
  constructor(private readonly videoRepository: VideoRepository, private readonly exceptionsService: IException) {}

  async execute(userId: number, page: number, size: number): Promise<Video[]> {
    const questions = await this.videoRepository.findQuestionList(userId, page, size);
    if (questions.length === 0) this.exceptionsService.questionNotFoundException();
    return questions;
  }
}

import { IException } from 'src/domain/exceptions/exceptions.interface';
import { Video } from 'src/domain/model/video';
import { VideoRepository } from 'src/domain/repositories/video.repository';

export class GetQuestionListUseCases {
  constructor(private readonly videoRepository: VideoRepository, private readonly exceptionsService: IException) {}

  async execute(): Promise<Video[]> {
    const questions = await this.videoRepository.getQuestionList();
    if (questions.length === 0) this.exceptionsService.questionNotFoundException();
    return questions;
  }
}

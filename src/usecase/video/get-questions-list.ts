import { IException } from 'src/domain/exceptions/exceptions.interface';
import { VideoRepository } from 'src/domain/repositories/video.repository';
import { GetQuestionListPresenter } from 'src/presentation/video/video.presenter';

export class GetQuestionListUseCases {
  constructor(private readonly videoRepository: VideoRepository, private readonly exceptionsService: IException) {}

  async execute(): Promise<GetQuestionListPresenter[]> {
    const questions = await this.videoRepository.getQuestionList();
    if (questions.length === 0) this.exceptionsService.questionNotFoundException();
    return questions;
  }
}

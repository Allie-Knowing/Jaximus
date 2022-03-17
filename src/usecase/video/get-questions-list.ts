import { IException } from 'src/domain/exceptions/exceptions.interface';
import { QuestionList } from 'src/domain/repositories/dto/video.dto';
import { VideoRepository } from 'src/domain/repositories/video.repository';

export class GetQuestionListUseCases {
  constructor(private readonly videoRepository: VideoRepository, private readonly exceptionsService: IException) {}

  async execute(): Promise<QuestionList[]> {
    const questions = await this.videoRepository.getQuestionList();
    if (questions.length === 0) this.exceptionsService.questionNotFoundException();
    return questions;
  }
}

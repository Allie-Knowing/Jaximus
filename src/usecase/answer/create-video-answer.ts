import { IException } from 'src/domain/exceptions/exceptions.interface';
import { VideoRepository } from 'src/domain/repositories/video.repository';
import { CreateVideoAnswerDto } from 'src/presentation/answer/answer.dto';

export class CreateVideoAnswerUsecase {
  constructor(private readonly videoRepository: VideoRepository, private readonly exceptionsService: IException) {}

  async execute(userId: number, request: CreateVideoAnswerDto, questionId: number) {
    const question = await this.videoRepository.findOne(questionId);
    if (!question) this.exceptionsService.questionNotFoundException();

    this.videoRepository.createVideoAnswer(request, userId, question);
  }
}

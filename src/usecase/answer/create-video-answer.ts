import { IException } from 'src/domain/exceptions/exceptions.interface';
import { VideoRepository } from 'src/domain/repositories/video.repository';
import { CreateVideoAnswerDto } from 'src/presentation/answer/answer.dto';

export class CreateVideoAnswerUsecase {
  constructor(private readonly videoRepository: VideoRepository, private readonly exceptionsService: IException) {}

  async execute(userId: number, request: CreateVideoAnswerDto, questionId: number) {
    const video = await this.videoRepository.findOne(questionId);
    if (!video) this.exceptionsService.questionNotFoundException();

    const checkQuestion = await this.videoRepository.checkQuestion(video.id);
    if (checkQuestion === 0) this.exceptionsService.itIsNotQuestionException();

    this.videoRepository.createVideoAnswer(request, userId, video);
  }
}

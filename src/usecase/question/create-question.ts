import { VideoRepository } from 'src/domain/repositories/video.repository';
import { CreateQuestionDto } from 'src/presentation/question/question.dto';

export class CreateQuestionUsecase {
  constructor(private readonly videoRepository: VideoRepository) {}

  async execute(video: CreateQuestionDto, userId: number) {
    this.videoRepository.save(video, userId);
  }
}

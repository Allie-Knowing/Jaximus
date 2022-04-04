import { CreateVideoDto } from 'src/domain/repositories/dto/question.dto';
import { VideoRepository } from 'src/domain/repositories/video.repository';

export class CreateQuestionUsecase {
  constructor(private readonly videoRepository: VideoRepository) {}

  async execute(video: CreateVideoDto, userId: number) {
    this.videoRepository.save(video, userId);
  }
}

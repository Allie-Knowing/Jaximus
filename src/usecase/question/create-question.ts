import { Video } from 'src/domain/model/video';
import { VideoRepository } from 'src/domain/repositories/video.repository';

export class CreateQuestionUsecase {
  constructor(private readonly videoRepository: VideoRepository) {}

  async execute(userId: number, video: Video) {
    this.videoRepository.save({ ...video, userId });
  }
}
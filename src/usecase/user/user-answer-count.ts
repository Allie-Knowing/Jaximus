import { VideoRepository } from 'src/domain/repositories/video.repository';

export class UserAnswerCountUsecase {
  constructor(private readonly videoRepository: VideoRepository) {}

  async execute(userId: number): Promise<number> {
    const userAnswerCnt = await this.videoRepository.userAnswerCount(userId);

    return userAnswerCnt;
  }
}

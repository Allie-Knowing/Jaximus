import { VideoRepository } from 'src/domain/repositories/video.repository';

export class UserQuestionCountUsecase {
  constructor(private readonly videoRepository: VideoRepository) {}

  async execute(userId: number): Promise<number> {
    const userQuestionCnt = await this.videoRepository.userQuestionCount(userId);

    return userQuestionCnt;
  }
}

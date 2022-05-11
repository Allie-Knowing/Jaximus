import { VideoRepository } from 'src/domain/repositories/video.repository';
import { GetAnswerCountPresenter } from 'src/presentation/question/get-answer-count.presenter';

export class GetAnswerCountUsecase {
  constructor(private readonly videoRepository: VideoRepository) {}

  async execute(videoId: number): Promise<GetAnswerCountPresenter> {
    return await this.videoRepository.findAnswerCount(videoId);
  }
}

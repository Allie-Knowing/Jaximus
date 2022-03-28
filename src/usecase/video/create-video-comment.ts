import { IException } from 'src/domain/exceptions/exceptions.interface';
import { Video } from 'src/domain/model/video';
import { VideoRepository } from 'src/domain/repositories/video.repository';

export class CreateVideoCommentUsecase {
  constructor(private readonly videoRepository: VideoRepository, private readonly exceptionsService: IException) {}

  async execute(userId: number, video: Video) {
    const question = this.videoRepository.findQuestion(video.questionId);
    if (!question) this.exceptionsService.questionNotFoundException();

    this.videoRepository.createVideoComment({ ...video, userId });
  }
}

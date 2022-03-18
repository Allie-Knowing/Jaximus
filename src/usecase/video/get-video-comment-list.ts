import { IException } from 'src/domain/exceptions/exceptions.interface';
import { GetVideoCommentList } from 'src/domain/repositories/dto/video.dto';
import { VideoRepository } from 'src/domain/repositories/video.repository';

export class GetVideoCommentListUseCases {
  constructor(private readonly videoRepository: VideoRepository, private readonly exceptionsService: IException) {}

  async execute(videoId: number): Promise<GetVideoCommentList[]> {
    const videoCommentList = await this.videoRepository.getVideoCommentList(videoId);
    if (videoCommentList.length === 0) this.exceptionsService.videoCommentNotFoundException();
    return videoCommentList;
  }
}

import { IException } from 'src/domain/exceptions/exceptions.interface';
import { GetVideoCommentList } from 'src/domain/repositories/dto/video.dto';
import { VideoRepository } from 'src/domain/repositories/video.repository';

export class GetVideoCommentListUseCases {
  constructor(private readonly videoRepository: VideoRepository, private readonly exceptionsService: IException) {}

  async execute(video_id: number): Promise<GetVideoCommentList[]> {
    const videoCommentList = await this.videoRepository.getVideoCommentList(video_id);
    if (videoCommentList.length === 0) this.exceptionsService.videoCommentNotFoundException();
    return videoCommentList;
  }
}

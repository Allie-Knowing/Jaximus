import { IException } from 'src/domain/exceptions/exceptions.interface';
import { User } from 'src/domain/model/user';
import { Video } from 'src/domain/model/video';
import { LikeRepository } from 'src/domain/repositories/like.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { VideoRepository } from 'src/domain/repositories/video.repository';

export class CreateLikeUsecase {
  constructor(
    private readonly exceptionsService: IException,
    private readonly likeRepository: LikeRepository,
    private readonly userRepository: UserRepository,
    private readonly videoRepository: VideoRepository,
  ) {}

  async execute(videoId: number, userId: number) {
    const checkTheLike = await this.likeRepository.findOne(videoId, userId);

    if (checkTheLike) this.exceptionsService.likesAlreadyExistException();

    const user: User = await this.userRepository.findOne(userId);
    const video: Video = await this.videoRepository.findOne(videoId);

    await this.likeRepository.save(user, video);
  }
}

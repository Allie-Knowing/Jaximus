import { IException } from 'src/domain/exceptions/exceptions.interface';
import { LikeRepository } from 'src/domain/repositories/like.repository';

export class CreateLikeUsecase {
  constructor(private readonly likeRepository: LikeRepository, private readonly exceptionsService: IException) {}

  async execute(videoId: number, userId: number) {
    const checkTheLike = await this.likeRepository.findOne(videoId, userId);
    if (checkTheLike) this.exceptionsService.likesAlreadyExistException();

    this.likeRepository.createLike(videoId, userId);
  }
}

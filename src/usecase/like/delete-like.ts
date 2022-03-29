import { IException } from 'src/domain/exceptions/exceptions.interface';
import { Like } from 'src/domain/model/like';
import { LikeRepository } from 'src/domain/repositories/like.repository';

export class DeleteLikeUsecase {
  constructor(private readonly likeRepository: LikeRepository, private readonly exceptionsService: IException) {}

  async execute(videoId: number, userId: number) {
    const like: Like = await this.likeRepository.findOne(videoId, userId);

    if (!like) this.exceptionsService.likeNotFoundException();

    this.likeRepository.deleteLike(videoId, userId);
  }
}

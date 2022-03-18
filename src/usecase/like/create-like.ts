import { LikeRepository } from 'src/domain/repositories/like.repository';

export class CreateLikeUsecase {
  constructor(private readonly likeRepository: LikeRepository) {}

  async execute(videoId: number) {
    this.likeRepository.createLike(videoId);
  }
}

import { IException } from 'src/domain/exceptions/exceptions.interface';
import { Like } from 'src/domain/model/like';
import { CacheTemplate, generateCacheTemplate } from 'src/domain/enums/cache.enum';
import { LikeRepository } from 'src/domain/repositories/like.repository';
import { RedisCacheService } from 'src/infrastructure/config/redis/redis-cache.service';

export class DeleteLikeUsecase {
  constructor(
    private readonly cacheService: RedisCacheService,
    private readonly likeRepository: LikeRepository,
    private readonly exceptionsService: IException,
  ) {}

  async execute(videoId: number, userId: number) {
    const like: Like = await this.likeRepository.findOne(videoId, userId);

    if (!like) this.exceptionsService.likeNotFoundException();

    this.likeRepository.deleteLike(videoId, userId);
    this.cacheService.set(generateCacheTemplate(CacheTemplate.ACTION_LIKE, userId), -1);
  }
}

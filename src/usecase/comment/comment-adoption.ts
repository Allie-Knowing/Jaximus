import { CacheTemplate, generateCacheTemplate } from 'src/domain/enums/cache.enum';
import { IException } from 'src/domain/exceptions/exceptions.interface';
import { ActionPointRepository } from 'src/domain/repositories/action-point.repository';
import { CommentRepository } from 'src/domain/repositories/comment.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { VideoRepository } from 'src/domain/repositories/video.repository';
import { RedisCacheService } from 'src/infrastructure/config/redis/redis-cache.service';

export class CommentAdoptionUsecase {
  constructor(
    private readonly cacheService: RedisCacheService,
    private readonly commentRepository: CommentRepository,
    private readonly videoRepository: VideoRepository,
    private readonly userRepository: UserRepository,
    private readonly actionPointRepository: ActionPointRepository,
    private readonly exceptionsService: IException,
  ) {}

  async execute(commentId: number, userId: number, videoId: number) {
    const comment = await this.commentRepository.findOne(commentId);
    const question = await this.videoRepository.findUsersQuestion(videoId, userId);

    if (!question) {
      this.exceptionsService.questionNotFoundException();
    }

    if (!comment) this.exceptionsService.commentNotFoundException();
    if (comment.isAdoption) this.exceptionsService.adoptionAlreadyExistException();

    const checkAdoption = await this.videoRepository.checkAdoption(videoId);

    if (checkAdoption !== 0) this.exceptionsService.questionIsAlreadyAdoptedException();

    this.commentRepository.commentAdoption(commentId, videoId, comment.userId);

    // action point
    if (comment.userId == userId) return;

    const adopterTemplateKey = generateCacheTemplate(CacheTemplate.ACTION_ADOPTER, userId);
    const actionAdoptor = await this.cacheService.get(adopterTemplateKey);
    if (!actionAdoptor) {
      const user = await this.userRepository.findOne(userId);
      await this.cacheService.setTtl(adopterTemplateKey, 'x', 57600);
      await this.actionPointRepository.saveActionPoint(user, 8);
    }

    const adoptedTemplateKey = generateCacheTemplate(CacheTemplate.ACTION_ADOPTED, comment.userId);
    const actionAdopted = await this.cacheService.get(adoptedTemplateKey);
    if (!actionAdopted) {
      const user = await this.userRepository.findOne(comment.userId);
      await this.cacheService.setTtl(adoptedTemplateKey, 'x', 57600);
      await this.actionPointRepository.saveActionPoint(user, 9);
    }
  }
}

import { CacheTemplate, generateCacheTemplate } from 'src/domain/enums/cache.enum';
import { IException } from 'src/domain/exceptions/exceptions.interface';
import { ActionPointRepository } from 'src/domain/repositories/action-point.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { VideoRepository } from 'src/domain/repositories/video.repository';
import { RedisCacheService } from 'src/infrastructure/config/redis/redis-cache.service';

export class VideoAdoptionUsecase {
  constructor(
    private readonly cacheService: RedisCacheService,
    private readonly videoRepository: VideoRepository,
    private readonly userRepository: UserRepository,
    private readonly actionPointRepository: ActionPointRepository,
    private readonly exceptionsService: IException,
  ) {}

  async execute(videoId: number, userId: number) {
    const videoAnswer = await this.videoRepository.checkVideoAnswer(videoId);

    if (!videoAnswer) this.exceptionsService.videoNotFoundException();
    if (videoAnswer.isAdoption) this.exceptionsService.adoptionAlreadyExistException();

    const isOwnerQuestion = await this.videoRepository.isMine(videoAnswer.questionId, userId);

    if (!isOwnerQuestion) this.exceptionsService.videoIsNotYoursException();

    const checkAdoption = await this.videoRepository.checkAdoption(videoAnswer.questionId);

    if (checkAdoption !== 0) this.exceptionsService.questionIsAlreadyAdoptedException();

    this.videoRepository.videoAdoption(videoId, videoAnswer.userId);

    // action point
    if (videoAnswer.userId == userId) return;

    const adopterTemplateKey = generateCacheTemplate(CacheTemplate.ACTION_ADOPTER, userId);
    const actionAdoptor = await this.cacheService.get(adopterTemplateKey);
    if (!actionAdoptor) {
      const user = await this.userRepository.findOne(userId);
      await this.cacheService.setTtl(adopterTemplateKey, 'x', 57600);
      await this.actionPointRepository.saveActionPoint(user, 8);
    }

    const adoptedTemplateKey = generateCacheTemplate(CacheTemplate.ACTION_ADOPTED, videoAnswer.userId);
    const actionAdopted = await this.cacheService.get(adoptedTemplateKey);
    if (!actionAdopted) {
      const user = await this.userRepository.findOne(videoAnswer.userId);
      await this.cacheService.setTtl(adoptedTemplateKey, 'x', 57600);
      await this.actionPointRepository.saveActionPoint(user, 9);
    }
  }
}

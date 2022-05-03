import { CacheTemplate, generateCacheTemplate } from 'src/domain/enums/cache.enum';
import { IException } from 'src/domain/exceptions/exceptions.interface';
import { ActionPointRepository } from 'src/domain/repositories/action-point.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { VideoRepository } from 'src/domain/repositories/video.repository';
import { RedisCacheService } from 'src/infrastructure/config/redis/redis-cache.service';
import { CreateVideoAnswerDto } from 'src/presentation/answer/answer.dto';

export class CreateVideoAnswerUsecase {
  constructor(
    private readonly cacheService: RedisCacheService,
    private readonly videoRepository: VideoRepository,
    private readonly userRepository: UserRepository,
    private readonly actionPointRepository: ActionPointRepository,
    private readonly exceptionsService: IException,
  ) {}

  async execute(userId: number, request: CreateVideoAnswerDto, questionId: number) {
    const question = await this.videoRepository.findOne(questionId);
    if (!question) this.exceptionsService.questionNotFoundException();

    this.videoRepository.createVideoAnswer(request, userId, questionId);

    // action point
    const questionTemplateKey = generateCacheTemplate(CacheTemplate.ACTION_CREATE_ANSWER, userId);
    const actionCreateQuestion = await this.cacheService.get(questionTemplateKey);
    if (!actionCreateQuestion) {
      const user = await this.userRepository.findOne(userId);
      await this.cacheService.setTtl(questionTemplateKey, 'x', 57600);
      await this.actionPointRepository.saveActionPoint(user, 7);
    }
  }
}

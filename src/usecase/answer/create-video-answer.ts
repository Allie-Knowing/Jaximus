import { ExpoPushMessage } from 'expo-server-sdk';
import { CacheTemplate, generateCacheTemplate } from 'src/domain/enums/cache.enum';
import { IException } from 'src/domain/exceptions/exceptions.interface';
import { ActionPointRepository } from 'src/domain/repositories/action-point.repository';
import { IqPaymentCategoryRepository } from 'src/domain/repositories/iq-payment-category';
import { IqPaymentHistoryRepository } from 'src/domain/repositories/iq-payment-history';
import { IqRepository } from 'src/domain/repositories/iq.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { VideoRepository } from 'src/domain/repositories/video.repository';
import { ExpoService } from 'src/infrastructure/config/expo/expo.service';
import { RedisCacheService } from 'src/infrastructure/config/redis/redis-cache.service';
import { CreateVideoAnswerDto } from 'src/presentation/answer/answer.dto';

export class CreateVideoAnswerUsecase {
  constructor(
    private readonly expoService: ExpoService,
    private readonly cacheService: RedisCacheService,
    private readonly videoRepository: VideoRepository,
    private readonly userRepository: UserRepository,
    private readonly actionPointRepository: ActionPointRepository,
    private readonly iqRepository: IqRepository,
    private readonly iqPaymentCategoryRepository: IqPaymentCategoryRepository,
    private readonly iqPaymentHistoryRepository: IqPaymentHistoryRepository,
    private readonly exceptionsService: IException,
  ) {}

  async execute(userId: number, request: CreateVideoAnswerDto, questionId: number) {
    const question: any = await this.videoRepository.findOne(questionId);
    const videoOwner = await this.userRepository.findOne(question.user.id);
    const user = await this.userRepository.findOne(userId);
    if (!question) this.exceptionsService.questionNotFoundException();

    this.videoRepository.createVideoAnswer(request, userId, questionId);

    const countAnswerVideo = await this.videoRepository.countAnswerVideo(userId);
    const eventPaymentHistoryRecord = await this.iqPaymentHistoryRepository.findByUserIdAndPaymentCategory(userId, 3);
    if (countAnswerVideo.videoCnt === 0 && !eventPaymentHistoryRecord) {
      this.iqRepository.answerVideoEvent(user);
      const iqPaymentCategory = await this.iqPaymentCategoryRepository.getEntityById(3);
      await this.iqPaymentHistoryRepository.answerVideoEvent(user, iqPaymentCategory);
    }

    // action point
    const questionTemplateKey = generateCacheTemplate(CacheTemplate.ACTION_CREATE_ANSWER, userId);
    const actionCreateQuestion = await this.cacheService.get(questionTemplateKey);
    if (!actionCreateQuestion) {
      await this.cacheService.setTtl(questionTemplateKey, 'x', 57600);
      await this.actionPointRepository.saveActionPoint(user, 7);
    }

    let messages: ExpoPushMessage[] = [
      {
        to: videoOwner.expoToken,
        sound: 'default',
        title: `${user.name}님이 글 답변을 달았습니다!`,
        body: `${request.title}`,
      },
    ];
    this.expoService.sendPushNotification(messages);
  }
}

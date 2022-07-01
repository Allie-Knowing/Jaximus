import { Client } from '@elastic/elasticsearch';
import { CacheTemplate, generateCacheTemplate } from 'src/domain/enums/cache.enum';
import { IException } from 'src/domain/exceptions/exceptions.interface';
import { ActionPointRepository } from 'src/domain/repositories/action-point.repository';
import { IqPaymentCategoryRepository } from 'src/domain/repositories/iq-payment-category';
import { IqPaymentHistoryRepository } from 'src/domain/repositories/iq-payment-history';
import { IqRepository } from 'src/domain/repositories/iq.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { VideoRepository } from 'src/domain/repositories/video.repository';
import { ElasticsearchService } from 'src/infrastructure/config/elasticsearch/elasticsearch.service';
import { RedisCacheService } from 'src/infrastructure/config/redis/redis-cache.service';
import { CreateQuestionDto } from 'src/presentation/question/question.dto';

export class CreateQuestionUsecase {
  client: Client;

  constructor(
    private readonly cacheService: RedisCacheService,
    private readonly videoRepository: VideoRepository,
    private readonly iqRepository: IqRepository,
    private readonly iqPaymentHistoryRepository: IqPaymentHistoryRepository,
    private readonly iqPaymentCategoryRepository: IqPaymentCategoryRepository,
    private readonly elasticsearchService: ElasticsearchService,
    private readonly actionPointRepository: ActionPointRepository,
    private readonly userRepository: UserRepository,
    private readonly exceptionsService: IException,
  ) {}

  async execute(video: CreateQuestionDto, userId: number) {
    if (this.client === undefined) {
      this.client = this.elasticsearchService.getESClient();
    }
    // const userIq = await this.iqRepository.getIq(userId);

    //if (userIq.curCnt < video.compensation) this.exceptionsService.notEnoughIqException();

    //await this.iqRepository.iqExpenditure(userId, video.compensation);

    const savedVideo = await this.videoRepository.save(video, userId);
    const splitVideoUrl = video.videoUrl.split('/');
    const videoFilename = splitVideoUrl[splitVideoUrl.length - 1];
    const splitVideoFilename = videoFilename.split('.');
    this.client.index({
      index: 'videosearch',
      id: savedVideo.id.toString(),
      type: '_doc',
      body: {
        doc: {
          title: video.title,
          description: video.description,
          thumbnail: `https://test-knowing.s3.ap-northeast-2.amazonaws.com/processed/${splitVideoFilename[0] + 'knowing'}.${
            splitVideoFilename[1]
          }`,
        },
      },
    });
    const user = await this.userRepository.findOne(userId);
    const eventPaymentHistoryRecord = await this.iqPaymentHistoryRepository.findByUserIdAndPaymentCategory(userId, 3);
    const countQuestionVideo = await this.videoRepository.countUserQuestion(userId);
    if (countQuestionVideo.videoCnt === 0 && !eventPaymentHistoryRecord) {
      this.iqRepository.questionVideoEvent(user);
      const iqPaymentCategory = await this.iqPaymentCategoryRepository.getEntityById(2);
      await this.iqPaymentHistoryRepository.questionVideoEvent(user, iqPaymentCategory);
    }

    // action point
    const questionTemplateKey = generateCacheTemplate(CacheTemplate.ACTION_CREATE_QUESTION, userId);
    const actionCreateQuestion = await this.cacheService.get(questionTemplateKey);
    if (!actionCreateQuestion) {
      await this.cacheService.setTtl(questionTemplateKey, 'x', 57600);
      await this.actionPointRepository.saveActionPoint(user, 6);
    }
  }
}

import { DynamicModule, Module } from '@nestjs/common';
import { HttpService, HttpModule } from '@nestjs/axios';
import { CommentAdoptionUsecase } from 'src/usecase/comment/comment-adoption';
import { CreateLikeUsecase } from 'src/usecase/like/create-like';
import { DeleteLikeUsecase } from 'src/usecase/like/delete-like';
import { UserInfoUsecase } from 'src/usecase/user/user-info';
import { UserQuestionListUsecase } from 'src/usecase/user/user-question-video';
import { CreateQuestionUsecase } from 'src/usecase/question/create-question';
import { CreateVideoAnswerUsecase } from 'src/usecase/answer/create-video-answer';
import { DeleteTextAnswerUsecase } from 'src/usecase/answer/delte-text-answer';
import { GetQuestionListUsecase } from 'src/usecase/question/get-questions-list';
import { GetVideoAnswerListUsecase } from 'src/usecase/answer/get-video-answer-list';
import { VideoAdoptionUsecase } from 'src/usecase/video/video-adoption';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { LoggerModule } from '../logger/logger.module';
import { DatabaseCommentRepository } from '../repositories/comment.repository';
import { DatabaseLikeRepository } from '../repositories/like.repository';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DatabaseUserRepository } from '../repositories/user.repository';
import { DatabaseVideoRepository } from '../repositories/video.repository';
import { DeleteQuestionUsecase } from 'src/usecase/question/delete-question';
import { DeleteVideoAnswerUsecase } from 'src/usecase/answer/delete-video-answer';
import { CreateTextAnswerUsecase } from 'src/usecase/answer/create-text-answer';
import { ElasticsearchService } from '../config/elasticsearch/elasticsearch.service';
import { ElasticsearchModule } from '../config/elasticsearch/elasticsearch.module';
import { GetTextAnswerListUsecase } from 'src/usecase/answer/get-text-answer-list';
import { GetQuestionHashtagListUsecase } from 'src/usecase/question/get-question-hashtag-list';
import { DatabaseHashTagRepository } from '../repositories/hash-tag.repository';
import { QueryTitleUsecase } from 'src/usecase/search/query-title';
import { QueryHashtagUsecase } from 'src/usecase/search/query-hash-tag';
import { GetQuestionDetailUsecase } from 'src/usecase/question/get-question-detail';
import { GetVideoAnswerDetailUsecase } from 'src/usecase/answer/get-video-answer-detail';
import { GetQuestionVideoListUsecase } from 'src/usecase/question/get-question-video-list';
import { DatabaseIqRepository } from '../repositories/iq.repository';
import { DatabaseTierRepository } from '../repositories/tier.repository';
import { GetWalletInfoUsecase } from 'src/usecase/wallet/wallet-info';
import { DatabaseBlockRepository } from '../repositories/block.repository';
import { DatabaseActionPointRepository } from '../repositories/action-point.repository';
import { GetActionPointUsecase } from 'src/usecase/wallet/action-point';
import { UserBlockUsecase } from 'src/usecase/user/user-block';
import { RedisCacheModule } from '../config/redis/redis-cache.module';
import { RedisCacheService } from '../config/redis/redis-cache.service';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { ActionPointRepository } from 'src/domain/repositories/action-point.repository';
import { DatabaseIqPaymentHistoryRepository } from '../repositories/iq-payment-history.repository';
import { GetPaymentHistoryUsecase } from 'src/usecase/wallet/payment-history';
import { UserAnswerListUsecase } from 'src/usecase/user/user-answer-video';
import { GetAnswerCountUsecase } from 'src/usecase/question/get-answer-count';
import { UpdateExpoTokenUsecase } from 'src/usecase/user/upsert-expo-token';
import { ExpoModule } from '../config/expo/expo.module';
import { ExpoService } from '../config/expo/expo.service';
import { VideoViewsUsecase } from 'src/usecase/video/video-views';
import { DatabaseCashExchangeRepository } from '../repositories/cash_exchange.repository';
import { UserCashExchangeUsecase } from 'src/usecase/user/user-cash-exchange';
import { UserDeleteUsecase } from 'src/usecase/user/user-delete';
import { DatabaseReportRepository } from '../repositories/report.repository';
import { QueryReportListUsecase } from 'src/usecase/report/query-report-list';
import { CreateVideoReportUsecase } from 'src/usecase/report/create-video-report';
import { CreateCommentReportUsecase } from 'src/usecase/report/create-comment-report';
import { DeleteReportUsecase } from 'src/usecase/report/delete-report';
import { DatabaseIqPaymentCategoryRepository } from '../repositories/iq-payment-category.repository';
import { DatabaseInquiryRepository } from '../repositories/inquiry.repository';
import { CreateInquiryUsecase } from 'src/usecase/inquiry/create-inquiry';
import { DeleteInquiryUsecase } from 'src/usecase/inquiry/delete-inquiry';
import { QueryInquiryListUsecase } from 'src/usecase/inquiry/query-inquiry-list';
import { DatabaseInquiryCategoryRepository } from '../repositories/inquiry-category.repository';
import { GetCountUserQuestionPresenter } from 'src/presentation/question/get-count-user-question.presenter';
import { UserQuestionCountUsecase } from 'src/usecase/user/user-question-count';
import { UserAnswerCountUsecase } from 'src/usecase/user/user-answer-count';
import { AdminDeleteCommentUsecase } from 'src/usecase/admin/admin-delete-comment';
import { AdminDeleteVideoUsecase } from 'src/usecase/admin/admin-delete-video';
import { GoogleLoginUsecase } from 'src/usecase/auth/google-login';
import { UtilsModule } from '../util/utils.module';
import { LoginService } from '../util/login.service';

@Module({
  imports: [LoggerModule, RepositoriesModule, ExceptionsModule, ElasticsearchModule, RedisCacheModule, ExpoModule, HttpModule, UtilsModule],
})
export class UsecasesProxyDynamicModule {
  static register(): DynamicModule {
    return {
      module: UsecasesProxyDynamicModule,
      providers: [
        {
          inject: [
            RedisCacheService,
            DatabaseVideoRepository,
            DatabaseIqRepository,
            DatabaseIqPaymentHistoryRepository,
            DatabaseIqPaymentCategoryRepository,
            ElasticsearchService,
            DatabaseActionPointRepository,
            DatabaseUserRepository,
            ExceptionsService,
          ],
          provide: CreateQuestionUsecase,
          useFactory: (
            cacheService: RedisCacheService,
            databaseVideoRepository: DatabaseVideoRepository,
            databaseIqRepository: DatabaseIqRepository,
            databaseIqPaymentHistoryRepository: DatabaseIqPaymentHistoryRepository,
            databaseIqPaymentCategoryRepository: DatabaseIqPaymentCategoryRepository,
            elasticsearchService: ElasticsearchService,
            actionPointRepository: ActionPointRepository,
            userRepository: UserRepository,
            exceptionsService: ExceptionsService,
          ) =>
            new CreateQuestionUsecase(
              cacheService,
              databaseVideoRepository,
              databaseIqRepository,
              databaseIqPaymentHistoryRepository,
              databaseIqPaymentCategoryRepository,
              elasticsearchService,
              actionPointRepository,
              userRepository,
              exceptionsService,
            ),
        },
        {
          inject: [
            ExpoService,
            RedisCacheService,
            DatabaseVideoRepository,
            DatabaseUserRepository,
            DatabaseIqPaymentHistoryRepository,
            DatabaseIqPaymentCategoryRepository,
            DatabaseActionPointRepository,
            ExceptionsService,
          ],
          provide: CreateVideoAnswerUsecase,
          useFactory: (
            expoService: ExpoService,
            cacheService: RedisCacheService,
            databaseVideoRepository: DatabaseVideoRepository,
            databaseUserRepository: DatabaseUserRepository,
            databaseIqRepository: DatabaseIqRepository,
            databaseIqPaymentHistoryRepository: DatabaseIqPaymentHistoryRepository,
            databaseIqPaymentCategoryRepository: DatabaseIqPaymentCategoryRepository,
            databaseActionPointRepository: DatabaseActionPointRepository,
            exceptionsService: ExceptionsService,
          ) =>
            new CreateVideoAnswerUsecase(
              expoService,
              cacheService,
              databaseVideoRepository,
              databaseUserRepository,
              databaseActionPointRepository,
              databaseIqRepository,
              databaseIqPaymentCategoryRepository,
              databaseIqPaymentHistoryRepository,
              exceptionsService,
            ),
        },
        {
          inject: [DatabaseVideoRepository, ExceptionsService],
          provide: GetQuestionListUsecase,
          useFactory: (databaseVideoRepository: DatabaseVideoRepository, exceptionsService: ExceptionsService) =>
            new GetQuestionListUsecase(databaseVideoRepository, exceptionsService),
        },
        {
          inject: [DatabaseVideoRepository, ExceptionsService],
          provide: GetVideoAnswerListUsecase,
          useFactory: (databaseVideoRepository: DatabaseVideoRepository, exceptionsService: ExceptionsService) =>
            new GetVideoAnswerListUsecase(databaseVideoRepository, exceptionsService),
        },
        {
          inject: [
            ExpoService,
            RedisCacheService,
            DatabaseLikeRepository,
            DatabaseUserRepository,
            DatabaseVideoRepository,
            DatabaseActionPointRepository,
            ExceptionsService,
          ],
          provide: CreateLikeUsecase,
          useFactory: (
            expoService: ExpoService,
            cacheService: RedisCacheService,
            databaseLikeRepository: DatabaseLikeRepository,
            databaseUserRepository: DatabaseUserRepository,
            databaseVideoRepository: DatabaseVideoRepository,
            databaseActionPointRepository: DatabaseActionPointRepository,
            exceptionsService: ExceptionsService,
          ) =>
            new CreateLikeUsecase(
              expoService,
              cacheService,
              databaseLikeRepository,
              databaseUserRepository,
              databaseVideoRepository,
              databaseActionPointRepository,
              exceptionsService,
            ),
        },
        {
          inject: [RedisCacheService, DatabaseVideoRepository, DatabaseUserRepository, DatabaseActionPointRepository, ExceptionsService],
          provide: VideoAdoptionUsecase,
          useFactory: (
            cacheService: RedisCacheService,
            databaseVideoRepository: DatabaseVideoRepository,
            databaseUserRepository: DatabaseUserRepository,
            databaseActionPointRepository: DatabaseActionPointRepository,
            exceptionsService: ExceptionsService,
          ) =>
            new VideoAdoptionUsecase(
              cacheService,
              databaseVideoRepository,
              databaseUserRepository,
              databaseActionPointRepository,
              exceptionsService,
            ),
        },
        {
          inject: [
            RedisCacheService,
            DatabaseCommentRepository,
            DatabaseVideoRepository,
            DatabaseUserRepository,
            DatabaseActionPointRepository,
            ExceptionsService,
          ],
          provide: CommentAdoptionUsecase,
          useFactory: (
            cacheService: RedisCacheService,
            databaseCommentRepository: DatabaseCommentRepository,
            databaseVideoRepository: DatabaseVideoRepository,
            databaseUserRepository: DatabaseUserRepository,
            databaseActionPointRepository: DatabaseActionPointRepository,
            exceptionsService: ExceptionsService,
          ) =>
            new CommentAdoptionUsecase(
              cacheService,
              databaseCommentRepository,
              databaseVideoRepository,
              databaseUserRepository,
              databaseActionPointRepository,
              exceptionsService,
            ),
        },
        {
          inject: [RedisCacheService, DatabaseLikeRepository, ExceptionsService],
          provide: DeleteLikeUsecase,
          useFactory: (
            cacheService: RedisCacheService,
            databaseLikeRepository: DatabaseLikeRepository,
            exceptionsService: ExceptionsService,
          ) => new DeleteLikeUsecase(cacheService, databaseLikeRepository, exceptionsService),
        },
        {
          inject: [DatabaseUserRepository, ExceptionsService],
          provide: UserInfoUsecase,
          useFactory: (databaseUserRepository: DatabaseUserRepository, exceptionsService: ExceptionsService) =>
            new UserInfoUsecase(databaseUserRepository, exceptionsService),
        },
        {
          inject: [DatabaseVideoRepository, ExceptionsService],
          provide: UserQuestionListUsecase,
          useFactory: (databaseVideoRepository: DatabaseVideoRepository, exceptionsService: ExceptionsService) =>
            new UserQuestionListUsecase(databaseVideoRepository, exceptionsService),
        },
        {
          inject: [DatabaseCommentRepository, ExceptionsService],
          provide: DeleteTextAnswerUsecase,
          useFactory: (databaseCommentRepository: DatabaseCommentRepository, exceptionsService: ExceptionsService) =>
            new DeleteTextAnswerUsecase(databaseCommentRepository, exceptionsService),
        },
        {
          inject: [DatabaseVideoRepository, ExceptionsService],
          provide: DeleteQuestionUsecase,
          useFactory: (databaseVideoRepository: DatabaseVideoRepository, exceptionsService: ExceptionsService) =>
            new DeleteQuestionUsecase(databaseVideoRepository, exceptionsService),
        },
        {
          inject: [DatabaseVideoRepository, ExceptionsService],
          provide: DeleteVideoAnswerUsecase,
          useFactory: (databaseVideoRepository: DatabaseVideoRepository, exceptionsService: ExceptionsService) =>
            new DeleteVideoAnswerUsecase(databaseVideoRepository, exceptionsService),
        },
        {
          inject: [ExpoService, DatabaseUserRepository, DatabaseCommentRepository, DatabaseVideoRepository, ExceptionsService],
          provide: CreateTextAnswerUsecase,
          useFactory: (
            expoService: ExpoService,
            databaseUserRepository: DatabaseUserRepository,
            databaseCommentRepository: DatabaseCommentRepository,
            databaseVideoRepository: DatabaseVideoRepository,
            exceptionsService: ExceptionsService,
          ) =>
            new CreateTextAnswerUsecase(
              expoService,
              databaseUserRepository,
              databaseCommentRepository,
              databaseVideoRepository,
              exceptionsService,
            ),
        },
        {
          inject: [ElasticsearchService],
          provide: QueryTitleUsecase,
          useFactory: (elasticsearchService: ElasticsearchService) => new QueryTitleUsecase(elasticsearchService),
        },
        {
          inject: [ElasticsearchService],
          provide: QueryHashtagUsecase,
          useFactory: (elasticsearchService: ElasticsearchService) => new QueryHashtagUsecase(elasticsearchService),
        },
        {
          inject: [DatabaseCommentRepository, ExceptionsService],
          provide: GetTextAnswerListUsecase,
          useFactory: (databaseCommentRepository: DatabaseCommentRepository, exceptionsService: ExceptionsService) =>
            new GetTextAnswerListUsecase(databaseCommentRepository, exceptionsService),
        },
        {
          inject: [DatabaseHashTagRepository, ExceptionsService],
          provide: GetQuestionHashtagListUsecase,
          useFactory: (databaseHashTagRepository: DatabaseHashTagRepository, exceptionService: ExceptionsService) =>
            new GetQuestionHashtagListUsecase(databaseHashTagRepository, exceptionService),
        },
        {
          inject: [DatabaseVideoRepository, ExceptionsService],
          provide: GetQuestionDetailUsecase,
          useFactory: (databaseVideoRepository: DatabaseVideoRepository, exceptionService: ExceptionsService) =>
            new GetQuestionDetailUsecase(databaseVideoRepository, exceptionService),
        },
        {
          inject: [DatabaseVideoRepository, ExceptionsService],
          provide: GetVideoAnswerDetailUsecase,
          useFactory: (databaseVideoRepository: DatabaseVideoRepository, exceptionService: ExceptionsService) =>
            new GetVideoAnswerDetailUsecase(databaseVideoRepository, exceptionService),
        },
        {
          inject: [DatabaseVideoRepository, ExceptionsService],
          provide: GetQuestionVideoListUsecase,
          useFactory: (databaseVideoRepository: DatabaseVideoRepository, exceptionService: ExceptionsService) =>
            new GetQuestionVideoListUsecase(databaseVideoRepository, exceptionService),
        },
        {
          inject: [DatabaseTierRepository, ExceptionsService],
          provide: GetWalletInfoUsecase,
          useFactory: (databaseTierRepository: DatabaseTierRepository, exceptionsService: ExceptionsService) =>
            new GetWalletInfoUsecase(databaseTierRepository, exceptionsService),
        },
        {
          inject: [DatabaseVideoRepository, DatabaseBlockRepository, DatabaseUserRepository, ExceptionsService],
          provide: UserBlockUsecase,
          useFactory: (
            databaseVideoRepository: DatabaseVideoRepository,
            databaseBlockRepository: DatabaseBlockRepository,
            databaseUserRepository: DatabaseUserRepository,
            exceptionsService: ExceptionsService,
          ) => new UserBlockUsecase(databaseVideoRepository, databaseBlockRepository, databaseUserRepository, exceptionsService),
        },
        {
          inject: [DatabaseActionPointRepository, ExceptionsService],
          provide: GetActionPointUsecase,
          useFactory: (databaseActionPointRepository: DatabaseActionPointRepository, exceptionsService: ExceptionsService) =>
            new GetActionPointUsecase(databaseActionPointRepository, exceptionsService),
        },
        {
          inject: [DatabaseIqPaymentHistoryRepository, ExceptionsService],
          provide: GetPaymentHistoryUsecase,
          useFactory: (databaseIqPaymentHistoryRepository: DatabaseIqPaymentHistoryRepository, exceptionsService: ExceptionsService) =>
            new GetPaymentHistoryUsecase(databaseIqPaymentHistoryRepository, exceptionsService),
        },
        {
          inject: [DatabaseVideoRepository, ExceptionsService],
          provide: UserAnswerListUsecase,
          useFactory: (databaseVideoRepository: DatabaseVideoRepository, exceptionsService: ExceptionsService) =>
            new UserAnswerListUsecase(databaseVideoRepository, exceptionsService),
        },
        {
          inject: [DatabaseVideoRepository],
          provide: GetAnswerCountUsecase,
          useFactory: (databaseVideoRepisitory: DatabaseVideoRepository) => new GetAnswerCountUsecase(databaseVideoRepisitory),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UpdateExpoTokenUsecase,
          useFactory: (databaseUserRepository: DatabaseUserRepository) => new UpdateExpoTokenUsecase(databaseUserRepository),
        },
        {
          inject: [DatabaseVideoRepository, ExceptionsService],
          provide: VideoViewsUsecase,
          useFactory: (databaseVideoRepisitory: DatabaseVideoRepository, exceptionService: ExceptionsService) =>
            new VideoViewsUsecase(databaseVideoRepisitory, exceptionService),
        },
        {
          inject: [DatabaseCashExchangeRepository, DatabaseIqRepository, ExceptionsService],
          provide: UserCashExchangeUsecase,
          useFactory: (
            databaseCashExchangeRepository: DatabaseCashExchangeRepository,
            databaseIqRepository: DatabaseIqRepository,
            exceptionsService: ExceptionsService,
          ) => new UserCashExchangeUsecase(databaseCashExchangeRepository, databaseIqRepository, exceptionsService),
        },
        {
          inject: [DatabaseUserRepository, ExceptionsService],
          provide: UserDeleteUsecase,
          useFactory: (databaseUserRepository: DatabaseUserRepository, exceptionsService: ExceptionsService) =>
            new UserDeleteUsecase(databaseUserRepository, exceptionsService),
        },
        {
          inject: [DatabaseReportRepository],
          provide: QueryReportListUsecase,
          useFactory: (databasReportRepository: DatabaseReportRepository) => new QueryReportListUsecase(databasReportRepository),
        },
        {
          inject: [DatabaseReportRepository, DatabaseUserRepository, DatabaseVideoRepository, ExceptionsService],
          provide: CreateVideoReportUsecase,
          useFactory: (
            databaseReportRepository: DatabaseReportRepository,
            databaseUserRepository: DatabaseUserRepository,
            databaseVideoRepository: DatabaseVideoRepository,
            exceptionsService: ExceptionsService,
          ) => new CreateVideoReportUsecase(databaseReportRepository, databaseUserRepository, databaseVideoRepository, exceptionsService),
        },
        {
          inject: [DatabaseReportRepository, DatabaseUserRepository, DatabaseVideoRepository, DatabaseCommentRepository, ExceptionsService],
          provide: CreateCommentReportUsecase,
          useFactory: (
            databaseReportRepository: DatabaseReportRepository,
            databaseUserRepository: DatabaseUserRepository,
            databaseVideoRepository: DatabaseVideoRepository,
            databaseCommentRepository: DatabaseCommentRepository,
            exceptionsService: ExceptionsService,
          ) =>
            new CreateCommentReportUsecase(
              databaseReportRepository,
              databaseUserRepository,
              databaseVideoRepository,
              databaseCommentRepository,
              exceptionsService,
            ),
        },
        {
          inject: [DatabaseReportRepository, ExceptionsService],
          provide: DeleteReportUsecase,
          useFactory: (databaseReportRepository: DatabaseReportRepository, exceptionsService: ExceptionsService) =>
            new DeleteReportUsecase(databaseReportRepository, exceptionsService),
        },
        {
          inject: [DatabaseInquiryRepository, DatabaseUserRepository, DatabaseInquiryCategoryRepository, ExceptionsService],
          provide: CreateInquiryUsecase,
          useFactory: (
            databaseInquiryRepository: DatabaseInquiryRepository,
            databaseUserRepository: DatabaseUserRepository,
            databaseInquiryCategoryRepository: DatabaseInquiryCategoryRepository,
            exceptionsService: ExceptionsService,
          ) =>
            new CreateInquiryUsecase(
              databaseInquiryRepository,
              databaseInquiryCategoryRepository,
              databaseUserRepository,
              exceptionsService,
            ),
        },
        {
          inject: [DatabaseInquiryRepository, ExceptionsService],
          provide: QueryInquiryListUsecase,
          useFactory: (databaseInquiryRepository: DatabaseInquiryRepository, exceptionsService: ExceptionsService) =>
            new QueryInquiryListUsecase(databaseInquiryRepository, exceptionsService),
        },
        {
          inject: [DatabaseInquiryRepository, ExceptionsService],
          provide: DeleteInquiryUsecase,
          useFactory: (databaseInquiryRepository: DatabaseInquiryRepository, exceptionsService: ExceptionsService) =>
            new DeleteInquiryUsecase(databaseInquiryRepository, exceptionsService),
        },
        {
          inject: [DatabaseVideoRepository],
          provide: UserQuestionCountUsecase,
          useFactory: (databaseVideoRepository: DatabaseVideoRepository) => new UserQuestionCountUsecase(databaseVideoRepository),
        },
        {
          inject: [DatabaseVideoRepository],
          provide: UserAnswerCountUsecase,
          useFactory: (databaseVideoRepository: DatabaseVideoRepository) => new UserAnswerCountUsecase(databaseVideoRepository),
         },
         {
          inject: [
            DatabaseVideoRepository,
            DatabaseReportRepository,
            DatabaseActionPointRepository,
            DatabaseUserRepository,
            ExceptionsService,
          ],
          provide: AdminDeleteVideoUsecase,
          useFactory: (
            databaseVideoRepository: DatabaseVideoRepository,
            databaseReportRepository: DatabaseReportRepository,
            databaseActionPointRepository: DatabaseActionPointRepository,
            databaseUserRepository: DatabaseUserRepository,
            exceptionsService: ExceptionsService,
          ) =>
            new AdminDeleteVideoUsecase(
              databaseVideoRepository,
              databaseReportRepository,
              databaseActionPointRepository,
              databaseUserRepository,
              exceptionsService,
            ),
        },
        {
          inject: [
            DatabaseCommentRepository,
            DatabaseReportRepository,
            DatabaseActionPointRepository,
            DatabaseUserRepository,
            ExceptionsService,
          ],
          provide: AdminDeleteCommentUsecase,
          useFactory: (
            databaseCommentRepository: DatabaseCommentRepository,
            databaseReportRepository: DatabaseReportRepository,
            databaseActionPointRepository: DatabaseActionPointRepository,
            databaseUserRepository: DatabaseUserRepository,
            exceptionsService: ExceptionsService,
          ) =>
            new AdminDeleteCommentUsecase(
              databaseCommentRepository,
              databaseReportRepository,
              databaseActionPointRepository,
              databaseUserRepository,
              exceptionsService,
            ),
        },
        {
          inject: [DatabaseUserRepository, LoginService, HttpService, ExceptionsService],
          provide: GoogleLoginUsecase,
          useFactory: (
            databaseUserRepository: DatabaseUserRepository,
            loginService: LoginService,
            httpService: HttpService,
            exceptionsService: ExceptionsService,
          ) => new GoogleLoginUsecase(databaseUserRepository, loginService, httpService, exceptionsService),
        },
      ],
      exports: [
        CreateQuestionUsecase,
        CreateVideoAnswerUsecase,
        GetQuestionListUsecase,
        GetVideoAnswerListUsecase,
        CreateLikeUsecase,
        VideoAdoptionUsecase,
        CommentAdoptionUsecase,
        DeleteLikeUsecase,
        UserInfoUsecase,
        UserQuestionListUsecase,
        DeleteTextAnswerUsecase,
        DeleteQuestionUsecase,
        DeleteVideoAnswerUsecase,
        CreateTextAnswerUsecase,
        QueryTitleUsecase,
        QueryHashtagUsecase,
        GetTextAnswerListUsecase,
        GetQuestionHashtagListUsecase,
        GetQuestionDetailUsecase,
        GetVideoAnswerDetailUsecase,
        GetQuestionVideoListUsecase,
        GetWalletInfoUsecase,
        UserBlockUsecase,
        GetActionPointUsecase,
        GetPaymentHistoryUsecase,
        UserAnswerListUsecase,
        GetAnswerCountUsecase,
        UpdateExpoTokenUsecase,
        VideoViewsUsecase,
        UserCashExchangeUsecase,
        UserDeleteUsecase,
        QueryReportListUsecase,
        CreateVideoReportUsecase,
        CreateCommentReportUsecase,
        DeleteReportUsecase,
        CreateInquiryUsecase,
        QueryInquiryListUsecase,
        DeleteInquiryUsecase,
        UserQuestionCountUsecase,
        UserAnswerCountUsecase,
        AdminDeleteCommentUsecase,
        AdminDeleteVideoUsecase,
        GoogleLoginUsecase,
      ],
    };
  }
}

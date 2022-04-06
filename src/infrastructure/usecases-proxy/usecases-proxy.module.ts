import { DynamicModule, Module } from '@nestjs/common';
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

@Module({
  imports: [LoggerModule, RepositoriesModule, ExceptionsModule, ElasticsearchModule],
})
export class UsecasesProxyDynamicModule {
  static register(): DynamicModule {
    return {
      module: UsecasesProxyDynamicModule,
      providers: [
        {
          inject: [DatabaseVideoRepository],
          provide: CreateQuestionUsecase,
          useFactory: (databaseVideoRepository: DatabaseVideoRepository) => new CreateQuestionUsecase(databaseVideoRepository),
        },
        {
          inject: [DatabaseVideoRepository, ExceptionsService],
          provide: CreateVideoAnswerUsecase,
          useFactory: (databaseVideoRepository: DatabaseVideoRepository, exceptionsService: ExceptionsService) =>
            new CreateVideoAnswerUsecase(databaseVideoRepository, exceptionsService),
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
          inject: [DatabaseLikeRepository, DatabaseUserRepository, DatabaseVideoRepository, ExceptionsService],
          provide: CreateLikeUsecase,
          useFactory: (
            databaseLikeRepository: DatabaseLikeRepository,
            databaseUserRepository: DatabaseUserRepository,
            databaseVideoRepository: DatabaseVideoRepository,
            exceptionsService: ExceptionsService,
          ) => new CreateLikeUsecase(databaseLikeRepository, databaseUserRepository, databaseVideoRepository, exceptionsService),
        },
        {
          inject: [DatabaseVideoRepository, ExceptionsService],
          provide: VideoAdoptionUsecase,
          useFactory: (databaseVideoRepository: DatabaseVideoRepository, exceptionsService: ExceptionsService) =>
            new VideoAdoptionUsecase(databaseVideoRepository, exceptionsService),
        },
        {
          inject: [DatabaseCommentRepository, DatabaseVideoRepository, ExceptionsService],
          provide: CommentAdoptionUsecase,
          useFactory: (
            databaseCommentRepository: DatabaseCommentRepository,
            databaseVideoRepository: DatabaseVideoRepository,
            exceptionsService: ExceptionsService,
          ) => new CommentAdoptionUsecase(databaseCommentRepository, databaseVideoRepository, exceptionsService),
        },
        {
          inject: [DatabaseLikeRepository, ExceptionsService],
          provide: DeleteLikeUsecase,
          useFactory: (databaseLikeRepository: DatabaseLikeRepository, exceptionsService: ExceptionsService) =>
            new DeleteLikeUsecase(databaseLikeRepository, exceptionsService),
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
          inject: [DatabaseCommentRepository, DatabaseVideoRepository, ExceptionsService],
          provide: CreateTextAnswerUsecase,
          useFactory: (
            databaseCommentRepository: DatabaseCommentRepository,
            databaseVideoRepository: DatabaseVideoRepository,
            exceptionsService: ExceptionsService,
          ) => new CreateTextAnswerUsecase(databaseCommentRepository, databaseVideoRepository, exceptionsService),
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
      ],
    };
  }
}

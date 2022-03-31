import { DynamicModule, Module } from '@nestjs/common';
import { CommentAdoptionUsecase } from 'src/usecase/comment/comment-adoption';
import { CreateLikeUsecase } from 'src/usecase/like/create-like';
import { DeleteLikeUsecase } from 'src/usecase/like/delete-like';
import { UserInfoUsecase } from 'src/usecase/user/user-info';
import { UserQuestionListUsecase } from 'src/usecase/user/user-question-video';
import { CreateQuestionUsecase } from 'src/usecase/question/create-question';
import { CreateVideoAnswerUsecase } from 'src/usecase/answer/create-video-answer';
import { DeleteCommentAnswerUsecase } from 'src/usecase/answer/delte-comment-answer';
import { GetQuestionListUseCases } from 'src/usecase/question/get-questions-list';
import { GetVideoAnswerListUseCases } from 'src/usecase/answer/get-video-answer-list';
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

@Module({
  imports: [LoggerModule, RepositoriesModule, ExceptionsModule],
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
          provide: GetQuestionListUseCases,
          useFactory: (databaseVideoRepository: DatabaseVideoRepository, exceptionsService: ExceptionsService) =>
            new GetQuestionListUseCases(databaseVideoRepository, exceptionsService),
        },
        {
          inject: [DatabaseVideoRepository, ExceptionsService],
          provide: GetVideoAnswerListUseCases,
          useFactory: (databaseVideoRepository: DatabaseVideoRepository, exceptionsService: ExceptionsService) =>
            new GetVideoAnswerListUseCases(databaseVideoRepository, exceptionsService),
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
          provide: DeleteCommentAnswerUsecase,
          useFactory: (databaseCommentRepository: DatabaseCommentRepository, exceptionsService: ExceptionsService) =>
            new DeleteCommentAnswerUsecase(databaseCommentRepository, exceptionsService),
        },
        {
          inject: [DatabaseVideoRepository, ExceptionsService],
          provide: DeleteQuestionUsecase,
          useFactory: (databaseVideoRepository: DatabaseVideoRepository, exceptionsService: ExceptionsService) =>
            new DeleteQuestionUsecase(databaseVideoRepository, exceptionsService),
        },
      ],
      exports: [
        CreateQuestionUsecase,
        CreateVideoAnswerUsecase,
        GetQuestionListUseCases,
        GetVideoAnswerListUseCases,
        CreateLikeUsecase,
        VideoAdoptionUsecase,
        CommentAdoptionUsecase,
        DeleteLikeUsecase,
        UserInfoUsecase,
        UserQuestionListUsecase,
        DeleteCommentAnswerUsecase,
        DeleteQuestionUsecase,
      ],
    };
  }
}

import { DynamicModule, Module } from '@nestjs/common';
import { LikeRepository } from 'src/domain/repositories/like.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { VideoRepository } from 'src/domain/repositories/video.repository';
import { CommentAdoptionUsecase } from 'src/usecase/comment/comment-adoption';
import { CreateLikeUsecase } from 'src/usecase/like/create-like';
import { DeleteLikeUsecase } from 'src/usecase/like/delete-like';
import { CreateVideoUsecase } from 'src/usecase/video/create-video';
import { CreateVideoCommentUsecase } from 'src/usecase/video/create-video-comment';
import { GetQuestionListUseCases } from 'src/usecase/video/get-questions-list';
import { GetVideoCommentListUseCases } from 'src/usecase/video/get-video-comment-list';
import { VideoAdoptionUsecase } from 'src/usecase/video/video-adoption';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { LoggerModule } from '../logger/logger.module';
import { DatabaseCommentRepository } from '../repositories/comment.repository';
import { DatabaseLikeRepository } from '../repositories/like.repository';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DatabaseUserRepository } from '../repositories/user.repository';
import { DatabaseVideoRepository } from '../repositories/video.repository';

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
          provide: CreateVideoUsecase,
          useFactory: (databaseVideoRepository: DatabaseVideoRepository) => new CreateVideoUsecase(databaseVideoRepository),
        },
        {
          inject: [DatabaseVideoRepository],
          provide: CreateVideoCommentUsecase,
          useFactory: (databaseVideoRepository: DatabaseVideoRepository) => new CreateVideoCommentUsecase(databaseVideoRepository),
        },
        {
          inject: [DatabaseVideoRepository, ExceptionsService],
          provide: GetQuestionListUseCases,
          useFactory: (databaseVideoRepository: DatabaseVideoRepository, exceptionsService: ExceptionsService) =>
            new GetQuestionListUseCases(databaseVideoRepository, exceptionsService),
        },
        {
          inject: [DatabaseVideoRepository, ExceptionsService],
          provide: GetVideoCommentListUseCases,
          useFactory: (databaseVideoRepository: DatabaseVideoRepository, exceptionsService: ExceptionsService) =>
            new GetVideoCommentListUseCases(databaseVideoRepository, exceptionsService),
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
          inject: [DatabaseCommentRepository, ExceptionsService],
          provide: CommentAdoptionUsecase,
          useFactory: (databaseCommentRepository: DatabaseCommentRepository, exceptionsService: ExceptionsService) =>
            new CommentAdoptionUsecase(databaseCommentRepository, exceptionsService),
        },
        {
          inject: [DatabaseLikeRepository, ExceptionsService],
          provide: DeleteLikeUsecase,
          useFactory: (databaseLikeRepository: DatabaseLikeRepository, exceptionsService: ExceptionsService) =>
            new DeleteLikeUsecase(databaseLikeRepository, exceptionsService),
        },
      ],
      exports: [
        CreateVideoUsecase,
        CreateVideoCommentUsecase,
        GetQuestionListUseCases,
        GetVideoCommentListUseCases,
        CreateLikeUsecase,
        VideoAdoptionUsecase,
        CommentAdoptionUsecase,
        DeleteLikeUsecase,
      ],
    };
  }
}

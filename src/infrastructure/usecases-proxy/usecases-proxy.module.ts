import { DynamicModule, Module } from '@nestjs/common';
import { IUserReqeust } from 'src/domain/interfaces/request.interface';
import { CreateLikeUsecase } from 'src/usecase/like/create-like';
import { CreateVideoUsecase } from 'src/usecase/video/create-video';
import { CreateVideoCommentUsecase } from 'src/usecase/video/create-video-comment';
import { GetQuestionListUseCases } from 'src/usecase/video/get-questions-list';
import { GetVideoCommentListUseCases } from 'src/usecase/video/get-video-comment-list';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { LoggerModule } from '../logger/logger.module';
import { DatabaseLikeRepository } from '../repositories/like.repository';
import { RepositoriesModule } from '../repositories/repositories.module';
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
          inject: [DatabaseLikeRepository, ExceptionsService],
          provide: CreateLikeUsecase,
          useFactory: (databaseLikeRepository: DatabaseLikeRepository, exceptionsService: ExceptionsService) =>
            new CreateLikeUsecase(databaseLikeRepository, exceptionsService),
        },
      ],
      exports: [CreateVideoUsecase, CreateVideoCommentUsecase, GetQuestionListUseCases, GetVideoCommentListUseCases, CreateLikeUsecase],
    };
  }
}

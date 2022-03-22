import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeRepository } from 'src/domain/repositories/like.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { VideoRepository } from 'src/domain/repositories/video.repository';
import { CreateLikeUsecase } from 'src/usecase/like/create-like';
import { CreateVideoUsecase } from 'src/usecase/video/create-video';
import { CreateVideoCommentUsecase } from 'src/usecase/video/create-video-comment';
import { GetQuestionListUseCases } from 'src/usecase/video/get-questions-list';
import { GetVideoCommentListUseCases } from 'src/usecase/video/get-video-comment-list';
import { LikeTypeOrmEntity } from '../entities/like.entity';
import { UserTypeOrmEntity } from '../entities/user.entity';
import { VideoTypeOrmEntity } from '../entities/video.entity';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { LoggerModule } from '../logger/logger.module';
import { DatabaseLikeRepository } from '../repositories/like.repository';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DatabaseUserRepository } from '../repositories/user.repository';
import { DatabaseVideoRepository } from '../repositories/video.repository';

@Module({
  imports: [
    LoggerModule,
    RepositoriesModule,
    ExceptionsModule,
    TypeOrmModule.forFeature([LikeTypeOrmEntity, UserTypeOrmEntity, VideoTypeOrmEntity]),
  ],
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
            exceptionsService: ExceptionsService,
            likeEntityRepository: LikeRepository,
            userEntityRepository: UserRepository,
            videoEntityRepository: VideoRepository,
          ) => new CreateLikeUsecase(exceptionsService, likeEntityRepository, userEntityRepository, videoEntityRepository),
        },
      ],
      exports: [CreateVideoUsecase, CreateVideoCommentUsecase, GetQuestionListUseCases, GetVideoCommentListUseCases, CreateLikeUsecase],
    };
  }
}

import { DynamicModule, Module } from '@nestjs/common';
import { CreateVideoQuestionUsecase } from 'src/usecase/video/create-video-question';
import { CreateVideoCommentUsecase } from 'src/usecase/video/create-video-comment';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DatabaseVideoRepository } from '../repositories/video.repository';
import { UseCaseProxy } from './usecases-proxy';

@Module({
  imports: [LoggerModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyDynamicModule {
  static POST_VIDEO_QUESTION_USECASE_PROXY = 'postVideoQuestionUsecaseProxy';
  static POST_VIDEO_COMMENT_USECASES_PROXY = 'postVideoCommentUsecaseProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyDynamicModule,
      providers: [
        {
          inject: [DatabaseVideoRepository],
          provide: UsecasesProxyDynamicModule.POST_VIDEO_QUESTION_USECASE_PROXY,
          useFactory: (databaseVideoRepository: DatabaseVideoRepository) =>
            new UseCaseProxy(
              new CreateVideoQuestionUsecase(databaseVideoRepository),
            ),
        },
        {
          inject: [DatabaseVideoRepository],
          provide: UsecasesProxyDynamicModule.POST_VIDEO_COMMENT_USECASES_PROXY,
          useFactory: (databaseVideoRepository: DatabaseVideoRepository) =>
            new UseCaseProxy(
              new CreateVideoCommentUsecase(databaseVideoRepository),
            ),
        },
      ],
      exports: [
        UsecasesProxyDynamicModule.POST_VIDEO_QUESTION_USECASE_PROXY,
        UsecasesProxyDynamicModule.POST_VIDEO_COMMENT_USECASES_PROXY,
      ],
    };
  }
}

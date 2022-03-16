import { DynamicModule, Module } from '@nestjs/common';
import { CreateVideoUsecase } from 'src/usecase/video/create-video';
import { CreateVideoCommentUsecase } from 'src/usecase/video/create-video-comment';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
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
          useFactory: (databaseVideoRepository: DatabaseVideoRepository) =>
            new CreateVideoUsecase(databaseVideoRepository),
        },
        {
          inject: [DatabaseVideoRepository],
          provide: CreateVideoCommentUsecase,
          useFactory: (databaseVideoRepository: DatabaseVideoRepository) =>
            new CreateVideoCommentUsecase(databaseVideoRepository),
        },
      ],
      exports: [CreateVideoUsecase, CreateVideoCommentUsecase],
    };
  }
}

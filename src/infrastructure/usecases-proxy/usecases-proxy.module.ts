import { DynamicModule, Module } from '@nestjs/common';
import { CreateVideoUsecase } from 'src/usecase/video/create-video';
import { GetQuestionListUseCases } from 'src/usecase/video/get-questions-list';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { LoggerModule } from '../logger/logger.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DatabaseVideoRepository } from '../repositories/video.repository';
import { UseCaseProxy } from './usecases-proxy';

@Module({
  imports: [LoggerModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyDynamicModule {
  static GET_QUESTION_LIST_USECASES_PROXY = 'getQuestionListUsecasesProxy';

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
          inject: [DatabaseVideoRepository, ExceptionsService],
          provide: UsecasesProxyDynamicModule.GET_QUESTION_LIST_USECASES_PROXY,
          useFactory: (
            databaseVideoRepository: DatabaseVideoRepository,
            exceptionsService: ExceptionsService,
          ) =>
            new UseCaseProxy(
              new GetQuestionListUseCases(
                databaseVideoRepository,
                exceptionsService,
              ),
            ),
        },
      ],
      exports: [
        CreateVideoUsecase,
        UsecasesProxyDynamicModule.GET_QUESTION_LIST_USECASES_PROXY,
      ],
    };
  }
}

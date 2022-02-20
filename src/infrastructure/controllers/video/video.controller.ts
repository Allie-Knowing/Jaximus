import { Controller, Inject, Scope, Get } from '@nestjs/common';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyDynamicModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { GetQuestionListUseCases } from 'src/usecase/video/get-question-list.usecases';
import { GetQuestionListPresenter } from './video.presenter';

@Controller({ path: '/video', scope: Scope.REQUEST })
export class VideoController {
  constructor(
    @Inject(UsecasesProxyDynamicModule.GET_QUESTION_LIST_USECASES_PROXY)
    private readonly getQuestionListUsecaseProxy: UseCaseProxy<GetQuestionListUseCases>,
  ) {}

  @Get('/')
  async getQuestionList(): Promise<GetQuestionListPresenter[]> {
    return await this.getQuestionListUsecaseProxy.getInstance().execute();
  }
}

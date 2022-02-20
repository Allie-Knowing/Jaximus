import {
  Body,
  Controller,
  Inject,
  Injectable,
  Post,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Video } from 'src/domain/model/video';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyDynamicModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { CreateVideoUsecase } from 'src/usecase/video/create-video';
import { CreateVideoCommentUsecase } from 'src/usecase/video/create-video-comment.usecase';

@Injectable({ scope: Scope.REQUEST })
@Controller('/video')
export class VideoController {
  constructor(
    @Inject(UsecasesProxyDynamicModule.POST_VIDEO_QUESTION_USECASE_PROXY)
    private readonly postVideoQuestionUsecaseProxy: UseCaseProxy<CreateVideoUsecase>,
    @Inject(UsecasesProxyDynamicModule.POST_VIDEO_COMMENT_USECASES_PROXY)
    private readonly postVideoCommentUsecaseProxy: UseCaseProxy<CreateVideoCommentUsecase>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  @Post('/')
  async create(userId: number, @Body() request: Video) {
    await this.postVideoQuestionUsecaseProxy
      .getInstance()
      .execute(userId, request);
  }

  @Post('/answer')
  createVideoComment(userId: number, @Body() request: Video) {
    this.postVideoCommentUsecaseProxy.getInstance().execute(userId, request);
  }
}

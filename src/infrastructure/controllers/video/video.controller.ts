import {
  Body,
  Controller,
  Inject,
  Injectable,
  Post,
  Scope,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Video } from 'src/domain/model/video';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyDynamicModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { CreateVideoQuestionUsecase } from 'src/usecase/video/create-video-question';
import { CreateVideoCommentUsecase } from 'src/usecase/video/create-video-comment';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/infrastructure/config/multer/multer-config.service';

@Controller({ path: '/video', scope: Scope.REQUEST })
export class VideoController {
  constructor(
    @Inject(UsecasesProxyDynamicModule.POST_VIDEO_QUESTION_USECASE_PROXY)
    private readonly postVideoQuestionUsecaseProxy: UseCaseProxy<CreateVideoQuestionUsecase>,
    @Inject(UsecasesProxyDynamicModule.POST_VIDEO_COMMENT_USECASES_PROXY)
    private readonly postVideoCommentUsecaseProxy: UseCaseProxy<CreateVideoCommentUsecase>,
    @Inject(REQUEST)
    private readonly request: Request,
    private readonly multerService: MulterConfigService,
  ) {}

  @Post('/')
  async create(userId: number, @Body() request: Video) {
    await this.postVideoQuestionUsecaseProxy
      .getInstance()
      .execute(userId, request);
  }

  @Post('/answer')
  @UseInterceptors(FileInterceptor('file'))
  async createVideoComment(
    @UploadedFile() file,
    userId: number,
    @Body() request: Video,
  ) {
    await this.postVideoCommentUsecaseProxy
      .getInstance()
      .execute(userId, request);
    return { status: 201, message: 'success' };
  }
}

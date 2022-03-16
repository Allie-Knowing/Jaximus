import {
  Body,
  Controller,
  Inject,
  Post,
  Scope,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Video } from 'src/domain/model/video';
import { CreateVideoUsecase } from 'src/usecase/video/create-video';
import { CreateVideoCommentUsecase } from 'src/usecase/video/create-video-comment';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/infrastructure/config/multer/multer-config.service';

@Controller({ path: '/video', scope: Scope.REQUEST })
export class VideoController {
  constructor(
    @Inject(CreateVideoUsecase)
    private readonly createVideoUsecase: CreateVideoUsecase,
    @Inject(CreateVideoCommentUsecase)
    private readonly createVideoCommentUsecase: CreateVideoCommentUsecase,
    @Inject(REQUEST)
    private readonly request: Request,
    private readonly multerService: MulterConfigService,
  ) {}

  @Post('/')
  async create(userId: number, @Body() request: Video) {
    await this.createVideoUsecase.execute(userId, request);
  }

  @Post('/answer')
  @UseInterceptors(FileInterceptor('file'))
  async createVideoComment(
    @UploadedFile() file,
    userId: number,
    @Body() request: Video,
  ) {
    await this.createVideoCommentUsecase.execute(userId, request);
    return { status: 201, message: 'success' };
  }
}

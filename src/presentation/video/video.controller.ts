import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Param,
  ParseIntPipe,
  Scope,
  UploadedFile,
  UseInterceptors,
  Put,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { Video } from 'src/domain/model/video';
import { CreateVideoUsecase } from 'src/usecase/video/create-video';
import { GetVideoCommentListPresenter } from './video.presenter';
import { CreateVideoCommentUsecase } from 'src/usecase/video/create-video-comment';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetQuestionListUseCases } from 'src/usecase/video/get-questions-list';
import { GetVideoCommentListUseCases } from 'src/usecase/video/get-video-comment-list';
import { VideoAdoptionUsecase } from 'src/usecase/video/video-adoption';
import { IUserReqeust } from 'src/domain/interfaces/request.interface';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Controller({ path: '/video', scope: Scope.REQUEST })
export class VideoController {
  constructor(
    @Inject(CreateVideoUsecase)
    private readonly createVideoUsecase: CreateVideoUsecase,
    @Inject(GetQuestionListUseCases)
    private readonly getQuestionListUsecase: GetQuestionListUseCases,
    @Inject(GetVideoCommentListUseCases)
    private readonly getVideoCommentListUseCases: GetVideoCommentListUseCases,
    @Inject(CreateVideoCommentUsecase)
    private readonly createVideoCommentUsecase: CreateVideoCommentUsecase,
    @Inject(VideoAdoptionUsecase)
    private readonly videoAdoptionUsecase: VideoAdoptionUsecase,
    @Inject(REQUEST)
    private readonly request: IUserReqeust,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() request: Video) {
    const userId = this.request.user.userId;
    this.createVideoUsecase.execute(userId, request);
  }

  @Get('/')
  questionList(): Promise<Video[]> {
    return this.getQuestionListUsecase.execute();
  }

  @Get('/answer/:videoId')
  videoAnswerList(@Param('videoId', ParseIntPipe) videoId: number): Promise<GetVideoCommentListPresenter[]> {
    return this.getVideoCommentListUseCases.execute(videoId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/answer')
  @HttpCode(HttpStatus.CREATED)
  async videoAnswer(@Body() request: Video) {
    const userId = this.request.user.userId;
    await this.createVideoCommentUsecase.execute(userId, request);
  }

  @Post('/file')
  @UseInterceptors(FileInterceptor('file'))
  videoFile(@UploadedFile() file) {
    return { url: file.location };
  }

  @Put('/adoption/:videoId')
  @HttpCode(HttpStatus.OK)
  async videoAdoption(@Param('videoId', ParseIntPipe) videoId: number) {
    await this.videoAdoptionUsecase.execute(videoId);
  }
}

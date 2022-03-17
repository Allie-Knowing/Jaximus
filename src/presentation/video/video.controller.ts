import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { Video } from 'src/domain/model/video';
import { CreateVideoUsecase } from 'src/usecase/video/create-video';
import { GetQuestionListUseCases } from 'src/usecase/video/get-questions-list';
import { GetVideoCommentListUseCases } from 'src/usecase/video/get-video-comment-list';
import { GetQuestionListPresenter, GetVideoCommentListPresenter } from './video.presenter';

@Controller('/video')
export class VideoController {
  constructor(
    @Inject(CreateVideoUsecase)
    private readonly createVideoUsecase: CreateVideoUsecase,
    @Inject(GetQuestionListUseCases)
    private readonly getQuestionListUsecase: GetQuestionListUseCases,
    @Inject(GetVideoCommentListUseCases)
    private readonly getVideoCommentListUseCases: GetVideoCommentListUseCases,
  ) {}

  @Post('/')
  create(userId: number, @Body() request: Video) {
    this.createVideoUsecase.execute(userId, request);
  }

  @Get('/')
  async getQuestionList(): Promise<GetQuestionListPresenter[]> {
    return this.getQuestionListUsecase.execute();
  }

  @Get('/answer/:video_id')
  async getVideoCommentList(@Param('video_id') video_id: number): Promise<GetVideoCommentListPresenter[]> {
    return this.getVideoCommentListUseCases.execute(video_id);
  }
}

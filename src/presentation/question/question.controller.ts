import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  Query,
  Scope,
  UseGuards,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IUserReqeust } from 'src/domain/interfaces/request.interface';
import { Video } from 'src/domain/model/video';
import { CreateQuestionUsecase } from 'src/usecase/question/create-question';
import { DeleteQuestionUsecase } from 'src/usecase/question/delete-question';
import { GetQuestionDetailUsecase } from 'src/usecase/question/get-question-detail';
import { GetQuestionHashtagListUsecase } from 'src/usecase/question/get-question-hashtag-list';
import { GetQuestionVideoListUsecase } from 'src/usecase/question/get-question-video-list';
import { GetQuestionListUsecase } from 'src/usecase/question/get-questions-list';
import { CreateQuestionDto } from './question.dto';

@Controller({ path: '/question', scope: Scope.REQUEST })
export class QuestionController {
  constructor(
    @Inject(CreateQuestionUsecase)
    private readonly createQuestionUsecase: CreateQuestionUsecase,
    @Inject(GetQuestionListUsecase)
    private readonly getQuestionListUsecase: GetQuestionListUsecase,
    @Inject(DeleteQuestionUsecase)
    private readonly deleteQuestionUsecase: DeleteQuestionUsecase,
    @Inject(GetQuestionHashtagListUsecase)
    private readonly getQuestionHashtagListUsecase: GetQuestionHashtagListUsecase,
    @Inject(GetQuestionDetailUsecase)
    private readonly getQuestionDetailUsecase: GetQuestionDetailUsecase,
    @Inject(GetQuestionVideoListUsecase)
    private readonly getQuestionVideoListUsecase: GetQuestionVideoListUsecase,
    @Inject(REQUEST)
    private readonly request: IUserReqeust,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() video: CreateQuestionDto) {
    await this.createQuestionUsecase.execute(video, this.request.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  questionList(@Query('page', ParseIntPipe) page: number, @Query('size', ParseIntPipe) size: number): Promise<Video[]> {
    return this.getQuestionListUsecase.execute(this.request.user.sub, page, size);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/video')
  questionVideoList(@Query('id', ParseArrayPipe) videoIds: number[]) {
    return this.getQuestionVideoListUsecase.execute(videoIds, this.request.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:videoId')
  questionDetail(@Param('videoId', ParseIntPipe) videoId: number): Promise<Video> {
    return this.getQuestionDetailUsecase.execute(videoId, this.request.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:videoId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteQuestion(@Param('videoId', ParseIntPipe) videoId: number) {
    await this.deleteQuestionUsecase.execute(videoId, this.request.user.sub);
  }

  @Get('/:videoId/hashtag')
  questionHashtagList(@Param('videoId', ParseIntPipe) videoId: number) {
    return this.getQuestionHashtagListUsecase.execute(videoId);
  }
}

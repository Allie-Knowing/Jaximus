import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Param,
  ParseIntPipe,
  Scope,
  HttpStatus,
  HttpCode,
  UseGuards,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { Video } from 'src/domain/model/video';
import { CreateVideoAnswerUsecase } from 'src/usecase/answer/create-video-answer';
import { GetVideoAnswerListUsecase } from 'src/usecase/answer/get-video-answer-list';
import { IUserRequest } from 'src/domain/interfaces/request.interface';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { DeleteTextAnswerUsecase } from 'src/usecase/answer/delte-text-answer';
import { DeleteVideoAnswerUsecase } from 'src/usecase/answer/delete-video-answer';
import { CreateTextAnswerUsecase } from 'src/usecase/answer/create-text-answer';
import { GetTextAnswerListUsecase } from 'src/usecase/answer/get-text-answer-list';
import { CreateVideoAnswerDto } from './answer.dto';
import { VideoAdoptionUsecase } from 'src/usecase/video/video-adoption';
import { CommentAdoptionUsecase } from 'src/usecase/comment/comment-adoption';
import { GetVideoAnswerDetailUsecase } from 'src/usecase/answer/get-video-answer-detail';

@Controller({ path: '/answer', scope: Scope.REQUEST })
export class AnswerController {
  constructor(
    @Inject(VideoAdoptionUsecase)
    private readonly videoAdoptionUsecase: VideoAdoptionUsecase,
    @Inject(CommentAdoptionUsecase)
    private readonly commentAdoptionUsecase: CommentAdoptionUsecase,
    @Inject(GetVideoAnswerListUsecase)
    private readonly getVideoAnswerListUsecase: GetVideoAnswerListUsecase,
    @Inject(CreateVideoAnswerUsecase)
    private readonly createVideoAnswerUsecase: CreateVideoAnswerUsecase,
    @Inject(DeleteTextAnswerUsecase)
    private readonly deleteTextAnswerUsecase: DeleteTextAnswerUsecase,
    @Inject(DeleteVideoAnswerUsecase)
    private readonly deleteVideoAnswerUsecase: DeleteVideoAnswerUsecase,
    @Inject(CreateTextAnswerUsecase)
    private readonly createTextAnswerUsecase: CreateTextAnswerUsecase,
    @Inject(GetTextAnswerListUsecase)
    private readonly getTextAnswerListUsecase: GetTextAnswerListUsecase,
    @Inject(GetVideoAnswerDetailUsecase)
    private readonly getVideoAnswerDetailUsecase: GetVideoAnswerDetailUsecase,
    @Inject(REQUEST)
    private readonly request: IUserRequest,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/video/:questionId')
  @HttpCode(HttpStatus.CREATED)
  async videoAnswer(@Body() request: CreateVideoAnswerDto, @Param('questionId', ParseIntPipe) questionId: number) {
    await this.createVideoAnswerUsecase.execute(this.request.user.sub, request, questionId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/video/:questionId')
  videoAnswerList(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
  ): Promise<Video[]> {
    return this.getVideoAnswerListUsecase.execute(questionId, this.request.user.sub, page, size);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/video/detail/:videoId')
  videoAnswerDetail(@Param('videoId', ParseIntPipe) videoId: number): Promise<Video> {
    return this.getVideoAnswerDetailUsecase.execute(videoId, this.request.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/video/:videoId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteVideoAnswer(@Param('videoId', ParseIntPipe) videoId: number) {
    await this.deleteVideoAnswerUsecase.execute(videoId, this.request.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/text/:questionId')
  @HttpCode(HttpStatus.CREATED)
  async textAnswer(@Body('content') content: string, @Param('questionId', ParseIntPipe) questionId: number) {
    await this.createTextAnswerUsecase.execute(content, questionId, this.request.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/text/:commentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCommentAnswer(@Param('commentId', ParseIntPipe) commentId: number) {
    await this.deleteTextAnswerUsecase.execute(commentId, this.request.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/text/:questionId')
  textAnswerList(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
  ) {
    return this.getTextAnswerListUsecase.execute(questionId, this.request.user.sub, page, size);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/video/adoption/:videoId')
  @HttpCode(HttpStatus.OK)
  async videoAnswerAdoption(@Param('videoId', ParseIntPipe) videoId: number) {
    await this.videoAdoptionUsecase.execute(videoId, this.request.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/adoption/:commentId')
  @HttpCode(HttpStatus.OK)
  async textAnswerAdoption(@Param('commentId', ParseIntPipe) commentId: number, @Body('videoId') videoId: number) {
    await this.commentAdoptionUsecase.execute(commentId, this.request.user.sub, videoId);
  }
}

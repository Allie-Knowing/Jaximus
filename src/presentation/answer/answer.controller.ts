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
import { IUserReqeust } from 'src/domain/interfaces/request.interface';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { DeleteTextAnswerUsecase } from 'src/usecase/answer/delte-text-answer';
import { DeleteVideoAnswerUsecase } from 'src/usecase/answer/delete-video-answer';
import { CreateTextAnswerUsecase } from 'src/usecase/answer/create-text-answer';
import { GetTextAnswerUsecase } from 'src/usecase/answer/get-text-answer';
import { CreateVideoAnswerDto } from './answer.dto';
import { VideoAdoptionUsecase } from 'src/usecase/video/video-adoption';
import { CommentAdoptionUsecase } from 'src/usecase/comment/comment-adoption';

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
    private readonly deleteCommentAnswerUsecase: DeleteTextAnswerUsecase,
    @Inject(DeleteVideoAnswerUsecase)
    private readonly deleteVideoAnswerUsecase: DeleteVideoAnswerUsecase,
    @Inject(CreateTextAnswerUsecase)
    private readonly createCommentAnswerUsecase: CreateTextAnswerUsecase,
    @Inject(GetTextAnswerUsecase)
    private readonly getTextAnswerUsecase: GetTextAnswerUsecase,
    @Inject(REQUEST)
    private readonly request: IUserReqeust,
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
  @Delete('/video/:questionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteVideoAnswer(@Param('questionId', ParseIntPipe) questionId: number) {
    await this.deleteVideoAnswerUsecase.execute(questionId, this.request.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/text/:questionId')
  @HttpCode(HttpStatus.CREATED)
  async textAnswer(@Body('content') content: string, @Param('questionId', ParseIntPipe) questionId: number) {
    await this.createCommentAnswerUsecase.execute(content, questionId, this.request.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/text/:commentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCommentAnswer(@Param('commentId', ParseIntPipe) commentId: number) {
    await this.deleteCommentAnswerUsecase.execute(commentId, this.request.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/text/:questionId')
  textAnswerList(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
  ) {
    return this.getTextAnswerUsecase.execute(questionId, this.request.user.sub, page, size);
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

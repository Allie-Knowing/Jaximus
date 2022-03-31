import { Body, Controller, Get, Inject, Post, Param, ParseIntPipe, Scope, HttpStatus, HttpCode, UseGuards, Delete } from '@nestjs/common';
import { Video } from 'src/domain/model/video';
import { GetVideoAnswerListPresenter } from './answer.presenter';
import { CreateVideoAnswerUsecase } from 'src/usecase/answer/create-video-answer';
import { GetVideoAnswerListUseCases } from 'src/usecase/answer/get-video-answer-list';
import { IUserReqeust } from 'src/domain/interfaces/request.interface';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { DeleteCommentAnswerUsecase } from 'src/usecase/answer/delte-comment-answer';
import { DeleteVideoAnswerUsecase } from 'src/usecase/answer/delete-video-answer';

@Controller({ path: '/answer', scope: Scope.REQUEST })
export class AnswerController {
  constructor(
    @Inject(GetVideoAnswerListUseCases)
    private readonly getVideoAnswerListUseCases: GetVideoAnswerListUseCases,
    @Inject(CreateVideoAnswerUsecase)
    private readonly createVideoAnswerUsecase: CreateVideoAnswerUsecase,
    @Inject(DeleteCommentAnswerUsecase)
    private readonly deleteCommentAnswerUsecase: DeleteCommentAnswerUsecase,
    @Inject(DeleteVideoAnswerUsecase)
    private readonly deleteVideoAnswerUsecase: DeleteVideoAnswerUsecase,
    @Inject(REQUEST)
    private readonly request: IUserReqeust,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/video/:questionId')
  @HttpCode(HttpStatus.CREATED)
  async videoAnswer(@Body() request: Video, @Param('questionId', ParseIntPipe) questionId: number) {
    const userId = this.request.user.sub;
    await this.createVideoAnswerUsecase.execute(userId, request, questionId);
  }

  @Get('/video/:questionId')
  videoAnswerList(@Param('questionId', ParseIntPipe) questionId: number): Promise<GetVideoAnswerListPresenter[]> {
    return this.getVideoAnswerListUseCases.execute(questionId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/video/:questionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteVideoAnswer(@Param('questionId', ParseIntPipe) questionId: number) {
    const userId = this.request.user.sub;
    await this.deleteVideoAnswerUsecase.execute(questionId, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/comment/:commentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCommentAnswer(@Param('commentId', ParseIntPipe) commentId: number) {
    const userId = this.request.user.sub;
    await this.deleteCommentAnswerUsecase.execute(commentId, userId);
  }
}

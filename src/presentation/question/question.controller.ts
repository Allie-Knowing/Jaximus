import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Scope, UseGuards } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IUserReqeust } from 'src/domain/interfaces/request.interface';
import { Video } from 'src/domain/model/video';
import { CreateQuestionUsecase } from 'src/usecase/question/create-question';
import { GetQuestionListUseCases } from 'src/usecase/question/get-questions-list';

@Controller({ path: '/question', scope: Scope.REQUEST })
export class QuestionController {
  constructor(
    @Inject(CreateQuestionUsecase)
    private readonly createQuestionUsecase: CreateQuestionUsecase,
    @Inject(GetQuestionListUseCases)
    private readonly getQuestionListUsecase: GetQuestionListUseCases,
    @Inject(REQUEST)
    private readonly request: IUserReqeust,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() request: Video) {
    const userId = this.request.user.userId;
    this.createQuestionUsecase.execute(userId, request);
  }

  @Get('/')
  questionList(): Promise<Video[]> {
    return this.getQuestionListUsecase.execute();
  }
}

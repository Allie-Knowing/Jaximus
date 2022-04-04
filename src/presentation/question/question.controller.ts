import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
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
import { GetQuestionListUseCases } from 'src/usecase/question/get-questions-list';

@Controller({ path: '/question', scope: Scope.REQUEST })
export class QuestionController {
  constructor(
    @Inject(CreateQuestionUsecase)
    private readonly createQuestionUsecase: CreateQuestionUsecase,
    @Inject(GetQuestionListUseCases)
    private readonly getQuestionListUsecase: GetQuestionListUseCases,
    @Inject(DeleteQuestionUsecase)
    private readonly deleteQuestionUsecase: DeleteQuestionUsecase,
    @Inject(REQUEST)
    private readonly request: IUserReqeust,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() request: Video) {
    const userId = this.request.user.sub;
    this.createQuestionUsecase.execute(userId, request);
  }

  @Get('/')
  questionList(@Query('page', ParseIntPipe) page: number, @Query('size', ParseIntPipe) size: number): Promise<Video[]> {
    return this.getQuestionListUsecase.execute(page, size);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:videoId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteQuestion(@Param('videoId', ParseIntPipe) videoId: number) {
    const userId = this.request.user.sub;
    await this.deleteQuestionUsecase.execute(videoId, userId);
  }
}

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Scope,
  UseGuards,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IUserReqeust } from 'src/domain/interfaces/request.interface';
import { User } from 'src/domain/model/user';
import { Video } from 'src/domain/model/video';
import { UpdateExpoTokenUsecase } from 'src/usecase/user/upsert-expo-token';
import { UserAnswerListUsecase } from 'src/usecase/user/user-answer-video';
import { UserBlockUsecase } from 'src/usecase/user/user-block';
import { UserCashExchangeUsecase } from 'src/usecase/user/user-cash-exchange';
import { UserInfoUsecase } from 'src/usecase/user/user-info';
import { UserQuestionListUsecase } from 'src/usecase/user/user-question-video';
import { UserCashExchangeDto } from './user.dto';

@Controller({ path: '/user', scope: Scope.REQUEST })
export class UserController {
  constructor(
    @Inject(UserInfoUsecase)
    private readonly userInfoUsecase: UserInfoUsecase,
    @Inject(UserQuestionListUsecase)
    private readonly userQuestionListUsecase: UserQuestionListUsecase,
    @Inject(UserAnswerListUsecase)
    private readonly userAnswerListUsecase: UserAnswerListUsecase,
    @Inject(UserBlockUsecase)
    private readonly userBlockUsecase: UserBlockUsecase,
    @Inject(UpdateExpoTokenUsecase)
    private readonly updateExpoTokenUsecase: UpdateExpoTokenUsecase,
    @Inject(UserCashExchangeUsecase)
    private readonly userCashExchangeUsecase: UserCashExchangeUsecase,
    @Inject(REQUEST)
    private readonly request: IUserReqeust,
  ) {}

  @Get('/info/:userId')
  async userInfo(@Param('userId', ParseIntPipe) userId: number): Promise<User> {
    return await this.userInfoUsecase.execute(userId);
  }

  @Get('/question/video/:userId')
  async userQuestionList(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
  ): Promise<Video[]> {
    return await this.userQuestionListUsecase.execute(userId, page, size);
  }

  @Get('/answer/video/:userId')
  async userAnswerList(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
  ): Promise<Video[]> {
    return await this.userAnswerListUsecase.execute(userId, page, size);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/block/:videoId')
  @HttpCode(HttpStatus.CREATED)
  async blockUser(@Param('videoId', ParseIntPipe) videoId: number): Promise<void> {
    await this.userBlockUsecase.execute(this.request.user.sub, videoId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/expo/token')
  @HttpCode(HttpStatus.NO_CONTENT)
  psertExpoToken(@Body('token') expoToken: string): void {
    return this.updateExpoTokenUsecase.execute(this.request.user.sub, expoToken);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/my')
  userId() {
    return this.request.user.sub;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/cash/exchange')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() cashExchangeDto: UserCashExchangeDto) {
    return this.userCashExchangeUsecase.execute(cashExchangeDto, this.request.user.sub);
  }
}

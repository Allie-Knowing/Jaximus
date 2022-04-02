import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { User } from 'src/domain/model/user';
import { Video } from 'src/domain/model/video';
import { UserInfoUsecase } from 'src/usecase/user/user-info';
import { UserQuestionListUsecase } from 'src/usecase/user/user-question-video';

@Controller('/user')
export class UserController {
  constructor(
    @Inject(UserInfoUsecase)
    private readonly userInfoUsecase: UserInfoUsecase,
    @Inject(UserQuestionListUsecase)
    private readonly userQuestionListUsecase: UserQuestionListUsecase,
  ) {}

  @Get('/info/:userId')
  async userInfo(@Param('userId', ParseIntPipe) userId: number): Promise<User> {
    return await this.userInfoUsecase.execute(userId);
  }

  @Get('/question/video/:userId')
  async userQuestionList(@Param('userId', ParseIntPipe) userId: number): Promise<Video[]> {
    return await this.userQuestionListUsecase.execute(userId);
  }
}

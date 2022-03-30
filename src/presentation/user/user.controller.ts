import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { UserInfoUsecase } from 'src/usecase/user/user-info';
import { UserQuestionListUsecase } from 'src/usecase/user/user-question-video';
import { GetUserInfoPresenter, GetUserQuestionListPresenter } from './user.presenter';

@Controller('/user')
export class UserController {
  constructor(
    @Inject(UserInfoUsecase)
    private readonly userInfoUsecase: UserInfoUsecase,
    @Inject(UserQuestionListUsecase)
    private readonly userQuestionListUsecase: UserQuestionListUsecase,
  ) {}

  @Get('/info/:userId')
  async userInfo(@Param('userId', ParseIntPipe) userId: number): Promise<GetUserInfoPresenter> {
    return await this.userInfoUsecase.execute(userId);
  }

  @Get('/question/video/:userId')
  async userQuestionList(@Param('userId', ParseIntPipe) userId: number): Promise<GetUserQuestionListPresenter[]> {
    return await this.userQuestionListUsecase.execute(userId);
  }
}

import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { UserInfoUsecase } from 'src/usecase/user/user-info';
import { GetUserInfoPresenter } from './user.presenter';

@Controller('/user')
export class UserController {
  constructor(
    @Inject(UserInfoUsecase)
    private readonly userInfoUsecase: UserInfoUsecase,
  ) {}

  @Get('/info/:userId')
  async userInfo(@Param('userId', ParseIntPipe) userId: number): Promise<GetUserInfoPresenter> {
    return await this.userInfoUsecase.execute(userId);
  }
}

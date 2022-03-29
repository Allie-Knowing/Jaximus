import { IException } from 'src/domain/exceptions/exceptions.interface';
import { GetUserInfoPresenter } from 'src/domain/repositories/dto/user.dto';
import { UserRepository } from 'src/domain/repositories/user.repository';

export class UserInfoUsecase {
  constructor(private readonly userRepository: UserRepository, private readonly exceptionService: IException) {}

  async execute(userId: number): Promise<GetUserInfoPresenter> {
    const user = this.userRepository.findOne(userId);
    if (!user) this.exceptionService.userNotFoundException();

    const userInfo = await this.userRepository.userInfo(userId);

    return userInfo;
  }
}

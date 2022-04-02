import { IException } from 'src/domain/exceptions/exceptions.interface';
import { User } from 'src/domain/model/user';
import { UserRepository } from 'src/domain/repositories/user.repository';

export class UserInfoUsecase {
  constructor(private readonly userRepository: UserRepository, private readonly exceptionService: IException) {}

  async execute(userId: number): Promise<User> {
    const user: User = await this.userRepository.userInfo(userId);

    if (!user) this.exceptionService.userNotFoundException();

    return user;
  }
}

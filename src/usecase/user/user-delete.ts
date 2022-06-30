import { IException } from 'src/domain/exceptions/exceptions.interface';
import { UserRepository } from 'src/domain/repositories/user.repository';

export class UserDeleteUsecase {
  constructor(private readonly userRepository: UserRepository, private readonly exceptionsService: IException) {}

  async execute(userId: number, tokenUserId: number) {
    if (userId !== tokenUserId) this.exceptionsService.userIdNotMatchedException();

    await this.userRepository.deleteUser(userId);
  }
}

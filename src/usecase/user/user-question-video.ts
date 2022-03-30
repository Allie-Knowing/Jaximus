import { IException } from 'src/domain/exceptions/exceptions.interface';
import { GetUserQuestionListPresenter } from 'src/domain/repositories/dto/user.dto';
import { UserRepository } from 'src/domain/repositories/user.repository';

export class UserQuestionListUsecase {
  constructor(private readonly userRepository: UserRepository, private readonly exceptionService: IException) {}

  async execute(userId: number): Promise<GetUserQuestionListPresenter[]> {
    const userQuestionList = await this.userRepository.userQuestionList(userId);
    if (userQuestionList.length === 0) this.exceptionService.userNotFoundException();

    return userQuestionList;
  }
}

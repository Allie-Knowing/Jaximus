import { GetUserInfoPresenter, GetUserQuestionListPresenter } from './dto/user.dto';

export interface UserRepository {
  findOne(userId: number);
  userInfo(userId: number): Promise<GetUserInfoPresenter>;
  userQuestionList(userId: number): Promise<GetUserQuestionListPresenter[]>;
}

import { GetUserInfoPresenter } from './dto/user.dto';

export interface UserRepository {
  findOne(userId: number);
  userInfo(userId: number): Promise<GetUserInfoPresenter>;
}

import { GetActionPointPresenter } from 'src/presentation/wallet/action-point.presenter';
import { User } from '../model/user';

export interface ActionPointRepository {
  actionPointCalc(userId: number): Promise<GetActionPointPresenter>;
  saveActionPoint(user: User, actionPointCategoryId: number): Promise<void>;
}

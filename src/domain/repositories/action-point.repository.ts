import { GetActionPointPresenter } from 'src/presentation/wallet/action-point.presenter';

export interface ActionPointRepository {
  actionPointCalc(userId: number): Promise<GetActionPointPresenter>;
}

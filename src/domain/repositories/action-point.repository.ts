import { GetActionPointDto } from 'src/presentation/wallet/action-point.dto';

export interface ActionPointRepository {
  actionPointCalc(userId: number): Promise<GetActionPointDto>;
}

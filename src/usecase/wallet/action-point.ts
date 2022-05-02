import { IException } from 'src/domain/exceptions/exceptions.interface';
import { ActionPointRepository } from 'src/domain/repositories/action-point.repository';
import { GetActionPointPresenter } from 'src/presentation/wallet/action-point.presenter';

export class GetActionPointUsecase {
  constructor(private readonly actionPointRepository: ActionPointRepository, private readonly exceptionService: IException) {}

  async execute(userId: number): Promise<GetActionPointPresenter> {
    const actionPoint = await this.actionPointRepository.actionPointCalc(userId);

    if (!actionPoint.actionPoint) this.exceptionService.actionPointNotFoundException();

    return new GetActionPointPresenter(actionPoint);
  }
}

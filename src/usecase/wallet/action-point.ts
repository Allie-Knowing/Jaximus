import { IException } from 'src/domain/exceptions/exceptions.interface';
import { ActionPointRepository } from 'src/domain/repositories/action-point.repository';
import { GetActionPointDto } from 'src/presentation/wallet/action-point.dto';

export class GetActionPointUsecase {
  constructor(private readonly actionPointRepository: ActionPointRepository, private readonly exceptionService: IException) {}

  async execute(userId: number): Promise<GetActionPointDto> {
    const actionPoint = await this.actionPointRepository.actionPointCalc(userId);
    if (!actionPoint.actionPoint) this.exceptionService.actionPointNotFoundException();
    return new GetActionPointDto(actionPoint);
  }
}

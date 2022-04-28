import { Client } from '@elastic/elasticsearch';
import { IException } from 'src/domain/exceptions/exceptions.interface';
import { Tier } from 'src/domain/model/tier';
import { TierRepository } from 'src/domain/repositories/tier.repository';

export class GetWalletInfoUsecase {
  client: Client;

  constructor(private readonly tierRepository: TierRepository, private readonly exceptionService: IException) {}

  async execute(userId: number): Promise<Tier> {
    const tier: Tier = await this.tierRepository.findWalletInfo(userId);

    if (!tier) this.exceptionService.tierNotFoundException();

    return tier;
  }
}

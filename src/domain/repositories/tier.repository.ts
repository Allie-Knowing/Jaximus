import { Tier } from '../model/tier';

export interface TierRepository {
  findWalletInfo(userId: number): Promise<Tier>;
}
